// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import Axios from "axios";

const ins = Axios.create({
  baseURL: "https://testnet-explorer.gochain.io/api",
});

type Data = {
  name: string;
};

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
};
