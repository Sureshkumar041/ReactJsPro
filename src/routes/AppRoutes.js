import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  CLIENT_PATH,
  CLIENTSUPPLIER_PATH,
  DASHBOARD_PATH,
  FILESUMMARY_PATH,
  GROUNDWATERLEVEL_PATH,
  SELECTFILE_PATH,
  SUPPLIER_PATH,
  UPLOADFILE_PATH,
  VIEWData_PATH,
} from "../common/constant.js";
import { lazy, Suspense } from "react";
import Loader from "../component/Loader/index.js";
import ProtectedRoute from "./ProtectedRoutes";
// import ClientsAndSuppliers from "../pages/ClientsAndSuppliers/index.js";
// import Layout from "../container/Layout/Layout.js";
// import Clients from "../pages/Clients/index.js";
// import Suppliers from "../pages/Suppliers/index.js";
// import GroundWaterLevel from "../pages/GroundWaterLevel/index.js";
// import SelectFile from "../pages/SelectFile/index.js";
// import UploadFile from "../pages/UploadFile/index.js";
// import FileSummary from "../pages/FileSummary/index.js";
// import ViewExcelInfo from "../pages/ViewData/index.js";
// import Login from "../pages/login";
// import NotFound from "../pages/NotFound/index.js";
// import Dashboard from "../pages/dashboard";

const Dashboard = lazy(() => import("../pages/dashboard"));
const Login = lazy(() => import("../pages/login"));
const NotFound = lazy(() => import("../pages/NotFound/index.js"));
const ViewExcelInfo = lazy(() => import("../pages/ViewData/index.js"));
const FileSummary = lazy(() => import("../pages/FileSummary/index.js"));
const UploadFile = lazy(() => import("../pages/UploadFile/index.js"));
const SelectFile = lazy(() => import("../pages/SelectFile/index.js"));
const GroundWaterLevel = lazy(() => import("../pages/GroundWaterLevel/index.js"));
const Suppliers = lazy(() => import("../pages/Suppliers/index.js"));
const Clients = lazy(() => import("../pages/Clients/index.js"));
const Layout = lazy(() => import("../container/Layout/Layout.js"));
const ClientsAndSuppliers = lazy(() => import("../pages/ClientsAndSuppliers/index.js"));


const AppRoute = () => {
  return (
    <Suspense fallback={<Loader isVisible={true} />}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" Component={Login} />
            <Route path="*" Component={NotFound} />

            {/* Wrap Protected Route  */}
            <Route element={<ProtectedRoute />}>
              <Route path={DASHBOARD_PATH} element={<Dashboard />} />
              <Route
                path={CLIENTSUPPLIER_PATH}
                element={<ClientsAndSuppliers />}
              />
              <Route path={CLIENT_PATH} element={<Clients />} />
              <Route path={SUPPLIER_PATH} element={<Suppliers />} />
              <Route
                path={GROUNDWATERLEVEL_PATH}
                element={<GroundWaterLevel />}
              />
              <Route path={UPLOADFILE_PATH} element={<UploadFile />} />
              <Route path={SELECTFILE_PATH} element={<SelectFile />} />
              <Route path={FILESUMMARY_PATH} element={<FileSummary />} />
              <Route path={VIEWData_PATH} element={<ViewExcelInfo />} />
            </Route>
          </Routes>
        </Layout>
      </BrowserRouter>
    </Suspense>
  );
};

export default AppRoute;
