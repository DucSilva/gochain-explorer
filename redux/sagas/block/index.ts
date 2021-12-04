import * as Effects from "redux-saga/effects";

import {
  GET_BLOCK_TRANSACTION_REQUEST,
  getBlockTransactionsFailed,
  getBlockTransactionsSuccess
} from "@Redux/actions/block";
import { all, put, takeLatest } from "redux-saga/effects";

import { request } from "@Pages/api/handler";

const call: any = Effects.call;

function* getBlockTransaction({ payload }: any) {
  const { addrHash, currentPage, pageSize } = payload || {};
  let _data = {
    limit: pageSize,
    skip: currentPage === 1 ? 0 : (currentPage - 1) * pageSize,
  };

  try {
    if (addrHash) {
      if (currentPage && pageSize) {
        const { data } = yield call(
          request.getBlockTransactions,
          addrHash,
          _data
          );
        yield put(getBlockTransactionsSuccess(data));
      } else {
        const { data } = yield call(request.getBlockTransactions, addrHash);
        yield put(getBlockTransactionsSuccess(data));
      }
    }
  } catch (error) {
    yield put(getBlockTransactionsFailed(error));
  }
}


export function* blockSaga() {
  yield all([
    takeLatest(GET_BLOCK_TRANSACTION_REQUEST, getBlockTransaction),
  ]);
}
