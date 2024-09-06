import { InputText } from "primereact/inputtext";
import styles from "./styles.module.scss";
import Label from "../label";
import ErrorText from "../errorText";

const TextField = ({
  id,
  label,
  name,
  placeholder,
  value,
  onChange,
  className = "",
  defaultValue,
  onBlur,
  error,
  onKeyDown,
  ...rest
}) => {
  return (
    <div className="mt-3 mb-1">
      {label && <Label>{label}</Label>}
      <InputText
        id={id}
        name={name}
        className={`${styles?.input} ${className}`}
        defaultValue={defaultValue}
        value={value}
        placeholder={placeholder}
        onBlur={onBlur && onBlur}
        type="text"
        onKeyDown={(e) => onKeyDown && onKeyDown(e)}
        onChange={(e) => {
          onChange && onChange(e);
        }}
        {...rest}
      />
      {error && <ErrorText>{error}</ErrorText>}
    </div>
  );
};

export default TextField;
