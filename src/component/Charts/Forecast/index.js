import React, { useState, useEffect } from "react";
import Plotly from "plotly.js-dist-min";
import { getForecastService } from "../../../services/user";

const processedData = [
    {
        mode: "lines",
        name: "Historical Water Level",
        type: "scatter",
        x: [
            "2023-11-01T00:00:00",
            "2023-12-01T00:00:00",
            "2024-01-01T00:00:00",
            "2024-02-01T00:00:00",
            "2024-03-01T00:00:00"
        ],
        y: [
            30.0,
            386.5,
            321.5,
            360.5,
            32.5
        ]
    },
    {
        line: { color: "orange" },
        mode: "lines",
        name: "Forecasted Water Level",
        type: "scatter",
        x: [
            "2024-04-30T00:00:00",
            "2024-05-31T00:00:00",
            "2024-06-30T00:00:00",
            "2024-07-31T00:00:00",
            "2024-08-31T00:00:00",
            "2024-09-30T00:00:00"
        ],
        y: [
            372.7638668707957,
            241.11107744624056,
            265.9373661527567,
            261.2557744171521,
            262.1386007404087,
            261.9721226788752
        ]
    }
];

function ForecastChart() {
  const [data, setData] = useState([]);
  const [layout, setlayout]=useState({})

  const getForecastData = async () => {
    try {
      const res = await getForecastService();
      if (true || res?.status) {
        setData(flattenYValues(res?.data));
        setlayout(res?.layout)
      } else {
      }
    } catch (error) {
      console.log("Error fetching forecast data:", error?.message);
    }
  };

  useEffect(() => {
    getForecastData();
  }, []);

  // Function to flatten the y values
function flattenYValues(data) {
  return data.map(item => {
      if (Array.isArray(item.y) && Array.isArray(item.y[0])) {
          // Flatten y values if it's an array of arrays
          item.y = item.y.flat();
      }
      return item;
  });
}

  useEffect(() => {
    if (data && data.length > 0) {
      // const layout = {
      //   title: "Forecasted Water level for the Next 6 Months",
      //   line: { color: "orange" }  ,
      //   xaxis: {
      //     title: "Data", 
      //     rangeslider: { visible: true },
      //     mode: 'lines+markers'
      //   },
      //   yaxis: {
      //     title: "Water Level (Meters)", 
      //     mode: 'lines+markers'
      //   },
        
      // };
      const config = {
        displaylogo: false, 
        modeBarButtonsToRemove: [
          "zoom2d", "select2d", "lasso2d",   
        ],
      };
      Plotly.newPlot("forecast", data, layout, config);
    }
  }, [data]);

  return <div id="forecast" style={{ width: "100%", height: "100%" }}></div>;
}

export default ForecastChart;
