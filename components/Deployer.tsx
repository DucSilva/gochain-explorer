import React, { useState } from "react";

import _ from 'lodash'

const Deployer = ({ addr, addrHash }: any) => {
  const [stateForm, $stateForm] = useState<any | null>({
    byteCode: "",
    gasLimit: 0,
  });S

  const handleChangeValue = (e: any) => {
    $stateForm({
      ...stateForm,
      [e.target.name]: e.target.value,
    });
  };

  const onResetForm = () => {
    $stateForm({
      byCode: "",
      gasLimit: "",
    });
  };

  const deployContract = (e: any) => {
    e.preventDefault();
    console.log(e)
  };

  return (
    <>
      <h6 className="mb-4 text-center text-primary">
        Deploy a Smart Contract to GoChain
      </h6>
      <form onSubmit={(e) => deployContract(e)}>
        <div className="form-group row">
          <label htmlFor="bytecode" className="col-sm-2 col-form-label">
            Bytecode*:
          </label>
          <div className="col-sm-10">
            <textarea
              className="form-control"
              id="bytecode"
              placeholder="Bytecode"
              name="byteCode"
              value={stateForm.byteCode}
              onChange={(e) => handleChangeValue(e)}
              rows={5}
              required
            ></textarea>
            <p>Must start with 0x!</p>
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
              id="gasLimit"
              placeholder="Gas Limit"
              name="gasLimit"
              onChange={(e) => handleChangeValue(e)}
              value={stateForm?.gasLimit}
              required
            />
          </div>
        </div>
        <div className="form-group text-right">
          <button
            className="btn btn-outline-primary mr-1"
            type="reset"
            onClick={() => onResetForm()}
          >
            Reset
          </button>
          <button
            className="btn btn-primary"
            type="submit"
            disabled={
              _.isEmpty(stateForm.byteCode) || _.isEmpty(stateForm.gasLimit)
            }
          >
            Deploy
          </button>
        </div>
      </form>
    </>
  );
};

export default Deployer;
