import { useDispatch, useSelector } from "react-redux";

import Link from "next/link";
import Pagination from "./Partials/Pagination";
import React from "react";
import { YY_MM_DD_HH_mm_ss } from "@Utils/constants";
import { getAddressInternal } from "@Redux/actions/address/index";
import moment from "moment";

const AddrInternalTXS = (addrHash: any) => {
  const { internal_transactions, addr } =
    useSelector((state: any) => state?.address) || [];
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(25);

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (addrHash) {
      dispatch(getAddressInternal({ addrHash, currentPage, pageSize }));
    }
  }, [currentPage, pageSize]);

  return (
    <>
      {internal_transactions?.length > 0 ? (
        <>
          <table className="table table-striped">
            <thead>
              <tr>
                <th className="w-4 border-0">Status</th>
                <th className="w-20 border-0">Transaction hash</th>
                <th className="w-20 border-0">Processed at</th>
                <th className="w-20 border-0">From</th>
                <th className="w-20 border-0">To</th>
                <th className="w-16 text-nowrap border-0">
                  Value ({addr?.token_symbol})
                </th>
              </tr>
            </thead>
            <tbody>
              {internal_transactions?.map((tx: any, index: string) => {
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

                    <td className="text-truncate text-monospace">
                      <Link href={`/tx/${tx?.transaction_hash}`}>
                        <a className="ws-p">{tx?.transaction_hash}</a>
                      </Link>
                    </td>
                    <td>
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
                    <td className="text-truncate text-monospace">
                      <Link href={`/addr/${tx?.from_address}`}>
                        <a className="ws-p">{tx?.from_address}</a>
                      </Link>
                    </td>
                    <td className="text-truncate text-monospace">
                      <Link href={`/addr/${tx?.to_address}`}>
                        <a className="ws-p">{tx?.to_address}</a>
                      </Link>
                    </td>
                    <td className="text-nowrap text-right text-monospace ws-p">
                      {/* {tx?.value | weiToGO: false : true : addr.decimals | bigNumber}  */}
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

export default AddrInternalTXS;
