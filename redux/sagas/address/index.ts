import * as Effects from "redux-saga/effects";

import {
  GET_ADDRESS_INTERNAL_REQUEST,
  GET_ADDRESS_REQUEST,
  GET_ADDRESS_TRANSACTIONS_REQUEST,
  GET_CONTRACT_REQUEST,
  GET_OWNED_TOKENS_REQUEST,
  GET_TOKEN_HOLDERS_REQUEST,
  GET_TOKEN_TXS_REQUEST,
  GET_TRANSACTION_TX_REQUEST,
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
  getContractFailed,
  getContractSuccess,
  getOwnedTokensFailed,
  getOwnedTokensSuccess,
  getTransactionTxFailed,
  getTransactionTxSuccess,
  GET_RECENT_BLOCK_NUMBER_REQUEST,
  getRecentBlockNumSuccess,
  getRecentBlockNumFailed,
} from "@Redux/actions/address";
import {
  ProcessedABIData,
  ProcessedABIItem,
  ProcessedLog,
  Transaction,
  TxLog,
} from "@Models/transaction.model";
import { all, put, takeLatest } from "redux-saga/effects";

import { request } from "@Pages/api/handler";

const call: any = Effects.call;

function* getAddressContract({ payload }: any) {
  const { addrHash } = payload || "";
  try {
    let { data } = yield call(request.getAddress, addrHash);

    let signers = JSON.parse(localStorage.getItem("signers") || "{}");
    data.signerDetails = signers[data?.address?.toLowerCase()] || null;

    yield put(getAddressSuccess(data));
  } catch (error) {
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
  } catch (error) {
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
      const { data } = yield call(
        request.getAddressInternal,
        addrHash?.addrHash,
        _data
      );

      yield put(getAddressInternalSuccess(data));
    }
  } catch (error) {
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
  } catch (error) {
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
  } catch (error) {
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
  } catch (error) {
    yield put(getOwnedTokensFailed(error));
  }
}

function* getContracts({ payload }: any) {
  const { addrHash } = payload || {};

  try {
    if (addrHash?.addrHash) {
      const { data } = yield call(request.getOwnedTokens, addrHash?.addrHash);

      yield put(getContractSuccess(data));
    }
  } catch (error) {
    yield put(getContractFailed(error));
  }
}

function* getTransactionTx({ payload }: any) {
  const { addrHash, nonceId = "" } = payload || {};

  try {
    if (addrHash) {
      let res: any = yield call(request.getTransaction, addrHash, nonceId);

      if (res?.data) {
        let tx: Transaction | null = res?.data;
        if (!tx) {
        }
        tx.input_data = "0x" + tx.input_data;
        tx.parsedLogs = JSON.parse(tx.logs);
        tx.prettifiedLogs = JSON.stringify(tx.parsedLogs, null, "\t");

        yield put(getTransactionTxSuccess(tx));
      }
    }
  } catch (error) {
    yield put(getTransactionTxFailed(error));
  }
}

function* getBlockNumber({ payload }: any) {
  try {
    let data: any  = yield call(request.getBlockNumber);
    yield put(getRecentBlockNumSuccess(data));
  } catch (error) {
    yield put(getRecentBlockNumFailed(error));
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
  ]);
}
