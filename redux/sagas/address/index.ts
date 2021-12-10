import * as Effects from "redux-saga/effects";

import {
  GET_ADDRESS_INTERNAL_REQUEST,
  GET_ADDRESS_REQUEST,
  GET_ADDRESS_TRANSACTIONS_REQUEST,
  GET_COMPILER_LIST_REQUEST,
  GET_CONTRACT_REQUEST,
  GET_OWNED_TOKENS_REQUEST,
  GET_RECENT_BLOCK_NUMBER_REQUEST,
  GET_TOKEN_HOLDERS_REQUEST,
  GET_TOKEN_TXS_REQUEST,
  GET_TRANSACTION_TX_REQUEST,
  VERIFY_CONTRACT_REQUEST,
  getAddressFailed,
  getAddressHolderFailed,
  getAddressHolderSuccess,
  getAddressInternalFailed,
  getAddressInternalSuccess,
  getAddressSuccess,
  getAddressTokenTXSFailed,
  getAddressTokenTXSSuccess,
  getAddressTransactionsFailed,
  getAddressTransactionsSuccess,
  getCompilerListFailed,
  getCompilerListSuccess,
  getContractFailed,
  getContractSuccess,
  getOwnedTokensFailed,
  getOwnedTokensSuccess,
  getRecentBlockNumFailed,
  getRecentBlockNumSuccess,
  getTransactionTxFailed,
  getTransactionTxSuccess,
  verifyContractFailed,
  verifyContractSuccess,
} from "@Redux/actions/address";
import { all, put, takeLatest } from "redux-saga/effects";

import { Contract } from "@Models/contract.model";
import { ROUTES } from "@Utils/constants";
import { Transaction } from "@Models/transaction.model";
import _ from "lodash";
import { request } from "@Pages/api/handler";
import { toastInformation } from "@Redux/actions/home";

const call: any = Effects.call;

function* getAddressContract({ payload }: any) {
  const { addrHash } = payload || "";
  try {
    let { data } = yield call(request.getAddress, addrHash);
    if (data.contract) {
      if (data.token_symbol && data.token_name) {
        // this._metaService.setTitle(`${data.token_symbol} - ${data.token_name}`);
      } else {
        // this._metaService.setTitle(META_TITLES.CONTRACT.title);
      }
      data.ercObj = data.erc_types.reduce((acc: any, val: any) => {
        acc[val] = true;
        return acc;
      }, {});
      const { data: _data } = yield call(request.getContract, addrHash);

      yield put(getContractSuccess(_data));
    } else {
      // this._metaService.setTitle(META_TITLES.ADDRESS.title);
    }

    let signers = JSON.parse(localStorage.getItem("signers") || "{}");
    data.signerDetails = signers[data?.address?.toLowerCase()] || null;

    yield put(getAddressSuccess(data));
  } catch (error: any) {
    yield put(
      toastInformation({
        show: true,
        content: _.toString(error?.message),
        status: "danger",
      })
    );
    yield put(getAddressFailed(error));
  }
}

function* getAddressTransactions({ payload }: any) {
  const { addrHash, currentPage, pageSize } = payload || {};
  let _data = {
    limit: pageSize,
    skip: currentPage === 1 ? 0 : (currentPage - 1) * pageSize,
  };

  try {
    if (addrHash?.addrHash) {
      const { data } = yield call(
        request.getAddressTransactions,
        addrHash?.addrHash,
        _data
      );

      yield put(getAddressTransactionsSuccess(data));
    }
  } catch (error: any) {
    yield put(
      toastInformation({
        show: true,
        content: _.toString(error?.message),
        status: "danger",
      })
    );
    yield put(getAddressTransactionsFailed(error));
  }
}

function* getAddressInternal({ payload }: any) {
  const { addrHash, currentPage, pageSize } = payload || {};
  let _data = {
    limit: pageSize,
    skip: currentPage === 1 ? 0 : (currentPage - 1) * pageSize,
  };

  try {
    if (addrHash?.addrHash) {
      if (pageSize && currentPage) {
        const { data } = yield call(
          request.getAddressInternal,
          addrHash?.addrHash,
          _data
        );
        yield put(getAddressInternalSuccess(data));
      } else {
        const { data } = yield call(
          request.getAddressInternal,
          addrHash?.addrHash
        );
        yield put(getAddressInternalSuccess(data));
      }
    }
  } catch (error: any) {
    yield put(
      toastInformation({
        show: true,
        content: _.toString(error?.message),
        status: "danger",
      })
    );
    yield put(getAddressInternalFailed(error));
  }
}

function* getAddressHolders({ payload }: any) {
  const { addrHash, currentPage, pageSize } = payload || {};
  let _data = {
    limit: pageSize,
    skip: currentPage === 1 ? 0 : (currentPage - 1) * pageSize,
  };

  try {
    if (addrHash?.addrHash) {
      const { data } = yield call(
        request.getAddressTokenHolders,
        addrHash?.addrHash,
        _data
      );

      yield put(getAddressHolderSuccess(data));
    }
  } catch (error: any) {
    yield put(
      toastInformation({
        show: true,
        content: _.toString(error?.message),
        status: "danger",
      })
    );
    yield put(getAddressHolderFailed(error));
  }
}

