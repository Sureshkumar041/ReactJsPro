import Lottie from "lottie-react";
import WaterAnimation from "../../assets/loader/water.json";
import styles from "./styles.module.scss";

const Loader = ({ isVisible }) => {
  if (!isVisible) return null;
  return (
    <div className={styles?.lottieContainer}>
      <Lottie
        animationData={WaterAnimation}
        loop={true}
        className={styles?.loading}
      />
    </div>
  );
};

export default Loader;
