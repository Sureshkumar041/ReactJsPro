import { ReducerTypes } from "../../common/constant";

export const setUserDetails = (value) => ({
  type: ReducerTypes?.USERDETAILS,
  data: value,
});

export const setIsShowSideBar = (value) => ({
  type: ReducerTypes?.IS_SHOW_SIDEBAR,
  data: value,
});

