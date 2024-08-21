import React from "react";
import "./App.css";
import Login from "./pages/login";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/saga-blue/theme.css";
import "primeicons/primeicons.css";

function App() {
  return (
    <PrimeReactProvider>
      <Login />
    </PrimeReactProvider>
  );
}

export default App;
