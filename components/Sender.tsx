import React, { useEffect, useState } from "react";
import { resetProcessingWallet, sendGO } from "@Redux/actions/wallet";
import { useDispatch, useSelector } from "react-redux";

import _ from "lodash";
import { toastInformation } from "@Redux/actions/home";

const Sender = () => {
  const { isProcessing, receipt } = useSelector((state: any) => state.wallet);
  const [account, setAccount] = useState<any | null>({});
  const dispatch = useDispatch();
  const [stateForm, $stateForm] = useState<any | null>({
    to: "",
    amount: "",
    gasLimit: 21000,
  });

  useEffect(() => {
    let acc = JSON.parse(localStorage.getItem("account") || "{}");
    if (acc) setAccount(acc);
  }, []);

  const handleChangeValue = (e: any) => {
    $stateForm({
      ...stateForm,
      [e.target.name]: e.target.value,
    });
  };

  const sendGo = (e: any) => {
    e.preventDefault();
    if (_.isEmpty(stateForm)) {
      dispatch(
        toastInformation({
          show: true,
          content: "Some field is wrong",
          status: "warning",
        })
      );
    }
    dispatch(sendGO({ payload: { ...stateForm, account } }));
    onResetForm();
  };

  const onResetForm = () => {
    $stateForm({
      to: "",
      amount: "",
      gasLimit: "",
    });
  };

  const resetProcessing = () => {
    dispatch(resetProcessingWallet({ receipt: null }));
  };

  return (
    <>
      {isProcessing || !_.isEmpty(receipt) ? (
        <>
          {_.isEmpty(receipt) ? (
            <>
              <div className="processing__icon d-flex justify-content-center">
                <img src="../../../assets/icons/loader.svg" alt="Processing" />
              </div>
              <div className="processing__content mt-4 d-flex justify-content-center">
                Transaction submitted, waiting for receipt...
              </div>
            </>
          ) : (
            <>
              <div className="receipt">
                <div className="receipt__header text-center h4 text-primary mb-4">
                  Transaction complete!
                </div>
                <div className="receipt__content mb-4">
                  <div className="row">
                    <div className="col-md-2">Transaction Hash:</div>
                    <div className="col-md-10">
                      <a
                        href={`/tx/${receipt?.transactionHash}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {receipt?.transactionHash}
                      </a>
                    </div>
                    <div className="col-md-2">Block Hash:</div>
                    <div className="col-md-10">
                      <a
                        href={`/block/${receipt?.blockHash}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {receipt?.blockHash}
                      </a>
                    </div>
                    {receipt?.contractAddress && (
                      <>
                        <div className="col-md-2">Contract Address:</div>
                        <div className="col-md-10">
                          <a
                            href={`/address/${receipt?.contractAddress}`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {receipt?.contractAddress}
                          </a>
                        </div>
                      </>
                    )}
                    <div className="col-md-2">Gas Used:</div>
                    <div className="col-md-10">{receipt?.gasUsed}</div>
                  </div>
                </div>
                <div className="receipt__footer text-right">
                  <button
                    onClick={() => resetProcessing()}
                    className="btn btn-primary"
                  >
                    Go back
                  </button>
                </div>
              </div>
            </>
          )}
        </>
      ) : (
        <>
          <h6 className="mb-4 text-center text-primary">
            Perform a regular transaction, send GO to another account
          </h6>
          <form onSubmit={(e) => sendGo(e)}>
            <div className="form-group row">
              <label htmlFor="to" className="col-sm-2 col-form-label">
                To*:
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  placeholder="To"
                  name="to"
                  value={stateForm.to}
                  onChange={(e) => handleChangeValue(e)}
                  required
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="amount" className="col-sm-2 col-form-label">
                Amount*:
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Amount"
                  name="amount"
                  value={stateForm.amount}
                  onChange={(e) => handleChangeValue(e)}
                  required
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="gasLimit" className="col-sm-2 col-form-label">
                Gas Limit*:
              </label>
              <div className="col-sm-10">
                <input
                  type="number"
                  min="0"
                  className="form-control"
                  placeholder="Gas Limit"
                  name="gasLimit"
                  value={stateForm.gasLimit}
                  onChange={(e) => handleChangeValue(e)}
                  required
                />
              </div>
            </div>
            <div className="form-group text-right">
              <button
                className="btn"
                type="reset"
                onClick={() => onResetForm()}
              >
                Reset
              </button>
              <button
                className="btn btn-primary"
                type="submit"
                disabled={
                  _.isEmpty(stateForm.to) || _.isEmpty(stateForm.amount)
                }
              >
                Send
              </button>
            </div>
          </form>
        </>
      )}
    </>
  );
};

export default Sender;
