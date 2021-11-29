import { useDispatch, useSelector } from "react-redux";

import Link from "next/link";
import React from "react";
import { YY_MM_DD_HH_mm_ss } from "@Utils/constants";
import { getAddressInternal } from "@Redux/actions/address/index";
import moment from "moment";

const ContractSource = (addrHash: any) => {
  const { contract, addr } = useSelector((state) => state?.address) || [];
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (addrHash) {
      dispatch(getAddressInternal({ addrHash }));
    }
  }, []);

  return (
    <>
      {!contract?.valid ? (
        <div className="text-center">
          <img src="../../../assets/icons/alert-circle.svg" alt="Alert" />
          <p>Contract Source Code Unverified</p>
          <Link href={`/verify/${addr?.address}`}>
            <a className="btn btn-primary text-uppercase">
              Verify And Publish Source Code
            </a>
          </Link>
        </div>
      ) : (
        <>
          <h5 className="uk-margin uk-margin-top">
            Contract Source Code Verified
          </h5>
          <h5 className="uk-margin uk-margin-large-top">
            <i className="fas fa-code"></i> Contract Source Code
          </h5>
          <p>Contract Name: {contract?.contract_name}</p>
          <p>Compiler Version: {contract?.compiler_version}</p>
          <p>EVM Version: {contract?.evm_version}</p>
          <p>Optimization: {contract?.optimization}</p>
          <p>
            Verified:
            {moment(contract?.updated_at).format(YY_MM_DD_HH_mm_ss)} (
            {moment(contract?.updated_at).fromNow()})
          </p>
          <pre className="code">{contract?.source_code}</pre>
        </>
      )}
      <p>Contract Bytecode</p>
      <pre className="code">{contract?.byte_code}</pre>
    </>
  );
};

export default ContractSource;
