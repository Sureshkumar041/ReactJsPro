import React, { useState, useEffect } from 'react';
import Plotly from 'plotly.js-dist-min';
import { getForecastService, getPlotDataService } from '../../../services/user';


var traceA = {
  type: "pie",
  values: [8149300, 4916438, 4776980, 3100950, 2083210],
  labels: ['Russia', 'Canada', 'Brazil', 'United States', 'China']
};

var dummyData = [traceA];

var layout = {
  title: "Area Under Forest for Different Countries"
};


function PlotDataChartPie() {
  const [data, setData] = useState(0);

  
  const getPlotDataPie = async () => {
    try {
      const res = await getPlotDataService();
      if (true || res?.status) {
        setData(res?.data);
      } else {
        
      }
    } catch (error) {
      console.log("Error fetching getPlotDataPie :", error?.message);
    }
  };


  useEffect(() => {
    getPlotDataPie();
  }, []);

  useEffect(() => {
    if (data) {
      const layout ={
      
        title: {
          text: 'Average Water Level by Year' , // Chart title
          font: {
            size: 14, 
       } },
       showlegend: true, // Show the legend
        
       } // Label for the y-axis
       const config = {
        displaylogo: false, 
        modeBarButtonsToRemove: [
          "zoom2d", "select2d", "lasso2d",   
        ],
      };
      
      Plotly.newPlot("pieChart", data, layout, config);
    }
  }, [data]);

  return <div id="pieChart" style={{width:"100%",height:"100%"}}></div>;
}

export default PlotDataChartPie;




// import React, { useState, useEffect } from 'react';
// import Plotly from 'plotly.js-dist-min';

// function PlotDataChartPie() {

//   const [plot, setPlot] = useState(0);

//   useEffect(() => {
//     fetch('https://nextentlabs.com:81/getPlotData')
//       .then(res => res.json())
//       .then(data => {
//         setPlot(data);
//       })
//       .catch(error => {
//         console.error('Error fetching the data:', error);
//       });
//   }, []);



//   useEffect(() => {
//     if (plot) {
//       Plotly.newPlot("graph-div", plot, {});

//     }
//   }, [plot]);

//   return (
//     <div >

//       <div id="graph-div" className="graph-div">
//       </div>

//     </div>
//   );
// }

// export default PlotDataChartPie;


