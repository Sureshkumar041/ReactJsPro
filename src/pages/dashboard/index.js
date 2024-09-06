import VerticalBarChart from "../../component/Charts/VerticalBar";
import DashboardBarChart from "../../component/DashboardBarChart";
import styles from "./styles.module.scss";
import { useEffect, useState } from "react";
import Loader from "../../component/Loader/index.js";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [mainChartData, setMainChartData] = useState({
    dataSet1: [],
    dataSet2: [],
  });

  const getGrossRevenue = async () => {
    try {
      setIsLoading(true);
      const payload = {};
      const res = "";
      if (true || res?.status) {
        const dataSet1 = [65, 59, 80, 81, 56, 55, 65, 59, 80, 81, 56, 55], // dummy data
          dataSet2 = [28, 48, 40, 19, 86, 27, 90, 28, 48, 40, 19, 86];
        setMainChartData({
          dataSet1: dataSet1,
          dataSet2: dataSet2,
        });
      } else {
      }
    } catch (error) {
      console.log("Catch getGrossRevenue: ", error?.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getGrossRevenue();
  }, []);

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
            <VerticalBarChart
              data={{
                dataSet1: {
                  data: mainChartData?.dataSet1,
                  label: "My First dataset",
                  backgroundColor: "#191F71",
                },
                dataSet2: {
                  data: mainChartData?.dataSet2,
                  label: "My Second dataset",
                  backgroundColor: "#4491D6",
                },
              }}
            />
          </div>
        </div>
      </div>
      <Loader />
    </div>
  );
};

export default Dashboard;
