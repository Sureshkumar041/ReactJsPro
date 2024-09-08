import VerticalBarChart from "../../component/Charts/VerticalBar";
import DashboardBarChart from "../../component/DashboardBarChart";
import styles from "./styles.module.scss";
import { useEffect, useState } from "react";
import Loader from "../../component/Loader/index.js";
import MonthlyDataChartBox from "../../component/Charts/Box/index.js";
// import VerticalBarChart from "../../component/Charts/VerticalBar";
import ForecastChart from "../../component/Charts/Forecast/index.js";
import PlotDataChartPie from "../../component/Charts/Pie/index.js";
import HeatMapChart from "../../component/Charts/HeatMap/index.js";
import MonthlyYearlyLineGraphChart from "../../component/Charts/LineGraph/index.js";

const Dashboard = () => {
  // const [isLoading, setIsLoading] = useState(false);
  const [mainChartData, setMainChartData] = useState({
    dataSet1: [],
    dataSet2: [],
  });

  const getGrossRevenue = async () => {
    try {
      // setIsLoading(true);
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
      // setIsLoading(false);
    }
  };

  useEffect(() => {
    getGrossRevenue();
  }, []);

  const chartComponents = [
    <PlotDataChartPie key="PlotDataChartPie" />,
    <MonthlyDataChartBox key="MonthlyDataChartBox" />,
    <MonthlyYearlyLineGraphChart key="MonthlyYearlyLineGraphChart" />,
    <HeatMapChart key="HeatMapChart" />,
  ];

  return (
    <div className={styles?.root}>
      <div className={`${styles?.miniChartContainer}`}>
        <div className={`${styles?.gridContainer}`}>
          {chartComponents.map((ChartComponent, index) => (
            <div key={index} className={styles?.barChartContainer}>
              {ChartComponent} 
            </div>
          ))}
         
        </div>
      </div>
      <div className={styles?.bigChartContainer}>
        <div style={{ height: "100%", padding: "12px",width:"100%" }}>
          {/* <div style={{ height: "95%", width: "99%" }}> */}
          {/* <h3 style={{ color: "#191F71" }}>Forecasted Water level for the next 6 Months</h3> */}
            <ForecastChart />
          {/* </div> */}
        </div>
      </div>
      <Loader />
    </div>
  );
};

export default Dashboard;
