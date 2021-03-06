/**
 * Combine all reducers in this file and export the combined reducers.
 */

import address from "./address";
import block from "./block";
import { combineReducers } from "redux";
import home from "./home";
import signer from "./signers";
import wallet from "./wallet";

export default function createReducer() {
  const appReducer = combineReducers({
    home,
    address,
    signer,
    wallet,
    block,
  });

  const rootReducer = (state: any, action: any) => appReducer(state, action);
  return rootReducer;
}
