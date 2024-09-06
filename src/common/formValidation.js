import * as Yup from "yup";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#@$!%*.?&_])[A-Za-z\d#@$!%*.?&_]{6,}$/;
const emailRegex =
  /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
const phoneRegex = /^(\+91-|\+91|0)?\d{10}$/;
const AlphabetRegex = /^[a-zA-Z\s]+$/;
const AlphaNumericRegex = /^[a-zA-Z0-9]*$/;
const AlphaNumericWithSpaceRegex = /^[a-zA-Z0-9\s]*$/;
const NumericRegex = /^[0-9]*$/;
const withOutSplChar = /[^a-zA-Z0-9 ]*$/;

const emailValidation = Yup.string()
  .trim()
  .max(100, "Please enter valid email ID")
  .required("Email ID required")
  .matches(emailRegex, "Please enter valid email ID");

export const LoginValidation = Yup.object().shape({
  username: Yup.string().trim().required("Username required"),
  password: Yup.string().trim().required("Password required"),
});
