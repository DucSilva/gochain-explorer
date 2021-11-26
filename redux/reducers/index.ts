/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from "redux";
import home from "./home/index";
import address from "./address/index";

export default function createReducer() {
  const appReducer = combineReducers({
    home,
    address,
  });

  const rootReducer = (state: any, action: any) => appReducer(state, action);
  return rootReducer;
}
