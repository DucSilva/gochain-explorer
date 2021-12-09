import {
  GET_SIGNER_LIST_REQUEST,
  GET_SIGNER_STATS_REQUEST,
  getSignerListFailed,
  getSignerListSuccess,
  getSignerStatsFailed,
  getSignerStatsSuccess,
} from "@Redux/actions/signers";
import { SignerData, SignerStat } from "@Models/signer-stats";
import { all, call, delay, put, takeLatest } from "redux-saga/effects";

import { ChartItem } from "@Models/chart";
import { request } from "@Pages/api/handler";
import { sortObjArrByKey } from "@Utils/functions";
import { toastInformation } from "@Redux/actions/home";

function* getSignerLists(payload: any) {
  try {
    const { data } = yield call(request.getSupplyStats);
    yield put(getSignerListSuccess(data));
  } catch (error) {
    yield put(getSignerListFailed(error));
  }
}

function formChartData(items: SignerData[]): ChartItem[] {  
  return items.map((item: SignerData, index: number) => ({
    name: item.data && item.data.name ? item.data.name : item.signer_address,
    value: item.blocks_count,
    extra: {
      itemIndex: index,
    },
  }));
}

function* getSignerStats(payload: any) {
  let signers = JSON.parse(localStorage.getItem("signers") || "{}");
  try {
    const { data } = yield call(request.getSignerStats);

    if (data && data.length > 0) {
      data.forEach((stat: SignerStat) => {
        stat.totalBlocks = 0;
        stat.chartData = [];
        if (!stat.signer_stats) {
          // _toastrService.danger(`no data found for ${stat.range}`);
          return;
        }
        stat?.signer_stats.forEach((signer: SignerData) => {
          signer.data = signers[signer?.signer_address];
        });

        stat?.signer_stats.forEach((signer: SignerData) => {
          stat.totalBlocks += signer?.blocks_count;
          stat.chartData = formChartData(stat?.signer_stats || []);
        });
        stat?.signer_stats.forEach((signer: SignerData) => {
          signer.percent = (
            (signer?.blocks_count / stat?.totalBlocks) *
            100
          ).toFixed(4);
        });

        // default sorting by block count
        sortObjArrByKey(stat?.signer_stats, "blocks_count");
      });
      yield put(getSignerStatsSuccess(data));
    }
  } catch (error) {
    yield put(getSignerStatsFailed(error));
  }
}

export function* signerSaga() {
  yield all([
    takeLatest(GET_SIGNER_STATS_REQUEST, getSignerStats),
    takeLatest(GET_SIGNER_LIST_REQUEST, getSignerLists),
  ]);
}
