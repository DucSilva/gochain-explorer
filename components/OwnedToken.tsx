import { useDispatch, useSelector } from "react-redux";

import Link from "next/link";
import Pagination from "./Partials/Pagination";
import React from "react";
import { YY_MM_DD_HH_mm_ss } from "@Utils/constants";
import { getOwnedTokens } from "@Redux/actions/address/index";
import moment from "moment";

const OwnedToken = (props: any) => {
  const { addrHash = "", showPagination = true} = props;
  const { owned_tokens, addr } =
    useSelector((state: any) => state?.address) || [];
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(25);

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (addrHash) {
      if(showPagination){
        dispatch(getOwnedTokens({ addrHash, currentPage, pageSize }));
      } else {
        dispatch(getOwnedTokens({ addrHash }));
      }
    }
  }, [currentPage, pageSize]);

  return (
    <>
      {owned_tokens?.length > 0 ? (
        <>
          <table className="table table-striped">
            <thead>
              <tr>
                <th className="w-20 text-nowrap border-0">Balance</th>
                <th className="w-20 border-0">Balance (raw)</th>
                <th className="w-20 text-nowrap border-0">Token name</th>
                <th className="w-20 border-0">Contract</th>
                <th className="w-20 text-nowrap border-0">Updated at</th>
              </tr>
            </thead>
            <tbody>
              {owned_tokens?.map((token: any, index: string) => {
                return (
                  <tr key={index}>
                    <td className="text-nowrap">
                      {token?.balanceDec()} {token.token_symbol}
                    </td>
                    <td className="text-nowrap">{token?.balance}</td>
                    <td className="text-truncate">{token?.token_name}</td>
                    <td className="text-truncate text-monospace">
                      <Link href={`/addr/${token?.contract_address}`}>
                        <a className="ws-p">{token?.contract_address}</a>
                      </Link>
                    </td>
                    <td className="text-truncate">
                      {token?.created_at &&
                        moment(token?.updated_at).format(
                          YY_MM_DD_HH_mm_ss
                        )}{" "}
                      ({moment(token?.updated_at).fromNow()})
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {showPagination && (
            <Pagination
              currentPage={currentPage}
              totalCount={addr?.number_of_transactions || 0}
              pageSize={pageSize}
              onChangePageSize={(page: any) => setPageSize(page)}
              onPageChange={(page: any) => setCurrentPage(page)}
            />
          )}
        </>
      ) : (
        <div className="empty">No tokens</div>
      )}
    </>
  );
};

export default OwnedToken;
