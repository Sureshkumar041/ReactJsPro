import React from "react";
import "./App.css";
import "./styles/globals.css";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/saga-blue/theme.css";
//icon
import "primeicons/primeicons.css";
import "primereact/resources/primereact.css";
//core
import "primereact/resources/primereact.min.css";
import "primeflex/primeflex.css";
import AppRoute from "./routes/AppRoutes";
import { Toast } from "primereact/toast";
import { Provider } from "react-redux";
import configureRedux from "./redux/store";

export const ToastContext = React?.createContext();

function App() {
  const store = configureRedux();
  return (
    <Provider store={store}>
      <ToastContext.Provider value={Toast}>
        <PrimeReactProvider>
          <Toast />
          <AppRoute />
        </PrimeReactProvider>
      </ToastContext.Provider>
    </Provider>
  );
}

export default App;

// import React, { useState, useEffect } from 'react';
// import Plotly from 'plotly.js-dist-min';
// import { getMonthlyDataService } from './services/user';

// function App() {
//     const [data, setData] = useState(null);

//     const getMonthlyData = async () => {
//         try {
//           const res = await getMonthlyDataService();
//           if (true || res?.status) {
//             setData(res?.data);
//           } else {
            
//           }
//         } catch (error) {
//             console.log("Error fetching monthly data:", error?.message);
//         }
//       };

//     useEffect(() => {
//         getMonthlyData();
//     }, []);
//     useEffect(() => {
//         if (data) {
//             Plotly.newPlot("graph-div", data);
//         }
//     }, [data, getMonthlyData]);

//     return <div id="graph-div"  className='graph-div'/>;
// }

// export default App;
