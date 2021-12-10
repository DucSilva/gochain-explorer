// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import {
  SignedTransaction,
  TransactionConfig,
  TransactionReceipt,
  Transaction as Web3Tx,
} from "web3-core";

import { Account } from "web3-core";
import Axios from "axios";
import { Transaction } from "@Models/transaction.model";
import Web3 from "web3";

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

export const request = {
  async getRpcProvider() {
    let data: any = await ins.get("/rpc_provider").then(async (res: any) => {
      let toastContent = {};

      const metaMaskProvider = new Web3(Web3.givenProvider, null, {
        transactionConfirmationBlocks: 1,
      });
      const web3Provider = new Web3(
        new Web3.providers.HttpProvider(res?.data),
        null,
        { transactionConfirmationBlocks: 1 }
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
    // return this.w3Call.pipe(
    //   concatMap((web3: Web3) => {
    //     return forkJoin<Web3Tx, TransactionReceipt>([
    //       fromPromise<Web3Tx>(web3.eth.getTransaction(txHash)),
    //       fromPromise<TransactionReceipt>(
    //         web3.eth.getTransactionReceipt(txHash)
    //       ),
    //     ]).pipe(
    //       map((res: [Web3Tx, TransactionReceipt]) => {
    //         if (!res[0]) {
    //           return null;
    //         }
    //         const tx: Web3Tx = res[0];
    //         const txReceipt = res[1];
    //         const finalTx: Transaction = new Transaction();
    //         finalTx.tx_hash = tx.hash;
    //         finalTx.value = tx.value;
    //         finalTx.gas_price = tx.gasPrice;
    //         finalTx.gas_limit = "" + tx.gas;
    //         finalTx.nonce = tx.nonce;
    //         finalTx.input_data = tx.input.replace(/^0x/, "");
    //         finalTx.from = tx.from;
    //         finalTx.to = tx.to;
    //         if (txReceipt) {
    //           finalTx.block_number = tx.blockNumber;
    //           finalTx.gas_fee = "" + +tx.gasPrice * txReceipt.gasUsed;
    //           finalTx.contract_address =
    //             txReceipt.contractAddress &&
    //             txReceipt.contractAddress !==
    //               "0x0000000000000000000000000000000000000000"
    //               ? txReceipt.contractAddress
    //               : null;
    //           finalTx.status = txReceipt.status;
    //           finalTx.created_at = new Date();
    //         }
    //         return finalTx;
    //       })
    //     );
    //   })
    // );
  },

  async getTransaction(hash: string, nonceId: string): any {
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
    console.log("tx", tx);
    if (tx?.input_data && tx?.input_data !== "0x" && tx?.input_data !== "0X") {
      // code here
    }
  },

  async getCompilersList() {
    return ins.get("/compiler");
  },

  async compile(data: any) {
    return ins.post("/verify", data);
  },
};
