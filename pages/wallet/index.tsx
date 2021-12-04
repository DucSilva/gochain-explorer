import { useDispatch, useSelector } from "react-redux";

import AppLayout from "@Components/Layout/AppLayout";
import Head from "next/head";
import InputFieldForm from "@Components/Partials/InputField";
import Link from "next/link";
import type { NextPage } from "next";
import React from "react";
import { openWallet } from "@Redux/actions/wallet";
import styles from "@Styles/Home.module.css";
import { useRouter } from "next/router";

const Wallet: NextPage = () => {
  const [privateKey, $privateKey] = React.useState("");
  const router = useRouter();
  const dispatch = useDispatch();
  const { isProcessing } = useSelector((state: any) => state.wallet) || {};

  const onPrivateKeySubmit = (e: any) => {
    e.preventDefault();

    if (privateKey) {
      dispatch(openWallet({ privateKey, router }));
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Wallet - GoChain Explorer</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppLayout>
        <div className="container">
          <div className="card f-h">
            <div className="card-body">
              <div className="row justify-content-center h-100 mt-5">
                <div className="col-md-6">
                  <h4 className="text-center text-primary text-uppercase w-max-content">
                    Please enter your private key to proceed
                  </h4>
                  <form
                    className="mt-4"
                    onSubmit={(e) => onPrivateKeySubmit(e)}
                  >
                    <InputFieldForm
                      placeholder="Private Key"
                      name="privateKey"
                      isProcessing={isProcessing}
                      className=""
                      value={privateKey}
                      handleChangeValue={(e: any) =>
                        $privateKey(e.target.value)
                      }
                    />
                    <button
                      type="submit"
                      className="btn btn-primary btn-block mt-4"
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <>
                          OPENING{" "}
                          <img src="/assets/icons/loader.svg" alt="Opening" />
                        </>
                      ) : (
                        <>OPEN WALLET</>
                      )}
                    </button>
                  </form>
                  <div className="row mt-4">
                    <div className="col-12">
                      <button
                        type="button"
                        className="btn btn-outline-primary btn-block"
                        disabled={isProcessing}
                      >
                        <Link href="/wallet/create">
                          <a>Create Account</a>
                        </Link>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AppLayout>
    </div>
  );
};

export default Wallet;
