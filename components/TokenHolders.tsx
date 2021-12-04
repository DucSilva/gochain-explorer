import { numberWithCommas, weiToGO } from "@Utils/functions";
import { useDispatch, useSelector } from "react-redux";

import Link from "next/link";
import Pagination from "./Partials/Pagination";
import React from "react";
import { getAddressHolder } from "@Redux/actions/address/index";

const TokenHolders = (addrHash: any) => {
  const { token_holders, addr } = useSelector((state: any) => state?.address) || [];
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(25);

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (addrHash) {
      dispatch(getAddressHolder({ addrHash, currentPage, pageSize }));
    }
  }, [currentPage, pageSize]);

  return (
    <>
      {token_holders?.length > 0 ? (
        <>
          <table className="table table-striped">
            <thead>
              <tr>
                <th className="w-50">Token holder</th>
                <th className="w-50 text-center">
                  Balance ({addr?.token_symbol})
                </th>
              </tr>
            </thead>
            <tbody>
              {token_holders?.map((holder: any, index: string) => {
                return (
                  <tr key={index}>
                    <td className="text-truncate text-monospace">
                      <Link href={`/addr/${holder?.token_holder_address}`}>
                        <a className="ws-p">{holder?.token_holder_address}</a>
                      </Link>
                    </td>
                    <td className="text-nowrap text-monospace text-right ws-p">
                      {weiToGO(holder?.balance, false, true, numberWithCommas(addr?.decimals))}
                      {holder?.balance}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <Pagination
            currentPage={currentPage}
            totalCount={addr?.number_of_token_holders || 0}
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

export default TokenHolders;
