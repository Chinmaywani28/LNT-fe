// // src/index.js
// import React from "react";
// import ReactDOM from "react-dom";
// import App from "./App";
// import { ThemeContextProvider } from "./component/context/themeContext";
// import { EnergyMainMeterdataProvide } from "./component/context/energyMainmetercontext";
// import { EnergyDataProvider } from "./component/context/sankeyEnergyDataContext";
// import { AuthProvider } from "./component/context/authContext";
// import { BrowserRouter, Route, Routes } from "react-router-dom";

// ReactDOM.render(
//   <BrowserRouter>
//   <ThemeContextProvider>
//     <EnergyMainMeterdataProvide>
//       <EnergyDataProvider>
//         <AuthProvider>
//           <App />
//         </AuthProvider>
//       </EnergyDataProvider>
//     </EnergyMainMeterdataProvide>
//   </ThemeContextProvider>
//   </BrowserRouter>,
//   document.getElementById("root")
// );

// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeContextProvider } from "./component/context/themeContext";
import { EnergyMainMeterdataProvide } from "./component/context/energyMainmetercontext";
import { EnergyDataProvider } from "./component/context/sankeyEnergyDataContext";
import { AuthProvider } from "./component/context/authContext";
import { BrowserRouter } from "react-router-dom";
import { NodeDataProvider } from "./component/context/nodeContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeContextProvider>
        <EnergyMainMeterdataProvide>
          <EnergyDataProvider>
            <NodeDataProvider>
              <AuthProvider>
                <App />
              </AuthProvider>
            </NodeDataProvider>
          </EnergyDataProvider>
        </EnergyMainMeterdataProvide>
      </ThemeContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
