import styles from "./styles.module.scss";
import { Button } from "primereact/button";

const PButton = ({ label, onClick, color, className, ...rest }) => {
  return (
    <Button
      type="submit"
      label={label}
      className={`${styles?.customStyle} ${
        color ? styles?.[color] : styles?.primary
      } ${className}`}
      onClick={(e) => {
        onClick && onClick(e);
        e?.target?.blur();
      }}
      raised
      {...rest}
    />
  );
};

export default PButton;
