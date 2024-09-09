import React, { useState, useEffect } from 'react';
import Plotly from 'plotly.js-dist-min';
import { getMonthlyDataService } from '../../../services/user';

function MonthlyDataChartBox() {
    const [data, setData] = useState(null);


    const getMonthlyData = async () => {
        try {
          const res = await getMonthlyDataService();
          if (true || res?.status) {
            setData(res?.data);
          } else {
            
          }
        } catch (error) {
            console.log("Error fetching monthly data:", error?.message);
        }
      };

    useEffect(() => {
        getMonthlyData();
    }, []);
    useEffect(() => {
        if (data) {
          const layout ={
            title: {
              text: 'Monthly Water Level Distribution' , // Chart title
              font: {
                size: 14, // Customize the title font size here
           } },
            xaxis: {
              title: 'Month', // Label for the x-axis
            },
            yaxis: {
              title: 'Water Level (Meters)' , // Label for the y-axis
          }}
          const config = {
            displaylogo: false, 
            modeBarButtonsToRemove: [
              "zoom2d", "select2d", "lasso2d",   
            ],
            toImageButtonOptions: {
              format: 'png', // Can also be 'jpeg', 'webp', 'svg'
              filename: 'Monthly Water Level Distribution',
              width: 1200, // Set desired width
              height: 800, // Set desired height
              scale: 7 // Increase the scale for higher resolution
            },
          };
            Plotly.newPlot("Box-chart", data, layout, config);
        }
        else{
          {}
        }
    }, [data, getMonthlyData]);

    return <div id="Box-chart" style={{width:"100%",height:"100%"}}/>;
}

export default MonthlyDataChartBox;
