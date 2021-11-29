import * as Effects from "redux-saga/effects";

import {
  GET_ADDRESS_INTERNAL_REQUEST,
  GET_ADDRESS_REQUEST,
  GET_ADDRESS_TRANSACTIONS_REQUEST,
  GET_OWNED_TOKENS_REQUEST,
  GET_TOKEN_HOLDERS_REQUEST,
  GET_TOKEN_TXS_REQUEST,
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
  getOwnedTokensFailed,
  getOwnedTokensSuccess,
} from "@Redux/actions/address";
import { all, put, takeLatest } from "redux-saga/effects";

import { request } from "@Pages/api/handler";

const call: any = Effects.call;

function* getAddressContract({ payload }: any) {
  const { addrHash } = payload || "";
  try {
    const { data } = yield call(request.getAddress, addrHash);
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
    if (addrHash?.addrHash) {
      const { data } = yield call(
        request.getOwnedTokens,
        addrHash?.addrHash,
        _data
      );

      yield put(getOwnedTokensSuccess(data));
    }
  } catch (error) {
    yield put(getOwnedTokensFailed(error));
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
  ]);
}
