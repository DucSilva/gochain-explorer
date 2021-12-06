import { AbiItem, fromWei, isAddress, toWei } from "web3-utils";
import { Account, TransactionConfig, TransactionReceipt } from "web3-core";
import {
  CREATE_ACCOUNT_REQUEST,
  GET_WALLET_ADDR_REQUEST,
  OPEN_WALLET_REQUEST,
  SEND_GO_REQUEST,
  createAccountFailed,
  createAccountSuccess,
  getWalletAddrFailed,
  getWalletAddrSuccess,
  openWalletFailed,
  openWalletSuccess,
  sendGOFailed,
  sendGOSuccess,
  setAccountBalance,
} from "@Redux/actions/wallet";
import { all, call, delay, put, takeLatest } from "redux-saga/effects";

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
      localStorage.setItem("account", JSON.stringify(account));
      localStorage.setItem("privateKey", JSON.stringify(privateKey));

      if (account?.address) {
        let accountBalance = yield call(request.getBalance, account?.address);
        fromWei(accountBalance, "ether").toString();
        if (accountBalance) {
          yield put(setAccountBalance(accountBalance));

          yield put(
            toastInformation({
              show: true,
              content: "Updated balance.",
              status: "info",
            })
          );

          if (router) {
            router.push({
              pathname: "/wallet/account",
              query: { addrHash: account?.address },
            });
          }
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
    localStorage.setItem("account", JSON.stringify(account));

    yield put(createAccountSuccess(account));
  } catch (error) {
    yield put(createAccountFailed(error));
  }
}

function* sendGORequest({ payload }: any) {
  let { to, amount: value, gasLimit: gas, account } = payload?.payload;
  try {
    if (to.length !== 42 || !isAddress(to)) {
      yield put(
        toastInformation({
          show: true,
          content: "ERROR: Invalid TO address.",
          status: "danger",
        })
      );
      return;
    }

    try {
      value = toWei(value, "ether");

      const tx: TransactionConfig = {
        to,
        value,
        gas,
      };
      yield delay(10000);
      let receipt: TransactionReceipt = yield call(request.sendTx, tx, account);
      // console.log("receipt", receipt);
      // yield put(sendGOSuccess(account));
    } catch (e) {
      console.log("e", e);
      toastInformation({
        show: true,
        content: e,
        status: "danger",
      });
      return;
    }
  } catch (error) {
    yield put(sendGOFailed(error));
  }
}

export function* walletSaga() {
  yield all([
    takeLatest(OPEN_WALLET_REQUEST, openWallets),
    takeLatest(GET_WALLET_ADDR_REQUEST, getWalletAddress),
    takeLatest(CREATE_ACCOUNT_REQUEST, createAccountRequest),
    takeLatest(SEND_GO_REQUEST, sendGORequest),
  ]);
}
