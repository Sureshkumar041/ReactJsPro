import "./styles.css";
import TextField from "../../component/inputText";
import Text from "../../component/text";
import AppLogo from "../../assets/images/icon/logo.png";
import PButton from "../../component/button";
//
const Login = () => {
  return (
    <div>
      <div className="loginBg">
        <div className="bgImage"></div>
        <div className="loginContainer">
          <div className="iconContainer">
            <div className="iconPng">
              <img src={AppLogo} style={{ width: "100%", height: "100%" }} />
            </div>
          </div>
          <Text className="signInText">Sign In</Text>
          <form className="formContainer">
            <div>
              <TextField
                id={"email"}
                label={"Email"}
                placeholder="Enter email address"
                onChange={() => {}}
                error={"Email is Required"}
              />
              <TextField
                id={"password"}
                label={"Password"}
                placeholder="Enter password"
                onChange={() => {}}
                error={"Password is Required"}
              />
            </div>
            <div className="formBottomSection">
              <a href="#">Forgot Password ?</a>
              <a href="#">Remember</a>
            </div>
            <PButton label="Sign In" onClick={() => {}} />
          </form>
          <div className="infoText">
            <Text>
              By Clicking Sign in you agree to the NexTent
              <a href="#"> User Agreement, Privacy and Cookie Policy.</a>
            </Text>
            <Text>
              New to NexTent?
              <a href="#"> Create an account </a>
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
