import { useDispatch, useSelector } from "react-redux";

import Link from "next/link";
import Pagination from "./Partials/Pagination";
import React from "react";
import { YY_MM_DD_HH_mm_ss } from "@Utils/constants";
import { getAddressTokenTXS } from "@Redux/actions/address/index";
import moment from "moment";

const TokenTXS = (addrHash: any) => {
  const { token_transactions, addr } =
    useSelector((state: any) => state?.address) || [];
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(25);

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (addrHash) {
      dispatch(getAddressTokenTXS({ addrHash, currentPage, pageSize }));
    }
  }, [currentPage, pageSize]);

  return (
    <>
      {token_transactions?.length > 0 ? (
        <>
          <table className="table table-striped">
            <thead>
              <tr>
                <th className="w-4 border-0">Status</th>
                <th className="w-20 border-0">Transaction hash</th>
                <th className="border-0">Processed at</th>
                <th className="text-shrink border-0"></th>
                <th className="w-20 border-0">Associate</th>
                <th className="w-10 text-nowrap border-0">Token</th>
                <th className="text-nowrap text-center border-0">Value</th>
              </tr>
            </thead>
            <tbody>
              {token_transactions?.map((tx: any, index: string) => {
                return (
                  <tr key={index}>
                    <td className="text-monospace text-truncate badge badge-success">
                      <span>
                        <small>Success</small>
                      </span>
                    </td>
                    <td className="text-truncate text-monospace">
                      <Link href={`/tx/${tx?.transaction_hash}`}>
                        <a className="ws-p">{tx?.transaction_hash}</a>
                      </Link>
                    </td>
                    <td className="text-truncate">
                      {tx?.created_at != "0001-01-01T00:00:00Z" ? (
                        <>
                          {moment(tx?.created_at).format(YY_MM_DD_HH_mm_ss)} (
                          {moment(tx?.created_at).fromNow()})
                        </>
                      ) : (
                        <>
                          {moment(tx?.updated_at).format(YY_MM_DD_HH_mm_ss)} (
                          {moment(tx?.updated_at).fromNow()})
                        </>
                      )}
                    </td>
                    {/* <ng-container *ngIf="addr.address === tx.to_address; else out"> */}
                    {addr?.address === tx?.to_address ? (
                      <>
                        <td>
                          <img
                            src="../../../assets/icons/left.svg"
                            alt="From"
                          />
                        </td>
                        <td className="text-truncate">
                          <Link href={`/addr/${tx.from_address}}`}>
                            <a className="ws-p">{tx?.from_address}</a>
                          </Link>
                        </td>
                      </>
                    ) : (
                      <>
                        <td>
                          <img src="../../../assets/icons/right.svg" alt="To" />
                        </td>
                        <td className="text-truncate">
                          <Link href={`/addr/${tx.to_address}`}>
                            <a className="ws-p">{tx?.to_address}</a>
                          </Link>
                        </td>
                      </>
                    )}
                    <td className="text-truncate">
                      {tx?.address.token_symbol}
                    </td>
                    <td className="text-nowrap text-right ws-p text-monospace">
                      {/* {addr.address === tx.to_address ? '+' : tx.value === 0 ? '' : '-'}} {{tx.value | weiToGO: false : true : tx.address.decimals | bigNumber} */}
                      {addr?.address === tx?.to_address
                        ? "+"
                        : tx?.value === 0
                        ? ""
                        : "-"}{" "}
                      {tx?.value ? true : tx?.address?.decimals}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <Pagination
            currentPage={currentPage}
            totalCount={addr?.number_of_token_transactions || 0}
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

export default TokenTXS;
