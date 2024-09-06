import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import styles from "./styles.module.scss";
import Label from "../label";
import ErrorText from "../errorText";

const IconInputField = ({
  id,
  label,
  name,
  placeholder,
  value,
  onChange,
  className = "",
  defaultValue,
  error,
  onKeyDown,
  ...rest
}) => {
  const [isHash, setIsHash] = useState(true);

  const handleIconFunc = () => {
    setIsHash(!isHash);
  };

  return (
    <div className="mt-3 mb-1">
      {label && <Label>{label}</Label>}
      <IconField>
        <InputIcon
          className={`${styles?.icon} pi ${isHash ? "pi-eye" : "pi-eye-slash"}`}
          onClick={() => handleIconFunc()}
        ></InputIcon>
        <InputText
          v-model="value2"
          id={id}
          name={name}
          className={`${styles?.input} ${className}`}
          defaultValue={defaultValue}
          value={value}
          placeholder={placeholder}
          onChange={(e) => {
            onChange && onChange(e);
          }}
          onKeyDown={(e) => onKeyDown && onKeyDown(e)}
          type={isHash ? "password" : "text"}
          {...rest}
        />
      </IconField>
      {error && <ErrorText>{error}</ErrorText>}
    </div>
  );
};

export default IconInputField;
