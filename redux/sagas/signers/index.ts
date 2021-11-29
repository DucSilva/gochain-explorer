import {
  GET_SIGNER_LIST_REQUEST,
  getSignerListFailed,
  getSignerListSuccess,
} from "@Redux/actions/signers";
import { all, call, delay, put, takeLatest } from "redux-saga/effects";

import { request } from "@Pages/api/handler";

function* getSignerLists(payload: any) {
  try {
    const { data } = yield call(request.getSupplyStats);
    yield put(getSignerListSuccess(data));
  } catch (error) {
    yield put(getSignerListFailed(error));
  }
}

export function* signerSaga() {
  yield all([takeLatest(GET_SIGNER_LIST_REQUEST, getSignerLists)]);
}
