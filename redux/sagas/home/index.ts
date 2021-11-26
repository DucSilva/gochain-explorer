import {
  GET_BLOCK_REQUEST,
  GET_STATS_REQUEST,
  GET_SUPPLY_STATS_REQUEST,
  getBlockFailed,
  getBlockSuccess,
  getStatsSuccess,
  getSupplyStatsFailed,
  getSupplyStatsSuccess,
} from "@Redux/actions/home";
import { all, call, delay, put, takeLatest } from "redux-saga/effects";

import { request } from "@Pages/api/handler";

function* getSupplyStats(payload: any) {
  try {
    const { data } = yield call(request.getSupplyStats);
    yield put(getSupplyStatsSuccess(data));
  } catch (error) {
    yield put(getSupplyStatsFailed(error));
  }
}

function* getStats(payload: any) {
  try {
    const { data } = yield call(request.getStats);
    yield put(getStatsSuccess(data));
  } catch (error) {
    yield put(getSupplyStatsFailed(error));
  }
}

function* getRecentBlock(payload: any) {
  try {
    // yield delay(5000);
    const { data } = yield call(request.getRecentBlocks);
    yield put(getBlockSuccess(data));
  } catch (error) {
    yield put(getBlockFailed(error));
  }
}

export function* homeSaga() {
  yield all([
    takeLatest(GET_SUPPLY_STATS_REQUEST, getSupplyStats),
    takeLatest(GET_STATS_REQUEST, getStats),
    takeLatest(GET_BLOCK_REQUEST, getRecentBlock),
  ]);
}
