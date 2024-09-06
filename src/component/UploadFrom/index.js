import { SELECTFILE_PATH } from "../../common/constant";
import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";

const UploadFrom = ({ data }) => {
  const navigate = useNavigate();
  return (
    <div
      className={styles?.uploadFromContainer}
      onClick={() => navigate(SELECTFILE_PATH)}
    >
      <div className={styles?.iconContainer}>
        <i className={data?.icon}></i>
      </div>
      <div className={styles?.content}>
        <p className={styles?.cardTitle}>{data?.name}</p>
      </div>
    </div>
  );
};

export default UploadFrom;
