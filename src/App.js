import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./component/Home/home";
import Setting from "./component/Settings/setting";
import GadgetDashboard from "./component/gadgets/gadgetHome";
import { DashboardProvider } from "./component/context/gadgetcontext";
import { BarProvider } from "./component/context/barcontext";
import Login from "./component/Login/login";
import ErrorPage from "./component/Eroor Pages/errorPage";
import Registration from "./component/Registration/registration";
import ProtectedRoute from "./component/pagelayout/protectedRoute";
import ACCESS_LEVELS from "./component/pagelayout/permission.level";
import { useEnergyData } from "./component/context/sankeyEnergyDataContext";
import { Authorization } from "./component/Login/Authorization";
import { useNodeData } from "./component/context/nodeContext";

function App() {
  const { Monthlydata_Gen, Monthlydata_Consume, floor1, floor2, floor3 } =
    useEnergyData();
  const {
    gatewayInfo,
    nodeInfo,
    sydNodes,
    kokoNodes,
    sydGateway,
    kokoGateway,
    loading,
    error,
  } = useNodeData();

  return (
    <div>
      <Authorization />
      {/* <BrowserRouter> */}
      <DashboardProvider>
        <BarProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Registration />} />
            <Route
              path="/home/*"
              element={
                <Home
                  Monthlydata_Gen={Monthlydata_Gen}
                  Monthlydata_Consume={Monthlydata_Consume}
                  floor1={floor1}
                  floor2={floor2}
                  floor3={floor3}
                />
              }
            />
            <Route
              path="/addgadgets"
              element={
                <ProtectedRoute requiredAccessLevel={ACCESS_LEVELS.ADMIN}>
                  <GadgetDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/setting/*"
              element={
                <Setting
                  gatewayInfo={gatewayInfo}
                  nodeInfo={nodeInfo}
                  sydNodes={sydNodes}
                  kokoNodes={kokoNodes}
                  sydGateway={sydGateway}
                  kokoGateway={kokoGateway}
                  loading={loading}
                  error={error}
                />
              }
            />
            <Route path="/error" element={<ErrorPage />} />
          </Routes>
        </BarProvider>
      </DashboardProvider>
      {/* </BrowserRouter> */}
    </div>
  );
}

export default App;
