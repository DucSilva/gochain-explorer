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
  getSupplyStats() {
    return ins.get("/supply");
  },
  getStats() {
    return ins.get("/stats");
  },
  getRecentBlocks() {
    return ins.get("/blocks");
  },
  getBlockDetail(blockNum: number | string) {
    return ins.get(`/blocks/${blockNum}`);
  },
  getBlockTransactions(blockNum: number | string) {
    return ins.get(`/blocks/${blockNum}/transactions`);
  },
  getAddress(addrHash: string) {
    return ins.get(`/address/${addrHash}`);
  },
  checkBlockExist(blockHash: string) {
    return ins.head("/blocks/" + blockHash);
  },
  checkTransactionExist(blockHash: string) {
    return ins.head("/transaction/" + blockHash);
  },
  getAddressTransactions(addrHash: string, data?: any) {
    return ins.get("/address/" + addrHash + "/transactions", { params: data });
  },
  getAddressInternal(addrHash: string, data?: any) {
    return ins.get("/address/" + addrHash + "/internal_transactions", {
      params: data,
    });
  },
  getAddressTokenHolders(addrHash: string, data?: any) {
    return ins.get("/address/" + addrHash + "/holders", {
      params: data,
    });
  },
  getAddressTokenTXS(addrHash: string, data?: any) {
    return ins.get("/address/" + addrHash + "/holders", {
      params: data,
    });
  },
  getOwnedTokens(addrHash: string, data?: any) {
    return ins.get("/address/" + addrHash + "/owned_tokens", {
      params: data,
    });
  },
  getContract(addrHash: string) {
    return ins.get("/address/" + addrHash + "/contract");
  },
  getSignerList() {
    return ins.get("/signers/list");
  },
  getSignerStats() {
    return ins.get("/signers/stats");
  },
  getAccountWallet(privateKey: string) {
    return web3.accounts.privateKeyToAccount(privateKey);
  },
  getBalance(address: string) {
    return web3.getBalance(address);
  },
  createAccount() {
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

  getTxData(hash: string) {
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

  getTransaction(hash: string, nonceId: string): any {
    if (nonceId) {
      return ins.get("/address/" + hash + "/tx/" + nonceId);
    } else {
      return ins.get("/transaction/" + hash);
    }
  },

  getBlockNumber() {
    return web3.getBlockNumber();
  },
};
