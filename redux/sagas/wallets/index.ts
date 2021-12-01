import {
  OPEN_WALLET_REQUEST,
  openWalletFailed,
  openWalletSuccess,
  setAccountBalance,
} from "@Redux/actions/wallet";
import { all, call, put, takeLatest } from "redux-saga/effects";

import { request } from "@Pages/api/handler";
import { toastInformation } from "@Redux/actions/home";

function* openWallets({ payload }: any): any {
  try {
    let { privateKey, router } = payload;
    if (privateKey.length === 64 && privateKey.indexOf("0x") !== 0) {
      privateKey = "0x" + privateKey;
    }
    if (privateKey.length === 66) {
      let account = yield call(request.getAccountWallet, privateKey);

      if (account?.address) {
        let accountBalance = yield call(request.getBalance, account?.address);
        if (accountBalance) {
          yield put(setAccountBalance(accountBalance));

          yield put(
            toastInformation({
              show: true,
              content: "Updated balance.",
              status: "info",
            })
          );

          router.push("/wallet/account");
        }
        yield put(openWalletSuccess(account));
      }
    } else {
      yield put(
        toastInformation({
          show: true,
          content: "Given private key is not valid",
          status: "danger",
        })
      );
      yield put(openWalletFailed(privateKey));
    }
  } catch (error) {
    yield put(openWalletFailed(error));
    yield put(
      toastInformation({
        show: true,
        content: error,
        status: "danger",
      })
    );
  }
}

export function* walletSaga() {
  yield all([takeLatest(OPEN_WALLET_REQUEST, openWallets)]);
}
