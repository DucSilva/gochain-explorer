// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import {
  ProcessedABIData,
  ProcessedABIItem,
  ProcessedLog,
  Transaction,
  TxLog,
} from "@Models/transaction.model";
import {
  SignedTransaction,
  TransactionConfig,
  TransactionReceipt,
  Transaction as Web3Tx,
} from "web3-core";
import { FunctionName } from "@Utils/enums";
import { ErcName } from "@Utils/enums";

import { Account } from "web3-core";
import Axios from "axios";
import Web3 from "web3";
import _ from "lodash";
import {
  ContractAbi,
  ContractEventsAbi,
  ContractAbiByID,
  AbiItemIDed,
} from "@Utils/types";
import { AbiItem, AbiInput } from "web3-utils";
import { Address } from "@Models/address.model";
import { Contract } from "@Models/contract.model";
import { convertWithDecimals } from "@Utils/functions";
import CID from "cids";

const ins = Axios.create({
  baseURL: "https://testnet-explorer.gochain.io/api",
});

type Data = {
  name: string;
};

const web3 = new Web3(Web3.givenProvider).eth;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ name: "John Doe" });
}

const processTransactionLogs = ([events, tx]: [
  any,
  any
]): ProcessedLog[] => {
  // Create one observable per unique address.
  const addrs: string = "";
  tx.parsedLogs.reduce(async (acc: any, log: TxLog) => {
    if (!acc[log.address] && !!log.topics.length && !!log.topics[0]) {
      acc[log.address] = await ins.get(`/address/${log.address}`);
    }
    return acc;
  }, {});
  // Fetch all the Addresses, then use them to parse the logs.

  return tx.parsedLogs.map((log: TxLog) => {
    const processedLog: ProcessedLog = new ProcessedLog();
    processedLog.index = +log.logIndex;
    processedLog.contract_address = log.address;
    processedLog.removed = log.removed;
    processedLog.data = [];
    let abiItem: any;
    let decodedLog: object;
    const address: any = [log.address];
    if (address) {
      if (!!log.topics.length && !!log.topics[0]) {
        const eventSignature = <any>log.topics[0];
        const knownEvent: any = events[eventSignature];
        if (knownEvent) {
          if (Object.keys(knownEvent).length === 1) {
            // Only once choice.
            abiItem = Object.values(knownEvent)[0];
          } else {
            // Find a match.
            const ercType: string = address.erc_types.find(
              (item: string) => !!knownEvent[item]
            );
            if (ercType) {
              abiItem = knownEvent[ercType];
            }
          }
          if (abiItem) {
            try {
              const data: string =
                !log.data || log.data === "0x" || log.data === "0X"
                  ? null
                  : log.data;
              const topics: string[] = <string[]>log.topics.slice(1);
              decodedLog = web3.abi.decodeLog(abiItem.inputs, data, topics);
            } catch (e) {
              console.error("error occurred while decoding log", e);
            }
          }
        }
      }
    }
    if (decodedLog) {
      const items: ProcessedABIItem[] = abiItem.inputs.map((input: AbiInput) =>
        processAbiItem(input, decodedLog, address)
      );
      processedLog.data.push({
        title: abiItem.name,
        items,
      });
    } else {
      const items: ProcessedABIItem[] = log.topics.map(
        (topic) => <ProcessedABIItem>{ value: <string>topic }
      );
      if (log.topics.length) {
        processedLog.data.push(<ProcessedABIData>{
          title: "topics",
          items,
        });
      }
      if (log.data && log.data !== "0x" && log.data !== "0X") {
        processedLog.data.push(<ProcessedABIData>{
          title: "data",
          items: [{ value: log.data }],
        });
      }
    }
    return processedLog;
  });
};

const processTransactionInputDeploy = (
  contract: Contract
): ProcessedABIData => {
  const processedInputData = new ProcessedABIData();
  // Contract deploy.
  processedInputData.title = `new ${contract.contract_name}`;

  const c: AbiItem = contract.abi.find((a) => a.type === "constructor");
  if (c && c.inputs.length > 0) {
    // TODO we know how to decode the constructor args, and we know they are at the end of the input_data, but
    // we don't know where they begin.
    processedInputData.items = c.inputs.map((input: AbiInput) => {
      return <ProcessedABIItem>{ name: input.name, value: "<unknown>" };
    });
  }
  return processedInputData;
};

