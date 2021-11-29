/**
 * Combine all reducers in this file and export the combined reducers.
 */

import address from "./address/index";
import { combineReducers } from "redux";
import home from "./home/index";
import signer from "./signers/index";

export default function createReducer() {
  const appReducer = combineReducers({
    home,
    address,
    signer,
  });

  const rootReducer = (state: any, action: any) => appReducer(state, action);
  return rootReducer;
}
