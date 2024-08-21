import Text from "../text";
import "./style.css";

const ErrorText = ({ children, ...rest }) => {
  return (
    <Text className={`error`}>{children}</Text>
  );
};

export default ErrorText;
