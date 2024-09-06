import styles from "./styles.module.scss";

const Label = ({ children, ...rest }) => {
  return (
    <label className={styles?.label} {...rest}>
      <p>{children}</p>
    </label>
  );
};

export default Label;
