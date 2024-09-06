import { Chart } from "primereact/chart";
import { FormatDate } from "../../../common/constant";
import styles from "./styles.module.scss";
import { useEffect, useRef } from "react";

const LineGraph = ({ data = [] }) => {
  const chartRef = useRef(null);
  const surfaceBorder = "lightgrey",
    lineColor = "#20c997",
    axisLabel = "grey",
    primary = "#4696DE";

  return (
    <div className={styles?.lineChartContainer}>
      <Chart
        ref={chartRef}
        type="line"
        data={{
          labels: data?.map((item) =>
            FormatDate(item.record_date, "DD-MM-YYYY")
          ),
          datasets: [
            {
              tension: 0.4,
              label: "Water Level",
              fillColor: "rgba(220,220,220,0.2)",
              strokeColor: "rgba(220,220,220,1)",
              pointColor: "rgba(220,220,220,1)",
              pointStrokeColor: "#fff",
              pointHighlightFill: "#fff",
              pointHighlightStroke: "rgba(220,220,220,1)",
              data: data?.map((item) => item.recorded_value),
              // fill: true,
              pointBorderColor: primary,
              pointBackgroundColor: primary,
            },
          ],
        }}
        options={{
          maintainAspectRatio: false,
          aspectRatio: 0.6,
          plugins: {
            legend: {
              labels: {
                color: "#000",
              },
            },
          },
          scales: {
            x: {
              ticks: {
                color: axisLabel,
              },
              grid: {
                color: surfaceBorder,
                display: false,
              },
            },
            y: {
              ticks: {
                color: axisLabel,
              },
              grid: {
                color: surfaceBorder,
              },
              border: {
                display: false,
              },
            },
          },
        }}
      />
    </div>
  );
};

export default LineGraph;
