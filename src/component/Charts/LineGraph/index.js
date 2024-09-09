import React, { useState, useEffect } from 'react';
import Plotly from 'plotly.js-dist-min';
import {  getPlotMonthlyYearsService } from '../../../services/user';

function MonthlyYearlyLineGraphChart() {
  const [data, setData] = useState(0);

  const getForecastData = async () => {
    try {
      const res = await getPlotMonthlyYearsService();
      if (true || res?.status) {
        setData(res?.data);
      } else {
        
      }
    } catch (error) {
      console.log("Error fetching plot monthly years data:", error?.message);
    }
  };


  useEffect(() => {
    getForecastData();
  }, []);

  useEffect(() => {
    if (data) {
      const layout ={
        title: {
          text: 'Water Level Comparison Over Year' , // Chart title
          font: {
            size: 14, // Customize the title font size here
       } },
        xaxis: {
          title: 'Month', // Label for the x-axis
        },
        yaxis: {
          title: 'Water Level (Meters)' ,
       }}

       const config = {
        displaylogo: false, 
        modeBarButtonsToRemove: [
          "zoom2d", "select2d", "lasso2d",   
        ],
        toImageButtonOptions: {
          format: 'png', 
          filename: 'Water Level Comparison Over Year',
          width: 1200, 
          height: 800, 
          scale: 7,
        },
        
      };
      Plotly.newPlot("graph-div", data, layout,config );
    }
  }, [data]);

  return <div id="graph-div" style={{width:"100%",height:"100%"}} />;
}

export default MonthlyYearlyLineGraphChart;




























// import { Chart } from "primereact/chart";
// import { FormatDate } from "../../../common/constant";
// import styles from "./styles.module.scss";
// import { useEffect, useRef } from "react";

// const LineGraph = ({ data = [] }) => {
//   const chartRef = useRef(null);
//   const surfaceBorder = "lightgrey",
//     lineColor = "#20c997",
//     axisLabel = "grey",
//     primary = "#4696DE";

//   return (
//     <div className={styles?.lineChartContainer}>
//       <Chart
//         ref={chartRef}
//         type="line"
//         data={{
//           labels: data?.map((item) =>
//             FormatDate(item.record_date, "DD-MM-YYYY")
//           ),
//           datasets: [
//             {
//               tension: 0.4,
//               label: "Water Level",
//               fillColor: "rgba(220,220,220,0.2)",
//               strokeColor: "rgba(220,220,220,1)",
//               pointColor: "rgba(220,220,220,1)",
//               pointStrokeColor: "#fff",
//               pointHighlightFill: "#fff",
//               pointHighlightStroke: "rgba(220,220,220,1)",
//               data: data?.map((item) => item.recorded_value),
//               // fill: true,
//               pointBorderColor: primary,
//               pointBackgroundColor: primary,
//             },
//           ],
//         }}
//         options={{
//           maintainAspectRatio: false,
//           aspectRatio: 0.6,
//           plugins: {
//             legend: {
//               labels: {
//                 color: "#000",
//               },
//             },
//           },
//           scales: {
//             x: {
//               ticks: {
//                 color: axisLabel,
//               },
//               grid: {
//                 color: surfaceBorder,
//                 display: false,
//               },
//             },
//             y: {
//               ticks: {
//                 color: axisLabel,
//               },
//               grid: {
//                 color: surfaceBorder,
//               },
//               border: {
//                 display: false,
//               },
//             },
//           },
//         }}
//       />
//     </div>
//   );
// };

// export default LineGraph;
