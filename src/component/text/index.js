import styles from "./styles.module.scss";

const Text = ({ children, ...rest }) => {
  return (
    <p className={`${styles?.styles}`} {...rest}>
      {children}
    </p>
  );
};

export default Text;
