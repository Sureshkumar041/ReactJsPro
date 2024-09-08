import React, { useState, useEffect } from "react";
import Plotly from "plotly.js-dist-min";
import { getForecastService } from "../../../services/user";

var trace1 = {
  x: [1, 2, 3, 4],
  y: [10, 15, 13, 17],
  mode: "markers",
};

var trace2 = {
  x: [2, 3, 4, 5],
  y: [16, 5, 11, 10],
  mode: "lines",
};

var trace3 = {
  x: [1, 2, 3, 4],
  y: [12, 9, 15, 12],
  mode: "lines+markers",
};

var dummyData = [trace1, trace2, trace3];

function ForecastChart() {
  const [data, setData] = useState(0);

  const getForecastData = async () => {
    try {
      const res = await getForecastService();
      if (true || res?.status) {
        setData(res?.data);
      } else {
      }
    } catch (error) {
      console.log("Error fetching forecast data:", error?.message);
    }
  };

  useEffect(() => {
    getForecastData();
  }, []);

  useEffect(() => {
    if (data) {
      const layout = {
        title: "Forecasted Water level for the Next 6 Months",

        xaxis: {
          title: "Data", // Label for the x-axis
          rangeslider: { visible: true }
        },
        yaxis: {
          title: "Water Level (Meters)", // Label for the y-axis
        },
        type: "scatter",
        
      };
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
