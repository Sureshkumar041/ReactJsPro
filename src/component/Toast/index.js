import { useState, useEffect } from "react";
import { useToastContext } from "../../Utility/ToastUtil";

const ShowToast = ({
  showToast,
  msg = "Success",
  status = "success",
  details = "Success",
}) => {
  function http() {
    showToast({
      severity: status,
      summary: msg,
      detail: details,
      life: 1000,
    });
  }
  http();
};

export default ShowToast;
