import { AbiItem, toWei } from "web3-utils";
import {
  getAbiMethods,
  getDecodedData,
  makeContractAbi,
  makeContractBadges,
} from "@Utils/functions";
import { useDispatch, useSelector } from "react-redux";

import { Address } from "@Models/address.model";
import { Badge } from "@Models/badge.model";
import { Contract } from "@Models/contract.model";
import { ContractAbi } from "@Utils/types";
import { ERC_INTERFACE_IDENTIFIERS } from "@Utils/constants";
import { ErcName } from "@Utils/enums";
import React from "react";
import _ from "lodash";
import { abiMethod } from "@Utils/functions";
import { getAbiFunction } from "@Redux/actions/address";

const abiTemplates = [
  ErcName.Go20,
  ErcName.Go721,
  ErcName.Go165,
  ErcName.Upgradeable,
  ErcName.AllFunctions,
];

let contractBadges: Badge[] = [];

const Interactor = ({ addrHash }: any) => {
  const dispatch = useDispatch();
  const { contract, addr, abi } =
  useSelector((state: any) => state.address) || {};
  console.log('contract', contract)
  let functionResult = "";

  const [hasData, $hasData] = React.useState(true);
  const [erc, setErc] = React.useState("");
  const [contractAddress, $contractAddress] = React.useState("");
  const [contractABI, $contractABI] = React.useState("");
  console.log("contractABI", contractABI);

  const changeAbiTemplate = (event: any): any => {
    setErc(event.target.value);
    console.log("event.target.value", event.target.value);
    // this._commonService.abi$.subscribe((abi: ContractAbi) => {
    const ABI: AbiItem[] = makeContractAbi(
      ERC_INTERFACE_IDENTIFIERS[event.target.value],
      abi
    );
    $contractABI(JSON.stringify(ABI, null, 2));
  };

  const handleSubmitForm = (e: any) => {
    e.preventDefault();
  };

  const selectedFunction:any = () => {};

  const handleContractData = (address: Address, contract: Contract) => {
    console.log("address", address);
    // this.addr = address;
    contractBadges = makeContractBadges(address, contract);
    console.log("contractBadges", contractBadges);

    if (contract?.abi && contract?.abi?.length) {
      console.log("contract?.abi", contract?.abi);
      $contractABI(JSON.stringify(contract?.abi, null, 2));
    } else if (address?.interfaces && address?.interfaces?.length) {
      console.log("contract?.abi", address?.interfaces);
      // this._commonService.abi$.subscribe((abiDefinitions: ContractAbi) => {
      //   const abi: AbiItem[] = address.interfaces.reduce((acc, abiName) => {
      //     if (abiDefinitions[abiName]) {
      //       acc.push(abiDefinitions[abiName]);
      //     }
      //     return acc;
      //   }, []);
      //   this.form.patchValue(
      //     {
      //       contractABI: JSON.stringify(abi, null, 2),
      //     },
      //     {
      //       emitEvent: true,
      //     }
      //   );
      // });
    }
  };

  React.useEffect(() => {
    if (!_.isEmpty(addr)) {
      $contractAddress(addr?.address);
    }
  }, [addr]);

  React.useEffect(() => {
    handleContractData(addr, contract);
  }, [addr, contract]);

  React.useEffect(() => {
    dispatch(getAbiFunction({}));
  }, []);

  return (
    <>
      {!hasData && (
        <h6 className="mb-4 text-center text-primary">
          Interact with a Smart Contract on GoChain
        </h6>
      )}
      <form onSubmit={(e) => handleSubmitForm(e)}>
        {!hasData && (
          <div className="form-group row">
            <label htmlFor="contract-address" className="col-md-2">
              Contract Address*:
            </label>
            <div className="col-md-10">
              <input
                type="text"
                className="form-control"
                id="contract-address"
                placeholder="Contract Address"
                name="contractAddress"
                value={contractAddress}
                onChange={(e) => $contractAddress(e.target.value)}
                required
              />
              {contractBadges.map((badge: any, index) => (
                <span key={index} className={`badge badge-${badge?.type} mr-1`}>
                  {badge?.text}
                </span>
              ))}
            </div>
          </div>
        )}
        <div className="form-group row">
          <label htmlFor="abi-json" className="col-md-2">
            ABI / JSON Interface:
          </label>
          <div className="col-md-10">
            <textarea
              className="form-control"
              id="abi-json"
              placeholder="ABI / JSON Interface"
              name="contractABI"
              value={contractABI}
              rows={5}
              required
            ></textarea>
            <div className="mt-1">
              or select template:{" "}
              <select
                name="erc"
                onChange={(value) => changeAbiTemplate(value)}
                className="border-1"
                value={erc}
              >
                <option disabled className="d-none"></option>
                {abiTemplates.map((value, index) => (
                  <option key={index} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        {/* <ng-container *ngIf="contract != null"> */}
        {contract != null && (
          <>
            <div className="form-group row">
              <label htmlFor="contract-function" className="col-md-2">
                Choose Contract Function:
              </label>
              <div className="col-md-10">
                <select
                  className="form-control"
                  id="contract-function"
                  name="contractFunction"
                >
                  <optgroup label="Free">
                    {/* <ng-container *ngFor="let abiItem of abiFunctions; let i = index;"> */}
                    <option
                    // *ngIf="!abiItem.payable && abiItem.constant"
                    // [value]="i"
                    >
                      {/* {{abiItem | abiMethod}} */}
                    </option>
                    {/* </ng-container> */}
                  </optgroup>
                  <optgroup
                    label="Paid (wallet required)"
                    // [disabled]="!_walletService.account"
                  >
                    {/* <ng-container *ngFor="let abiItem of abiFunctions; let i = index;"> */}
                    <option
                    // *ngIf="abiItem.payable || !abiItem.constant"
                    // [value]="i"
                    >
                      {/* {{abiItem | abiMethod}} */}
                    </option>
                    {/* </ng-container> */}
                  </optgroup>
                </select>
              </div>
            </div>
            {/* <ng-container *ngIf="selectedFunction"> */}
            {selectedFunction && (
              <>
                {/* <ng-container
          formArrayName="functionParameters"
          *ngFor="let functionInput of selectedFunction.inputs; let i=index"
      > */}
                <div className="form-group row">
                  <div className="col-md-2"></div>
                  <div className="col-md-10">
                    {/* <ng-container
                     *ngIf="selectedFunction.name === 'transfer' && functionInput.name === 'value' && addr.token_symbol; else regularFunctionInput"> */}
                    <input
                      type="number"
                      min="0"
                      className="form-control"
                      placeholder="Amount ({{addr.token_symbol}})"
                      //  (keyup)="onTokenValueChange($event, i)"
                    />
                    <input
                      disabled
                      className="form-control"
                      placeholder="Raw amount"
                      name="{{i}}"
                    />
                    {/* </ng-container> */}
                    {/* <ng-template #regularFunctionInput> */}
                    <input
                      className="form-control"
                      placeholder="{{functionInput.name}}"
                      name="{{i}}"
                    />
                    {/* </ng-template> */}
                  </div>
                </div>
                {/* </ng-container> */}
                {/* <div *ngIf="selectedFunction.payable" className="form-group row"> */}
                {selectedFunction?.payable && (
                  <div className="form-group row">
                    <div className="col-md-2"></div>
                    <div className="col-md-10">
                      <input
                        className="form-control"
                        placeholder="Amount"
                        name="contractAmount"
                      />
                    </div>
                  </div>
                )}
                {/* <div *ngIf="!selectedFunction.constant || selectedFunction.payable" className="form-group row"> */}
                {(!selectedFunction?.constant || selectedFunction?.payable) && (
                  <div className="form-group row">
                    <label className="col-md-2" htmlFor="gasLimit">
                      Gas Limit*:
                    </label>
                    <div className="col-md-10">
                      <input
                        className="form-control"
                        id="gasLimit"
                        placeholder="Gas Limit"
                        name="gasLimit"
                        type="number"
                        min="0"
                      />
                    </div>
                  </div>
                )}
              </>
            )}
            {/* </ng-container> */}
          </>
        )}
        {/* </ng-container> */}
        {/* <div *ngIf="functionResult"> */}
        {functionResult && (
          <div>
            <h4>Response</h4>
            {/* <div *ngIf="functionResult.error"> */}
            <div>{/* {{functionResult.error}} */}</div>
            {/* <div *ngFor="let k of functionResult.output"> */}
            <div>
              {/* {{k[0]}}: <span style="font-weight: bold;">{{k[1]}}</span> */}
            </div>
          </div>
        )}
        <div className="form-group text-right">
          <button className="btn btn-outline-primary mr-1" type="reset">
            Reset
          </button>
          <button
            className="btn btn-primary"
            type="submit"
            // [disabled]="!form.valid"
            // (click)="useContract()"
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default Interactor;
