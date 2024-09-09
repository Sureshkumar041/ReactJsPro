import React, { useState, useEffect } from 'react';
import Plotly from 'plotly.js-dist-min';
import { getHeatmapDataService } from '../../../services/user';


var dummyData = [
    {
      z: [[1, 20], [20, 1], [30, 60]],
      type: 'heatmap'
    }
  ];

function HeatMapChart() {
    const [data, setData] = useState(null);

    const getHeatMapData = async () => {
        try {
            const res = await getHeatmapDataService();
            setData(res?.data);
        } catch (error) {
            console.log("Error fetching plot monthly years data:", error?.message);
        }
    };

    useEffect(() => {
        getHeatMapData();
    }, []);

    useEffect(() => {
        if (data) {
            const layout ={
              
                title: {
                    text: 'Monthly Water Level Heatmap', // Chart title
                    font: {
                      size: 14, // Customize the title font size here
                 } },
                xaxis: {
                  title: 'Month', // Label for the x-axis
                },
                yaxis: {
                  title: 'Year' ,
               }}
               const config = {
                displaylogo: false, 
                modeBarButtonsToRemove: [
                    "zoom2d", "select2d", "lasso2d",   
                  ],
                  toImageButtonOptions: {
                    format: 'png', 
                    filename: 'Monthly Water Level Heatmap',
                    width: 1200, 
                    height: 800, 
                    scale: 7 
                  },
              };
           
            Plotly.newPlot("Heat-map", data, layout, config );
        }
    }, [data]);

    return <div id="Heat-map" style={{width:"100%",height:"100%"}}/>;
}

export default HeatMapChart;
