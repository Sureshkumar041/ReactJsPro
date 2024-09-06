import styles from "./styles.module.scss";

const ErrorText = ({ children, ...rest }) => {
  return (
    <p className={`${styles?.error}`}>{children}</p>
  );
};

export default ErrorText;