const processAbiItem = (
  input: AbiInput,
  decoded: any,
  address: Address
): ProcessedABIItem => {
  const item = new ProcessedABIItem();
  item.name = input.name;
  item.value = decoded[input.name];
  if (address.erc_types.includes(ErcName.Go20)) {
    if (input.name === "value") {
      if (address.decimals) {
        const val = convertWithDecimals(
          decoded[input.name],
          false,
          true,
          address.decimals
        );
        item.value = `${val} ${address.token_symbol}`;
      }
    }
  }
  if (address.erc_types.includes(ErcName.Go721)) {
    if (input.name === "tokenId") {
      item.link = `/token/${address.address}/asset/${decoded[input.name]}`;
      return item;
    } else if (input.name === "tokenURI") {
      item.link = decoded[input.name];
      item.linkExternal = true;
      return item;
    }
  }
  if (input.name === "cid" && input.type === "bytes" && !input.indexed) {
    const hex = decoded[input.name];
    if (hex.length > 2) {
      try {
        const cid: CID = new CID(Buffer.from(hex.slice(2), "hex"));
        const str = (cid as any).toString();
        item.value = str;
        item.link = `https://ipfs.io/ipfs/${str}`;
        item.linkExternal = true;
        return item;
      } catch (e) {
        console.error(`failed to parse cid ${hex}: ${e}`);
      }
    }
  }
  // if (ercTypes.includes(ErcName.GoST)) {
  //   //TODO link ETH stuff
  // }
  if (input.type === "address") {
    if (decoded[input.name] === "0x0000000000000000000000000000000000000000") {
      // Reformat empty addresses.
      switch (input.name) {
        case "to":
          item.value = "0x0 (burn)";
          return item;
        case "from":
          item.value = "0x0 (mint)";
          return item;
        case "previousOwner":
        case "newOwner":
          item.value = "0x0 (none)";
          return item;
        default:
          item.value = "0x0";
          return item;
      }
    }
    // Link non-empty addresses.
    item.link = `/addr/${decoded[input.name]}`;
    return item;
  }
  return item;
};

const processTransactionInputTo = ([abis, address, contract, tx]: [
  ContractAbiByID,
  Address,
  Contract,
  any
]): ProcessedABIData => {
  const processedInputData = new ProcessedABIData();
  // Contract call.
  const methodId = tx.input_data.slice(0, 10);
  let c: AbiItem;
  if (contract && contract.abi) {
    // Check the attached verified abi.
    processedInputData.title = `${contract.contract_name}.`;
    // TODO this is inefficient - could be cached or precomputed
    c = contract.abi.find(
      (a) => methodId === web3.abi.encodeFunctionSignature(a)
    );
  }
  if (!c) {
    // Check known functions.
    processedInputData.title = "";
    c = abis[methodId];
  }
  if (!c) {
    // We don't recognize this method.
    return null;
  }
  processedInputData.title += c.name;
  try {
    const d: object = web3.abi.decodeParameters(
      c.inputs,
      "0x" + tx.input_data.slice(10)
    );
    processedInputData.items = c.inputs.map((input: AbiInput) =>
      processAbiItem(input, d, address)
    );
  } catch (e) {
    console.error("failed to decode input data", e);
    processedInputData.items = c.inputs.map((input) => {
      return <ProcessedABIItem>{ name: input.name, value: "? error" };
    });
  }
  return processedInputData;
};

