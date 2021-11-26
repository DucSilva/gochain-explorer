import { addressSaga } from "@Redux/sagas/address";
import { all } from "redux-saga/effects";
import { homeSaga } from "@Redux/sagas/home";
import { walletSaga } from "@Redux/sagas/wallets";

export default function* rootSaga() {
  yield all([walletSaga(), homeSaga(), addressSaga()]);
}
