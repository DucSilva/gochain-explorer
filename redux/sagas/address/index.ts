import * as Effects from "redux-saga/effects";

import {
  GET_ADDRESS_INTERNAL_REQUEST,
  GET_ADDRESS_REQUEST,
  GET_ADDRESS_TRANSACTIONS_REQUEST,
  getAddressFailed,
  getAddressInternalFailed,
  getAddressInternalSuccess,
  getAddressSuccess,
  getAddressTransactionsFailed,
  getAddressTransactionsSuccess,
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
  console.log('payload', payload)
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

export function* addressSaga() {
  yield all([
    takeLatest(GET_ADDRESS_REQUEST, getAddressContract),
    takeLatest(GET_ADDRESS_TRANSACTIONS_REQUEST, getAddressTransactions),
    takeLatest(GET_ADDRESS_INTERNAL_REQUEST, getAddressInternal),
  ]);
}
