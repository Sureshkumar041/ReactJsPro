import "./styles.css";
import { useState } from "react";
import TextField from "../../component/inputText";
import AppLogo from "../../assets/images/icon/logo.png";
import PButton from "../../component/button";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { LoginValidation } from "../../common/formValidation";
import { useToastContext } from "../../Utility/ToastUtil";
import ShowToast from "../../component/Toast";
import IconInputField from "../../component/IconInputField";
import { LoginService } from "../../services/auth";
import Loader from "../../component/Loader";

const Login = () => {
  const navigate = useNavigate();
  const [isLoader, setIsLoader] = useState(false);
  const { showToast } = useToastContext();
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
    // username: "skbalahere",
    // password: "catchmeifyoucan",sss
  });

  const handleSubmit = async (values) => {
    try {
      setIsLoader(true);
      const payload = {
        username: values?.username,
        password: values?.password,
      };
      const res = await LoginService(payload);
      if (res?.status) {
        localStorage.setItem(
          "userDetails",
          JSON.stringify({ username: values?.username })
        );
        localStorage.setItem("accessToken", JSON.stringify(true));
        ShowToast({ showToast, msg: "Login Successfully" });
        navigate("/dashboard");
      } else {
        ShowToast({
          showToast,
          msg: "Error",
          status: "error",
          details: res?.msg ?? "Error",
        });
      }
    } catch (error) {
    } finally {
      setIsLoader(false);
    }
  };

  return (
    <div>
      <div className="loginBg">
        <div className="bgImage"></div>
        <div className="loginContainer">
          <div className="iconContainer">
            <div className="iconPng">
              <img
                src={AppLogo}
                style={{ width: "100%", height: "100%" }}
                alt="img"
              />
            </div>
          </div>
          <p className="signInText">Sign In</p>
          <Formik
            initialValues={loginData}
            validationSchema={LoginValidation}
            onSubmit={(values) => {
              handleSubmit(values);
            }}
            validateOnBlur={true}
            enableReinitialize={false}
          >
            {({
              errors,
              values,
              touched,
              submitForm,
              handleChange,
              handleBlur,
            }) => (
              <div className="formContainer">
                <div>
                  <TextField
                    id={"username"}
                    label={"Username"}
                    name="username"
                    value={values?.username}
                    placeholder="Enter username"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched?.username && errors?.username}
                  />
                  <IconInputField
                    id={"password"}
                    label={"Password"}
                    name="password"
                    placeholder="Enter password"
                    value={values?.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched?.password && errors?.password}
                    onKeyDown={(e) => {
                      if (e?.key === "Enter") {
                        submitForm();
                      }
                    }}
                  />
                </div>
                <div className="formBottomSection">
                  <a href=".">Forgot Password ?</a>
                  <a href=".">Remember me</a>
                </div>
                <PButton
                  label="Sign In"
                  type="submit"
                  onClick={() => {
                    submitForm();
                  }}
                  style={{ width: "100%" }}
                />
              </div>
            )}
          </Formik>
          <div className="infoText">
            <p>
              By Clicking Sign in you agree to the NexTent
              <a href="."> User Agreement, Privacy and Cookie Policy.</a>
            </p>
            <p>
              New to NexTent?
              <a href="."> Create an account </a>
            </p>
          </div>
        </div>
      </div>
      <Loader isVisible={isLoader} />
    </div>
  );
};

export default Login;
