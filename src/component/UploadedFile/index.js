import styles from "./styles.module.scss";

const UploadedFile = ({ data, onDelete, index }) => {
  const handleDelete = () => {
    // Delete
    onDelete && onDelete(index);
  };
  return (
    <div className="w-100">
      <div className={styles?.fileContainer}>
        <div className={styles?.fileIconContainer}>
          <i className="pi pi-file"></i>
        </div>
        <div className={styles?.contentFile}>
          <div className={styles?.fileNameContainer}>
            <p>{data?.name}</p>
            <div className={styles?.delIcon} onClick={() => handleDelete()}>
              <i className="pi pi-trash"></i>
            </div>
          </div>
          <div className={styles?.progessBorder}></div>
        </div>
      </div>
    </div>
  );
};

export default UploadedFile;
