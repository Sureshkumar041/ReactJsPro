import VerticalBarChart from "../../component/Charts/VerticalBar";
import DashboardBarChart from "../../component/DashboardBarChart";
import styles from "./styles.module.scss";

const Dashboard = () => {
  return (
    <div className={styles?.root}>
      <div className={`${styles?.miniChartContainer}`}>
        <div className={`${styles?.gridContainer}`}>
          {Array?.from({ length: 4 }, (v, i) => i)?.map((v, index) => (
            <div key={index} className={`${styles?.barChartContainer}`}>
              <DashboardBarChart />
            </div>
          ))}
        </div>
      </div>
      <div className={styles?.bigChartContainer}>
        <div style={{ height: "100%", padding: "12px" }}>
          <div style={{ height: "5%" }}>
            <h3 style={{ color: "#191F71" }}>Monthly Gross Revenue</h3>
          </div>
          <div style={{ height: "95%", width: "99%" }}>
            <VerticalBarChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
