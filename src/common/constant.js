import moment from "moment";

// Screen PathNames
export const DASHBOARD_PATH = "/dashboard";
export const CLIENTSUPPLIER_PATH = "/clientSupplier";
export const CLIENT_PATH = "/client";
export const SUPPLIER_PATH = "/supplier";
export const GROUNDWATERLEVEL_PATH = "/groundWaterLevel";
export const UPLOADFILE_PATH = "/uploadFile";
export const SELECTFILE_PATH = "/selectFile";
export const EXCELSUMMARY_PATH = "/excelSummary";
export const FILESUMMARY_PATH = "/fileSummary";
export const VIEWData_PATH = "/viewData";

// Reducer Types
export const ReducerTypes = {
  USERDETAILS: "userDetails",
  IS_SHOW_SIDEBAR: "isShowSideBar",
};

// Format DATE
export const FormatDate = (date, format) => {
  return moment(date).format(format ? format : "DD-MM-YYYY HH:mm:ss");
};
