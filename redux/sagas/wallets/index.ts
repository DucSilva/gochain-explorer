import {
  CREATE_ACCOUNT_REQUEST,
  GET_WALLET_ADDR_REQUEST,
  OPEN_WALLET_REQUEST,
  createAccountFailed,
  createAccountSuccess,
  getWalletAddrFailed,
  getWalletAddrSuccess,
  openWalletFailed,
  openWalletSuccess,
  setAccountBalance,
} from "@Redux/actions/wallet";
import { all, call, put, takeLatest } from "redux-saga/effects";

import { Account } from "web3-core";
import { Accounts } from "web3-eth-accounts";
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

          router.push({
            pathname: "/wallet/account",
            query: { addrHash: account?.address },
          });
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

function* getWalletAddress({ payload }: any) {
  const { addrHash } = payload || "";
  try {
    let { data } = yield call(request.getAddress, addrHash);
    let signers = JSON.parse(localStorage.getItem("signers") || "{}");
    data.signerDetails = signers[data?.address?.toLowerCase()] || null;

    yield put(getWalletAddrSuccess(data));
  } catch (error) {
    yield put(getWalletAddrFailed(error));
  }
}

function* createAccountRequest({ payload }: any) {
  try {
    let account: Account = yield call(request.createAccount);

    yield put(createAccountSuccess(account));
  } catch (error) {
    yield put(createAccountFailed(error));
  }
}

export function* walletSaga() {
  yield all([
    takeLatest(OPEN_WALLET_REQUEST, openWallets),
    takeLatest(GET_WALLET_ADDR_REQUEST, getWalletAddress),
    takeLatest(CREATE_ACCOUNT_REQUEST, createAccountRequest),
  ]);
}
