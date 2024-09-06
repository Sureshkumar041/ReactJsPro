import { Chart } from "primereact/chart";

const BarChart = () => {
  const textColor = "red";

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <Chart
        type="bar"
        data={{
          labels: Array?.from({ length: 12 }, (v, i) => i + 1),
          datasets: [
            {
              label: "My First dataset",
              backgroundColor: "#4491D6",
              data: [65, 59, 80, 81, 56, 55, 65, 59, 80, 81, 56, 55],
              borderWidth: 0,
              categoryPercentage: 1.0,
              barPercentage: 0.5,
              borderRadius: 8,
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
              display: false,
            },
            y: {
              display: false,
            },
          },
        }}
        style={{ height: "100%", width: "100%", padding: "12px" }}
      />
    </div>
  );
};

export default BarChart;
