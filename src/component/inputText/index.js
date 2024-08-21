import { InputText } from "primereact/inputtext";
import "./style.css";
import Label from "../label";
import ErrorText from "../errorText";

const TextField = ({
  id,
  label,
  name,
  placeholder,
  value,
  onChange,
  defaultValue = "",
  error,
  ...rest
}) => {
  return (
    <div>
      {label && <Label>{label}</Label>}
      <InputText
        id={id}
        name={name}
        className={`input`}
        defaultValue={defaultValue}
        value={value}
        placeholder={placeholder}
        onChange={(e) => {
          onChange(e);
        }}
        {...rest}
      />
      {error && <ErrorText>{error}</ErrorText>}
    </div>
  );
};

export default TextField;
