import styles from "./styles.module.scss";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

const DeletePopup = ({ isVisible, onClose, btnDetails }) => {
  //   const ShowTemplate = () => {
  //     confirmDialog({
  //       group: "",
  //       header: "Confirmation",
  //       message: <div></div>,
  //     });
  //   };

  const handleAccept = () => {
    btnDetails?.accept?.onClick && btnDetails?.accept?.onClick();
  };

  const handleReject = () => {
    btnDetails?.reject?.onClick && btnDetails?.reject?.onClick();
  };

  return (
    <ConfirmDialog
      visible={isVisible}
      onHide={() => {
        handleReject();
      }}
      header="Confirmation"
      message="Are you sure you want to delete?"
      icon="pi pi-trash text-danger"
      accept={handleAccept}
      reject={handleReject}
      breakpoints={{ "1100px": "75vw", "960px": "100vw" }}
    />
  );
};

export default DeletePopup;
