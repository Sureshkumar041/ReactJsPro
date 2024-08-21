import Text from "../text";
import "./style.css";

const Label = ({ children, ...rest }) => {
  return (
    <label {...rest}>
      <Text className={`label`}>{children}</Text>
    </label>
  );
};

export default Label;
