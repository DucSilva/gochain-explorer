import { addressSaga } from "@Redux/sagas/address";
import { all } from "redux-saga/effects";
import { blockSaga } from "@Redux/sagas/block";
import { homeSaga } from "@Redux/sagas/home";
import { signerSaga } from "@Redux/sagas/signers";
import { walletSaga } from "@Redux/sagas/wallets";

export default function* rootSaga() {
  yield all([
    walletSaga(),
    homeSaga(),
    addressSaga(),
    signerSaga(),
    blockSaga(),
  ]);
}
