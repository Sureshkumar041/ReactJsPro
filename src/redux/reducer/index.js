import { combineReducers } from "@reduxjs/toolkit";
import { CommonReducer } from "./common.js";

const ReducerList = combineReducers({
  CommonReducer,
});

export default ReducerList;
