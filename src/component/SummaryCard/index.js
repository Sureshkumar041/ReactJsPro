import styles from "./styles.module.scss";

const SummaryCard = ({ data }) => {
  return (
    <div className={styles?.root}>
      <div
        className={`${styles?.iconContainer} ${
          styles?.[data?.color ? data?.color : "green"]
        }`}
      >
        <i className={data?.icon}></i>
      </div>
      <div className={styles?.textContainer}>
        <p className={styles?.label}>{data?.label}</p>
        <p className={styles?.value}>{data?.value}</p>
      </div>
    </div>
  );
};

export default SummaryCard;
