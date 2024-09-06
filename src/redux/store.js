import { configureStore } from "@reduxjs/toolkit";
import ReducerList from "./reducer";

const rootReducer = (state, action) => {
  // Handle reset redux if need
  //   if ("reset") {
  //     const initialReduxState = {};
  //   }
  return ReducerList(state, action);
};

const store = () => {
  return configureStore({ reducer: rootReducer });
};

// console.log(store?.)

export default store;
