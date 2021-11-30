import { useDispatch, useSelector } from "react-redux";

import CustomDoughnutChart from "./Charts";
import Link from "next/link";
import React from "react";

const SignerTab = ({ stat }: any) => {
  const dispatch = useDispatch();

  return (
    <>
      <h6 className="text-uppercase text-primary text-center mb-1">
        {stat?.range}
      </h6>
      <div className="chart pb-1 mb-1 d-flex justify-content-center doughnut-chart-custom">
        <CustomDoughnutChart data={stat?.chartData} />
      </div>

      <div className="my-1">
        <p>
          Block signers for{" "}
          {stat?.block_range?.end_block - stat?.block_range?.start_block} blocks
          from
          <Link href={`/blocks/${stat?.block_range?.start_block}`}>
            <a>#{stat?.block_range?.start_block}</a>
          </Link>
          to{" "}
          <Link href={`/blocks/${stat?.block_range?.end_block}`}>
            <a>#{stat?.block_range?.end_block}</a>
          </Link>
          .
        </p>
      </div>
      <div>
        <div className="table-responsive">
          <table className="table table-bordered table-signer-custom">
            <thead>
              <tr className="border-bottom-0">
                <th>
                  <sv-default-sorter by="data.signer_address">
                    Account
                  </sv-default-sorter>
                </th>
                <th>
                  <sv-default-sorter by="data.name">Name</sv-default-sorter>
                </th>
                <th>
                  <sv-default-sorter by="data.region">Region</sv-default-sorter>
                </th>
                <th>
                  <sv-default-sorter by="data.url">URL</sv-default-sorter>
                </th>
                <th className="text-right">
                  <sv-default-sorter by="blocks_count">
                    Blocks
                  </sv-default-sorter>
                </th>
                <th className="text-right">
                  <sv-default-sorter by="percent">%</sv-default-sorter>
                </th>
              </tr>
            </thead>
            <tbody>
              {stat?.signer_stats.map((item: any, index: any) => {
                return (
                  <tr key={index}>
                    <td className="text-monospace">
                      <Link href={`/addr/${item?.signer_address}`}>
                        <a>{item?.signer_address}</a>
                      </Link>
                    </td>
                    <td>{item?.data?.name}</td>
                    <td>{item?.data?.region}</td>
                    <td>
                      <a
                        href={item?.data?.url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {item?.data?.url}
                      </a>
                    </td>
                    <td>{item?.blocks_count}</td>
                    <td>{item?.percent}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default SignerTab;
