import { useDispatch, useSelector } from "react-redux";

import Link from "next/link";
import React from "react";
import { YY_MM_DD_HH_mm_ss } from "@Utils/constants";
import { getBlock } from "@Redux/actions/home/index";
import moment from "moment";

const RecentBlock = () => {
  const dispatch = useDispatch();
  const { blocks: data } = useSelector((state) => state?.home) || {};

  React.useEffect(() => {
    dispatch(getBlock({}));
  }, []);

  return (
    <div className="card mt-4">
      <div className="card-body">
        <div className="card-title">
          <img src="/assets/icons/blocks.svg" /> RECENT BLOCKS
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th className="w-10 border-0">Block</th>
              <th className="w-10 border-0">TXs</th>
              <th className="w-40 border-0">Signer</th>
              <th className="w-15 border-0">Extra data</th>
              <th className="w-25 border-0">Created</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data?.blocks?.length > 0 &&
              data?.blocks.map((block: any) => {
                return (
                  <tr key={block?.number}>
                    <td className="text-monospace">
                      <Link href={`/block/${block.number}`}>
                        <a>{block?.number}</a>
                      </Link>
                    </td>
                    <td>{block.tx_count}</td>
                    <td className="text-monospace text-truncate">
                      <Link href={`/addr/${block?.miner}`}>
                        <a className="ws-p">{block?.miner}</a>
                      </Link>
                    </td>
                    <td className="text-truncate">{block?.extra?.vanity}</td>
                    <td className="text-truncate">
                      {block?.created_at &&
                        moment(block?.created_at).format(
                          YY_MM_DD_HH_mm_ss
                        )}{" "}
                      (
                      {block?.created_at &&
                        moment(block?.created_at).fromNow(true)}{" "}
                      ago )
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentBlock;
