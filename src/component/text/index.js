import "./style.css";

const Text = ({ children, ...rest }) => {
  return <p className={`text`} {...rest}>{children}</p>;
};

export default Text;
