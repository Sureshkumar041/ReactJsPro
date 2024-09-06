import { Chart } from "primereact/chart";
import styles from "./styles.module.scss";

const VerticalBarChart = () => {
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
              label: "My First dataset",
              backgroundColor: "#191F71",
              data: [65, 59, 80, 81, 56, 55, 65, 59, 80, 81, 56, 55],
              categoryPercentage: 0.9,
              barPercentage: 1.0,
              borderRadius: 4,
            },
            {
              label: "My Second dataset",
              backgroundColor: "#4491D6",
              data: [28, 48, 40, 19, 86, 27, 90, 28, 48, 40, 19, 86],
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
