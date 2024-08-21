import "./style.css";
import { Button } from "primereact/button";

const PButton = ({ label, onClick, ...rest }) => {
  return (
    <Button
      label={label}
      className={`customStyle`}
      onClick={(e) => {}}
      {...rest}
    />
  );
};

export default PButton;
