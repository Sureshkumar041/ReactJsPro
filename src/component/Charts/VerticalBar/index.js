import { Chart } from "primereact/chart";
import styles from "./styles.module.scss";

const VerticalBarChart = ({ data }) => {
  const textColor = "red";
  const textColorSecondary = "#191F71";

  return (
    <div className={styles?.chartContainer}>
      <Chart
        className={styles?.chart}
        type="bar"
        data={{
          labels: Array?.from({ length: 12 }, (v, i) => i + 1),
          datasets: [
            {
              label: data?.dataSet1?.label,
              backgroundColor: data?.dataSet1?.backgroundColor,
              data: data?.dataSet1?.data,
              categoryPercentage: 0.9,
              barPerceontage: 1.0,
              borderRadius: 4,
            },
            {
              label: data?.dataSet2?.label,
              backgroundColor: data?.dataSet2?.backgroundColor,
              data: data?.dataSet2?.data,
              categoryPercentage: 0.9,
              barPercentage: 1.0,
              borderRadius: 4,
            },
          ],
        }}
        options={{
          maintainAspectRatio: false,
          aspectRatio: 0.8,
          plugins: {
            legend: {
              display: false,
              labels: {
                fontColor: textColor,
              },
            },
          },
          scales: {
            x: {
              ticks: {
                color: textColorSecondary,
                font: {
                  weight: 500,
                },
              },
              grid: {
                display: false,
              },
              position: "top",
              border: {
                display: true,
                color: "#666666",
              },
            },
            y: {
              ticks: {
                color: textColorSecondary,
              },
              grid: {
                display: false,
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

export default VerticalBarChart;
