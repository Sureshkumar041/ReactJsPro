import { ReducerTypes } from "../../common/constant";

export const CommonReducerInitial = {
  userDetails: {},
  isShowSideBar: false,
};

export const CommonReducer = (state = CommonReducerInitial, action) => {
  switch (action?.type) {
    case ReducerTypes?.USERDETAILS:
      return { ...state, userDetails: action?.data };
    case ReducerTypes?.IS_SHOW_SIDEBAR:
      return { ...state, isShowSideBar: action?.data };
    default:
      return state;
  }
};
