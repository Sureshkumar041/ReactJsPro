import BarChart from "../Charts/Bar";
import styles from "./styles.module.scss";

const DashboardBarChart = () => {
  return (
    <div style={{ height: "100%" }}>
      <div className={styles?.content}>
        <div className={styles?.textInfo}>
          <p className={styles?.title}>Ground Water Level Monitoring</p>
          <p className={styles?.mainCount}>7890</p>
          <div className={styles?.flexRow}>
            <div className={styles?.countTextContainer}>
              <p>2022</p>
              <p>2023</p>
            </div>
            <div className={styles?.countTextContainer}>
              <p>7890</p>
              <p>7890</p>
            </div>
            <div>
              <i className="pi pi-chart-bar"></i>
            </div>
          </div>
        </div>
      </div>
      <div className={styles?.barChartContainer}>
        <BarChart />
      </div>
    </div>
  );
};

export default DashboardBarChart;
