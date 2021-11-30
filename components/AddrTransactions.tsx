import { useDispatch, useSelector } from "react-redux";

import Link from "next/link";
import Pagination from "./Partials/Pagination";
import React from "react";
import { YY_MM_DD_HH_mm_ss } from "@Utils/constants";
import { getAddressTransactions } from "@Redux/actions/address/index";
import moment from "moment";

const AddrTransactions = (addrHash: any) => {
  const { transactions, addr } = useSelector((state: any) => state?.address) || [];
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(25);

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (addrHash) {
      dispatch(getAddressTransactions({ addrHash, currentPage, pageSize }));
    }
  }, [currentPage, pageSize]);

  return (
    <>
      {transactions?.length > 0 ? (
        <>
          <table className="table table-striped">
            <thead>
              <tr>
                <th className="w-4 border-0">Status</th>
                <th className="w-20 border-0">Transaction hash</th>
                <th className="w-20 border-0">Processed at</th>
                <th className="text-shrink border-0"></th>
                <th className="w-20 border-0">Associate</th>
                <th className="text-nowrap text-center border-0">Value (GO)</th>
              </tr>
            </thead>
            <tbody>
              {transactions?.map((tx: any, index: string) => {
                return (
                  <tr key={index}>
                    <td className="text-monospace text-truncate">
                      <span
                        className={
                          tx.status
                            ? "badge badge-success"
                            : "badge badge-danger"
                        }
                      >
                        <small>{tx?.status ? "Success" : "Failed"}</small>
                      </span>
                    </td>

                    <td className="text-monospace text-truncate">
                      <Link href={`/tx/${tx.tx_hash}`}>
                        <a className="ws-p">{tx?.tx_hash}</a>
                      </Link>
                    </td>
                    <td className="text-truncate">
                      {tx?.created_at &&
                        moment(tx?.created_at).format(YY_MM_DD_HH_mm_ss)}{" "}
                      ({moment(tx?.created_at).fromNow()})
                    </td>

                    {addr?.address !== tx?.from ? (
                      <>
                        <td>
                          <img
                            src="../../../assets/icons/left.svg"
                            alt="From"
                          />
                        </td>
                        <td className="text-monospace text-truncate">
                          <Link href={`/addr/${tx.from}`}>
                            <a className="ws-p">{tx?.from}</a>
                          </Link>
                        </td>
                      </>
                    ) : (
                      <>
                        {addr?.address !== tx?.to ? (
                          <>
                            <td>
                              <img
                                src="../../../assets/icons/right.svg"
                                alt="To"
                              />
                            </td>
                            <td className="text-monospace text-truncate">
                              <Link href={`/addr/${tx.to}`}>
                                <a className="ws-p">{tx?.to}</a>
                              </Link>
                            </td>
                          </>
                        ) : (
                          <>
                            <td>
                              <img
                                src="../../../assets/icons/minus.svg"
                                alt="Self"
                              />
                            </td>
                            <td className="text-monospace text-truncate">
                              self
                            </td>
                          </>
                        )}
                      </>
                    )}

                    <td className="text-nowrap text-right text-monospace ws-p">
                      {/* {tx?.value === '0' ? '' : tx?.from === tx?.to ? '+/-' : addr?.address === tx?.to ? '+' : '-'} {tx?.value | weiToGO: false : true | bigNumber}} */}
                      {tx?.value === "0"
                        ? ""
                        : tx?.from === tx?.to
                        ? "+/-"
                        : addr?.address === tx?.to
                        ? "+"
                        : "-"}{" "}
                      {tx?.value}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <Pagination
            currentPage={currentPage}
            totalCount={addr?.number_of_transactions || 0}
            pageSize={pageSize}
            onChangePageSize={(page: any) => setPageSize(page)}
            onPageChange={(page: any) => setCurrentPage(page)}
          />
        </>
      ) : (
        <div className="empty">No transactions</div>
      )}
    </>
  );
};

export default AddrTransactions;
