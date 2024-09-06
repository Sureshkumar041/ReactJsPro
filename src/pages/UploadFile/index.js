import UploadFrom from "../../component/UploadFrom";
import styles from "./styles.module.scss";

const UploadFile = () => {
  const cardArr = [
    {
      icon: "bi bi-cloud-upload",
      name: "Cloud Data",
    },
    {
      icon: "pi pi-server",
      name: "Databases",
    },
    {
      icon: "pi pi-objects-column",
      name: "Apps",
    },
    {
      icon: "pi pi-file",
      name: "Files",
    },
  ];
  return (
    <div className={styles?.pageRoot}>
      <p className={styles?.title}>Connect to All Data</p>
      <div className={styles?.cardFlexContainer}>
        {cardArr?.map((v, i) => (
          <UploadFrom key={i} data={v} />
        ))}
      </div>
    </div>
  );
};

export default UploadFile;