function* getAddressTokenTXS({ payload }: any) {
  const { addrHash, currentPage, pageSize } = payload || {};
  let _data = {
    limit: pageSize,
    skip: currentPage === 1 ? 0 : (currentPage - 1) * pageSize,
    token_transactions: true,
  };

  try {
    if (addrHash?.addrHash) {
      const { data } = yield call(
        request.getAddressInternal,
        addrHash?.addrHash,
        _data
      );

      yield put(getAddressTokenTXSSuccess(data));
    }
  } catch (error: any) {
    yield put(
      toastInformation({
        show: true,
        content: _.toString(error?.message),
        status: "danger",
      })
    );
    yield put(getAddressTokenTXSFailed(error));
  }
}

function* getOwnedTokens({ payload }: any) {
  const { addrHash, currentPage, pageSize } = payload || {};
  let _data = {
    limit: pageSize,
    skip: currentPage === 1 ? 0 : (currentPage - 1) * pageSize,
  };

  try {
    if (addrHash) {
      if (currentPage && pageSize) {
        const { data } = yield call(request.getOwnedTokens, addrHash, _data);
        yield put(getOwnedTokensSuccess(data));
      } else {
        const { data } = yield call(request.getOwnedTokens, addrHash);
        yield put(getOwnedTokensSuccess(data));
      }
    }
  } catch (error: any) {
    yield put(
      toastInformation({
        show: true,
        content: _.toString(error?.message),
        status: "danger",
      })
    );
    yield put(getOwnedTokensFailed(error));
  }
}

function* getContracts({ payload }: any) {
  const { addrHash } = payload || {};

  try {
    if (addrHash) {
      const { data } = yield call(request.getContract, addrHash);

      yield put(getContractSuccess(data));
    }
  } catch (error: any) {
    yield put(
      toastInformation({
        show: true,
        content: _.toString(error?.message),
        status: "danger",
      })
    );
    yield put(getContractFailed(error));
  }
}

function* getTransactionTx({ payload }: any): any {
  const { addrHash, nonceId = "" } = payload || {};

  try {
    if (addrHash) {
      let res: any = yield call(request.getTransaction, addrHash, nonceId);

      if (res?.data) {
        let tx: Transaction | null = res?.data;
        if (!tx) {
          let _data: any = yield call(request.getTxData, addrHash);
          yield put(getTransactionTxSuccess(_data));
        }
        tx.input_data = "0x" + tx.input_data;
        tx.parsedLogs = JSON.parse(tx.logs);
        tx.prettifiedLogs = JSON.stringify(tx.parsedLogs, null, "\t");
        let data: any = yield call(request.processTransaction, tx);

        yield put(getTransactionTxSuccess(data));
      }
    }
  } catch (error: any) {
    yield put(
      toastInformation({
        show: true,
        content: _.toString(error?.message),
        status: "danger",
      })
    );
    yield put(getTransactionTxFailed(error));
  }
}

function* getBlockNumber({ payload }: any): any {
  try {
    let data: any = yield call(request.getBlockNumber);
    yield put(getRecentBlockNumSuccess(data));
  } catch (error: any) {
    yield put(
      toastInformation({
        show: true,
        content: _.toString(error?.message),
        status: "danger",
      })
    );
    yield put(getRecentBlockNumFailed(error));
  }
}

function* getCompilerLists({ payload }: any): any {
  try {
    let data: any = yield call(request.getCompilersList);
    yield put(getCompilerListSuccess(data));
  } catch (error: any) {
    yield put(
      toastInformation({
        show: true,
        content: _.toString(error?.message),
        status: "danger",
      })
    );
    yield put(getCompilerListFailed(error));
  }
}

function* verifyContractAddress({ payload }: any): any {
  const { dataSend, router } = payload;
  try {
    let contract: Contract = yield call(request.compile, dataSend);
    if (contract?.valid) {
      yield put(
        toastInformation({
          show: true,
          content: "Contract has been successfully verified",
          status: "success",
        })
      );
      if (router) {
        router.push(`/${ROUTES.ADDRESS}/${contract?.address}`);
      }
    }
    yield put(verifyContractSuccess(contract));
  } catch (error: any) {
    yield put(
      toastInformation({
        show: true,
        content: _.toString(error?.message),
        status: "danger",
      })
    );
    yield put(verifyContractFailed(error));
  }
}

export function* addressSaga() {
  yield all([
    takeLatest(GET_ADDRESS_REQUEST, getAddressContract),
    takeLatest(GET_ADDRESS_TRANSACTIONS_REQUEST, getAddressTransactions),
    takeLatest(GET_ADDRESS_INTERNAL_REQUEST, getAddressInternal),
    takeLatest(GET_TOKEN_HOLDERS_REQUEST, getAddressHolders),
    takeLatest(GET_TOKEN_TXS_REQUEST, getAddressTokenTXS),
    takeLatest(GET_OWNED_TOKENS_REQUEST, getOwnedTokens),
    takeLatest(GET_CONTRACT_REQUEST, getContracts),
    takeLatest(GET_TRANSACTION_TX_REQUEST, getTransactionTx),
    takeLatest(GET_RECENT_BLOCK_NUMBER_REQUEST, getBlockNumber),
    takeLatest(GET_COMPILER_LIST_REQUEST, getCompilerLists),
    takeLatest(VERIFY_CONTRACT_REQUEST, verifyContractAddress),
  ]);
}
