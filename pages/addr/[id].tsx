import { numberWithCommas, weiToGO } from "@Utils/functions";
import { useDispatch, useSelector } from "react-redux";

import AddrInternalTXS from "@Components/AddrInternalTXS";
import AddrTransactions from "@Components/AddrTransactions";
import AppLayout from "@Components/Layout/AppLayout";
import ContractSource from "@Components/ContractSource";
import ControlledTabs from "@Components/Tabs";
import Head from "next/head";
import Interactor from "@Components/Interactor";
import Link from "next/link";
import Loading from "@Components/Loading";
import OwnedToken from "@Components/OwnedToken";
import React from "react";
import { TOKEN_TYPES } from "@Utils/constants";
import TokenHolders from "@Components/TokenHolders";
import TokenTXS from "@Components/TokenTXS";
import { YY_MM_DD_HH_mm_ss } from "@Utils/constants";
import { getAddress } from "@Redux/actions/address/index";
import moment from "moment";
import styles from "@Styles/Home.module.css";
import { useRouter } from "next/router";

const Address = () => {
  const dispatch = useDispatch();
  const { addr, isLoading } = useSelector((state: any) => state.address) || {};
  const [queryId, $queryId] = React.useState<any | null>("");
  const router = useRouter();

  React.useEffect(() => {
    const { query } = router;
    if (query?.id) {
      const { id } = query;
      $queryId(id);
    }
  }, [router]);

  React.useEffect(() => {
    if (queryId) {
      dispatch(getAddress({ addrHash: queryId }));
    }
  }, [queryId]);

  const tabs = [
    {
      title: "Transactions",
      description: "Transactions to and from this account.",
      eventKey: "transactions",
      renderTab: () => <AddrTransactions addrHash={queryId} />,
      isRender: true,
      isShowDes: true,
    },
    {
      title: `${addr?.token_symbol || "Internal"} Transfers`,
      description: `Internal ${addr?.token_symbol || ""} token transfers.`,
      eventKey: "internal_transactions",
      renderTab: () => <AddrInternalTXS addrHash={queryId} />,
      isRender: addr?.contract,
      isShowDes: true,
    },
    {
      title: `${addr?.token_symbol ? addr?.token_symbol + " " : ""} Holders`,
      description: `Balances of accounts holding ${
        addr?.token_symbol || ""
      } tokens.`,
      eventKey: "holders",
      renderTab: () => <TokenHolders addrHash={queryId} />,
      isRender: addr?.contract,
      isShowDes: true,
    },
    {
      title: "Token Transfers",
      description: "Token transfers to and from this account.",
      eventKey: "token_transactions",
      renderTab: () => <TokenTXS addrHash={queryId} />,
      isRender: true,
      isShowDes: true,
    },
    {
      title: "Tokens Held",
      description: "Balance of tokens held by this account.",
      eventKey: "owned_tokens",
      renderTab: () => <OwnedToken addrHash={queryId} />,
      isRender: !addr?.contract,
      isShowDes: true,
    },
    {
      title: "Interact",
      description: "",
      eventKey: "interact",
      renderTab: () => <Interactor addr={addr} addrHash={queryId} />,
      isRender: addr?.contract,
      isShowDes: true,
    },
    {
      title: "Contract Source",
      description: "",
      eventKey: "contract_source",
      renderTab: () => <ContractSource addrHash={queryId} />,
      isRender: addr?.contract,
      isShowDes: true,
    },
  ];

  return (
    <div className={styles.container}>
      <Head>
        <title>Block - GoChain Explorer</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppLayout>
        <div className="container">
          {isLoading ? (
            <Loading />
          ) : (
            <>
              <div className="card">
                <div className="card-body">
                  <div className="card-title">
                    <img src="/assets/icons/hash.svg" /> Address
                  </div>
                  <div className="row">
                    <div className="col-lg-10 col-md-9">
                      <dl>
                        <dt>Address hash:</dt>
                        <dd>
                          <span className="text-monospace">
                            {addr?.address}
                          </span>
                          {addr?.signerDetails && (
                            <>
                              (
                              <a
                                href={addr?.signerDetails?.url}
                                target="_blank"
                                rel="noreferrer"
                              >
                                {addr?.signerDetails?.name}
                              </a>
                              )
                            </>
                          )}
                        </dd>
                        <dt>Balance:</dt>
                        <dd>{numberWithCommas(weiToGO(addr?.balance_wei))}</dd>

                        {addr?.contract && (
                          <>
                            {addr?.target && (
                              <>
                                <dt>Target:</dt>
                                <dd>
                                  <Link href={`/addr/${addr?.target}`}>
                                    <a className="text-monospace">
                                      {addr?.target}
                                    </a>
                                  </Link>
                                </dd>
                              </>
                            )}

                            {addr?.owner && (
                              <>
                                <dt>Owner:</dt>
                                <dd>
                                  <Link href={`/addr/${addr.owner}`}>
                                    <a className="text-monospace">
                                      {addr.owner}
                                    </a>
                                  </Link>
                                </dd>
                              </>
                            )}

                            {addr?.token_name && (
                              <>
                                <dt>Token name:</dt>
                                <dd>{addr?.token_name}</dd>
                              </>
                            )}

                            {addr?.token_symbol && (
                              <>
                                <dt>Token symbol:</dt>
                                <dd>{addr?.token_symbol}</dd>
                              </>
                            )}

                            {addr?.total_supply && (
                              <>
                                <dt>Total supply:</dt>
                                <dd>
                                  {weiToGO(
                                    addr?.total_supply,
                                    false,
                                    true,
                                    addr?.decimals
                                      ? numberWithCommas(addr?.decimals)
                                      : 0
                                  )}
                                </dd>
                                <dd>{addr?.total_supply}</dd>
                              </>
                            )}

                            {addr?.decimals && (
                              <>
                                <dt>Total supply:</dt>
                                <dd>{addr?.decimals}</dd>
                              </>
                            )}

                            <dt>Total internal transactions:</dt>
                            <dd>
                              {addr?.number_of_internal_transactions || 0}
                            </dd>
                            <dt>Total holders:</dt>
                            <dd>{addr?.number_of_token_holders || 0}</dd>
                          </>
                        )}
                        <dt>Total transactions:</dt>
                        <dd>{addr?.number_of_transactions || 0}</dd>
                        {addr?.erc_types && !!addr?.erc_types.length && (
                          <>
                            <dt>Token type:</dt>
                            <dd>                              {addr.erc_types.map((item: any, index: any) => (
                                <span key={index} className="badge badge-primary mr-1">
                                  {TOKEN_TYPES[item?.type]}
                                </span>
                              ))}
                            </dd>
                          </>
                        )}
                        <dt>Updated at:</dt>
                        <dd>
                          {addr?.updated_at &&
                            moment(addr?.updated_at).format(YY_MM_DD_HH_mm_ss)}
                        </dd>
                      </dl>
                    </div>
                    <div className="col-lg-2 col-md-3">
                      <a
                        href={`https://testnet-explorer.gochain.io/api/address/${addr?.address}/qr`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img
                          className="img-thumbnail"
                          src={`https://testnet-explorer.gochain.io/api/address/${addr?.address}/qr`}
                          alt={addr?.address}
                        />
                      </a>
                    </div>
                  </div>
                </div>

                {addr?.contract &&
                  addr?.ercObj &&
                  (addr?.ercObj["Go721Metadata"] ||
                    addr?.ercObj["Go721Receiver"]) && (
                    <div className="card-footer">
                      {/* <form className="mt-3" (submit)="searchToken()"> */}
                      <form className="mt-3">
                        <div className="form-group">
                          {/* <!--<label for="asset">Asset:</label>--> */}
                          <div className="input-group">
                            <input
                              type="text"
                              className="form-control"
                              id="asset"
                              placeholder="Enter token ID"
                              name="token"
                              //   [(ngModel)]="tokenId"
                            />
                            <div className="input-group-append">
                              <button
                                type="submit"
                                className="btn btn btn-outline-primary"
                              >
                                Search
                              </button>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  )}
              </div>

              <div className="card mt-4 mb-5">
                <div className="card-body">
                  <ControlledTabs tabs={tabs} />
                </div>
              </div>
            </>
          )}
        </div>
      </AppLayout>
    </div>
  );
};

export default Address;
