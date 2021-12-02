// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

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
};
