import { numberWithCommas, weiToGO } from "@Utils/functions";
import { useDispatch, useSelector } from "react-redux";

import AppLayout from "@Components/Layout/AppLayout";
import Head from "next/head";
import Link from "next/link";
import Pagination from "@Components/Partials/Pagination";
import React from "react";
import { YY_MM_DD_HH_mm_ss } from "@Utils/constants";
import { getBlockTransactions } from "@Redux/actions/block";
import moment from "moment";
import { request } from "@Pages/api/handler";
import styles from "@Styles/Home.module.css";
import { useRouter } from "next/router";

const BlockDetail = () => {
  const dispatch = useDispatch();
  const [queryId, $queryId] = React.useState<any | null>("");
  const [signers, setSigners] = React.useState<any | null>("");
  const [blockDetail, setBlockDetail] = React.useState<any | null>({});
  const { transactions } = useSelector((state: any) => state?.block) || [];
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(25);
  const router = useRouter();

  React.useEffect(() => {
    let signerList = JSON.parse(localStorage.getItem("signers") || "{}");
    if (signerList) setSigners(signerList);
  }, []);

  React.useEffect(() => {
    const { query } = router;
    if (query?.id) {
      const { id } = query;
      $queryId(id);
    }
  }, [router]);

  const getDetailBlock = async () => {
    if (queryId) {
      const result = await request.getBlockDetail(queryId);
      return result;
    }
  };

  React.useEffect(() => {
    getDetailBlock().then((res) => {
      let block = res?.data;
      if (block?.miner) {
        block.signerDetails = signers[block?.miner?.toLowerCase()] || null;
        if (block?.extra && block?.extra?.candidate) {
          block.extra.signerDetails =
            signers[block?.extra?.candidate.toLowerCase()] || null;
        }
      }
      setBlockDetail(block);
    });
  }, [queryId]);

  React.useEffect(() => {
    if (blockDetail) {
      dispatch(
        getBlockTransactions({ addrHash: blockDetail?.number, currentPage, pageSize })
      );
    }
  }, [currentPage, pageSize, queryId, blockDetail]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Block - GoChain Explorer</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppLayout>
        <div className="container">
          <div className="card">
            <div className="card-body">
              <div className="card-title">
                <img src="/assets/icons/blocks.svg" /> Block
              </div>
              <dl>
                <dt>Block Number</dt>
                <dd>{blockDetail?.number}</dd>
                <dt>Block Hash</dt>
                <dd>{blockDetail?.hash}</dd>
                <dt>Created At</dt>
                <dd>
                  {blockDetail?.created_at &&
                    moment(blockDetail?.created_at).format(
                      YY_MM_DD_HH_mm_ss
                    )}{" "}
                  (
                  {blockDetail?.created_at &&
                    moment(blockDetail?.created_at).fromNow(true)}{" "}
                  ago )
                </dd>
                <dt>Parent block hash</dt>
                <dd>
                  <Link href={`/block/${blockDetail?.parent_hash}`}>
                    <a>{blockDetail?.parent_hash}</a>
                  </Link>
                </dd>
                <dt>Signer</dt>
                <dd>
                  <Link href={`/addr/${blockDetail?.miner}`}>
                    <a>{blockDetail?.miner}</a>
                  </Link>{" "}
                  {blockDetail?.extra && (
                    <>
                      (
                      <a
                        href={
                          blockDetail?.signerDetails?.url ||
                          "https://gochain.io/"
                        }
                        target="_blank"
                        rel="noreferrer"
                      >
                        {blockDetail?.extra?.vanity}
                      </a>
                      )
                    </>
                  )}
                </dd>
                <dt>Gas Limit</dt>
                <dd>{numberWithCommas(blockDetail?.gas_limit)}</dd>
                <dt>Gas Used</dt>
                <dd>{numberWithCommas(blockDetail?.gas_used)}</dd>
                {blockDetail?.gas_fees && (
                  <>
                    <dt>Gas Fees</dt>
                    <dd>
                      {numberWithCommas(weiToGO(blockDetail?.gas_fees))}(
                      <span
                        title={
                          blockDetail?.total_fees_burned
                            ? numberWithCommas(
                                weiToGO(blockDetail?.total_fees_burned)
                              )
                            : ""
                        }
                      >
                        <img src="/assets/icons/fire.svg" /> burned
                      </span>
                      )
                    </dd>
                  </>
                )}

                <dt>Transactions Count</dt>
                <dd>{blockDetail?.tx_count}</dd>
                <dt>Difficulty</dt>
                <dd>{blockDetail?.difficulty}</dd>
                <dt>Extra Data</dt>
                <dd>{blockDetail?.extra?.vanity}</dd>
                {blockDetail?.extra?.has_vote && (
                  <>
                    <dt>Vote</dt>
                    <dd>
                      {blockDetail?.extra?.auth ? "Add" : "Remove"}{" "}
                      {blockDetail?.extra?.is_voter_election
                        ? "voter"
                        : "signer"}
                      <Link href={`/addr/${blockDetail.extra.candidate}`}>
                        <a>{blockDetail?.extra?.candidate}</a>
                      </Link>
                      {blockDetail?.extra?.signerDetails && (
                        <>
                          (
                          <a
                            href={blockDetail.extra.signerDetails.url}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {blockDetail?.extra?.signerDetails?.name}
                          </a>
                          )
                        </>
                      )}
                    </dd>
                  </>
                )}
              </dl>
            </div>
          </div>

          <div className="card mt-4">
            <div className="card-body">
              <div className="card-title">
                <img src="/assets/icons/blocks.svg" /> Transactions
              </div>
              {transactions?.length > 0 ? (
                <>
                  <table className="table">
                    <thead>
                      <tr>
                        <th className="w-4 border-0">Status</th>
                        <th className="w-20 border-0">Transaction hash</th>
                        <th className="w-20 border-0">Processed at</th>
                        <th className="w-20 border-0">From</th>
                        <th className="w-20 border-0">To</th>
                        <th className="w-16 border-0">Value (GO)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.map((tx: any) => {
                        return (
                          <tr key={tx?.tx_hash}>
                            <td className="text-monospace text-truncate">
                              <span
                                className={
                                  tx.status
                                    ? "badge badge-success"
                                    : "badge badge-danger"
                                }
                              >
                                <small>
                                  {tx.status ? "Success" : "Failed"}
                                </small>
                              </span>
                            </td>
                            <td className="text-monospace text-truncate">
                              <Link href={`/tx/${tx?.tx_hash}`}>
                                <a className="ws-p">{tx?.tx_hash}</a>
                              </Link>
                            </td>
                            <td className="text-nowrap">
                              {tx?.created_at &&
                                moment(tx.created_at).format(
                                  YY_MM_DD_HH_mm_ss
                                )}{" "}
                              (
                              {tx?.created_at &&
                                moment(tx?.created_at).fromNow(true)}{" "}
                              ago )
                            </td>
                            <td className="text-monospace text-truncate">
                              <Link href={`/addr/${tx?.from}`}>
                                <a className="ws-p">{tx?.from}</a>
                              </Link>
                            </td>
                            <td className="text-monospace text-truncate">
                              <Link href={`/addr/${tx?.to}`}>
                                <a className="ws-p">{tx?.to}</a>
                              </Link>
                            </td>
                            <td>
                              {numberWithCommas(
                                weiToGO(tx?.value, false, true)
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  <div className="mt-4">
                    <Pagination
                      currentPage={currentPage}
                      totalCount={blockDetail?.tx_count || 0}
                      pageSize={pageSize}
                      onChangePageSize={(page: any) => setPageSize(page)}
                      onPageChange={(page: any) => setCurrentPage(page)}
                    />
                  </div>
                </>
              ) : (
                <div className="empty">No transactions</div>
              )}
            </div>
          </div>
        </div>
      </AppLayout>
    </div>
  );
};

export default BlockDetail;
