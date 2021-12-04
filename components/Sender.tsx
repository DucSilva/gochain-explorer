import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import _ from "lodash";
import { sendGO } from "@Redux/actions/wallet";
import { toastInformation } from "@Redux/actions/home";

const Sender = ({ addr, addrHash }: any) => {
  const { isSubmit } = useSelector((state: any) => state.wallet);
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
    if (
      _.isEmpty(stateForm.to) ||
      _.isEmpty(stateForm.amount) ||
      _.isEmpty(stateForm.gasLimit)
    ) {
      dispatch(
        toastInformation({
          show: true,
          content: "Some field is wrong",
          status: "warning",
        })
      );
    }
    dispatch(sendGO({ payload: { ...stateForm, account } }));
  };

  const onResetForm = () => {
    $stateForm({
      to: "",
      amount: "",
      gasLimit: "",
    });
  };

  return (
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
          <button className="btn" type="reset" onClick={() => onResetForm()}>
            Reset
          </button>
          <button
            className="btn btn-primary"
            type="submit"
            disabled={_.isEmpty(stateForm.to) || _.isEmpty(stateForm.amount)}
          >
            Send
          </button>
        </div>
      </form>
    </>
  );
};

export default Sender;