export const request = {
  async getRpcProvider() {
    let data: any = await ins.get("/rpc_provider").then(async (res: any) => {
      let toastContent = {};

      const metaMaskProvider = new Web3(Web3.givenProvider, null);
      const web3Provider = new Web3(
        new Web3.providers.HttpProvider(res?.data),
        null,
      );

      if (!metaMaskProvider.currentProvider) {
        return {
          content: "Metamask is not enabled",
          status: "danger",
        };
      }
      let web3NetID = await web3Provider.eth.net.getId(
        async (err, web3NetID) => {
          if (err) {
            return {
              content: "Metamask is enabled but can't get network id",
              status: "danger",
            };
          }
        }
      );

      let metaToast = await metaMaskProvider.eth.net.getId(
        (err, metamask3NetID) => {
          if (err) {
            toastContent = {
              content:
                "Metamask is enabled but can't get network id from Metamask",
              status: "error",
            };
          }
          return toastContent;
        }
      );

      if (web3NetID !== metaToast) {
        toastContent = {
          content: "Metamask is enabled but networks are different",
          status: "danger",
        };
      } else {
        toastContent = {
          metaToast,
          web3NetID,
        };
      }
      return toastContent;
    });
    return data;
  },

  async getSupplyStats() {
    return ins.get("/supply");
  },
  async getStats() {
    return ins.get("/stats");
  },
  async getRecentBlocks() {
    return ins.get("/blocks");
  },
  async getBlockDetail(blockNum: number | string) {
    return ins.get(`/blocks/${blockNum}`);
  },
  async getBlockTransactions(blockNum: number | string, data: any) {
    return ins.get(`/blocks/${blockNum}/transactions`, { params: data });
  },
  async getAddress(addrHash: string) {
    return ins.get(`/address/${addrHash}`);
  },
  async checkBlockExist(blockHash: string) {
    return ins.head("/blocks/" + blockHash);
  },
  async checkTransactionExist(blockHash: string) {
    return ins.head("/transaction/" + blockHash);
  },
  async getAddressTransactions(addrHash: string, data?: any) {
    return ins.get("/address/" + addrHash + "/transactions", { params: data });
  },
  async getAddressInternal(addrHash: string, data?: any) {
    return ins.get("/address/" + addrHash + "/internal_transactions", {
      params: data,
    });
  },
  async getAddressTokenHolders(addrHash: string, data?: any) {
    return ins.get("/address/" + addrHash + "/holders", {
      params: data,
    });
  },
  async getAddressTokenTXS(addrHash: string, data?: any) {
    return ins.get("/address/" + addrHash + "/holders", {
      params: data,
    });
  },
  async getOwnedTokens(addrHash: string, data?: any) {
    return ins.get("/address/" + addrHash + "/owned_tokens", {
      params: data,
    });
  },
  async getContract(addrHash: string) {
    return ins.get("/address/" + addrHash + "/contract");
  },
  async getSignerList() {
    return ins.get("/signers/list");
  },
  async getSignerStats() {
    return ins.get("/signers/stats");
  },
  async getAccountWallet(privateKey: string) {
    return web3.accounts.privateKeyToAccount(privateKey);
  },
  async getBalance(address: string) {
    return web3.getBalance(address);
  },
  async createAccount() {
    return web3.accounts.create();
  },
  async sendTx(tx: TransactionConfig, account: Account) {
    let data: any = await web3
      .getTransactionCount(account?.address)
      .then(async (res: any) => {
        tx.nonce = res;

        return web3.accounts
          .signTransaction(tx, account.privateKey)
          .then(async (_data: SignedTransaction) => {
            let receipt = await web3.sendSignedTransaction(
              _data?.rawTransaction
            );
            return receipt;
          });
      });
    return data;
  },

  async getTxData(hash: string) {
    let Web3Tx: Web3Tx = await web3.getTransaction(hash);
    let TransactionReceipt: TransactionReceipt =
      await web3.getTransactionReceipt(hash);
    if (_.isEmpty(Web3Tx) && _.isEmpty(TransactionReceipt)) {
      return null;
    }
    const tx: Web3Tx = Web3Tx;
    const txReceipt = TransactionReceipt;
    const finalTx: Transaction = new Transaction();
    finalTx.tx_hash = tx.hash;
    finalTx.value = tx.value;
    finalTx.gas_price = tx.gasPrice;
    finalTx.gas_limit = "" + tx.gas;
    finalTx.nonce = tx.nonce;
    finalTx.input_data = tx.input.replace(/^0x/, "");
    finalTx.from = tx.from;
    finalTx.to = tx.to;
    if (txReceipt) {
      finalTx.block_number = tx.blockNumber;
      finalTx.gas_fee = "" + +tx.gasPrice * txReceipt.gasUsed;
      finalTx.contract_address =
        txReceipt.contractAddress &&
        txReceipt.contractAddress !==
          "0x0000000000000000000000000000000000000000"
          ? txReceipt.contractAddress
          : null;
      finalTx.status = txReceipt.status;
      finalTx.created_at = new Date();
    }
    return finalTx;
  },

  async getTransaction(hash: string, nonceId: string) {
    if (nonceId) {
      return ins.get("/address/" + hash + "/tx/" + nonceId);
    } else {
      return ins.get("/transaction/" + hash);
    }
  },

  async getBlockNumber() {
    return web3.getBlockNumber();
  },

  async processTransaction(tx: Transaction) {
    if (tx?.input_data && tx?.input_data !== "0x" && tx?.input_data !== "0X") {
      let data: ProcessedABIData;
      if (tx?.to) {
        let abiJson = await Axios.get(
          "/assets/abi/functions.json",
          null,
        ).then((res) => {
          let abi: any = <ContractAbi>{};
          let abiByID: ContractAbiByID = {};
          Object.entries(res?.data).forEach(
            (value: any) => {
              abi[value[0]] = <AbiItem>value[1];
              abiByID[value[1].id] = <AbiItem>value[1];
            }
          );
          return abiByID;
        });
        let { data: address } = await ins.get(`/address/${tx?.to}`);
        let { data: contract } = await ins.get(`/address/${tx?.to}/contract`);
        if (
          !_.isEmpty(abiJson) &&
          !_.isEmpty(address) &&
          !_.isEmpty(contract)
        ) {
          data = processTransactionInputTo([
            abiJson,
            contract,
            address,
            tx,
          ]);
        }
      } else if (tx.contract_address) {
        let { data: contract } = await ins.get(
          `/address/${tx?.contract_address}/contract`
        );
        data = processTransactionInputDeploy(contract);
      }
      if (data) {
        tx.processedInputData = data;
      }
      // return tx;
    }
    if (!!tx.parsedLogs.length) {

      let { data: abiJson } = await Axios.get(
        "/assets/abi/events.json",
        null,
      );
      let logs = await processTransactionLogs([abiJson, tx]);
      tx.processedLogs = logs;

      return tx;
    }
  },

  async getCompilersList() {
    return ins.get("/compiler");
  },

  async compile(data: any) {
    return ins.post("/verify", data);
  },

  async getFunctionsAbi() {
    let abiJson = await Axios.get(
      "/assets/abi/functions.json",
      null,
    ).then((res) => {
      let abi: any = <ContractAbi>{};
      let abiByID: ContractAbiByID = {};
      Object.entries(res?.data).forEach(
        (value: any) => {
          abi[value[0]] = <AbiItem>value[1];
          abiByID[value[1].id] = <AbiItem>value[1];
        }
      );
      return abi;
    });

    return abiJson;
  },
};
