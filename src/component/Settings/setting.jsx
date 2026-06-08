import React, { useState } from "react";
import { Box } from "@mui/material";
import PersistentDrawerLeft from "../Sidebar/sidebar";
import { Route, Routes } from "react-router-dom";
import GatewayHome from "../Devices/devices";
import NodeDiagram from "../gateflow";
import EditGateway from '../gateway/editGateway'
import Security from "../Security/security";
import RoomManager from "../RoomManagerTree/roomManager";

const Setting = ({ gatewayInfo, nodeInfo, sydNodes, kokoNodes, sydGateway, kokoGateway, loading, error }) => {
  const role = sessionStorage.getItem('role')
  const [item, setItem] = useState('');
  const handleSettings = (set) => {

  };

  const handleDrawerItem = (itemMenu) => {
    setItem(itemMenu)
  }

  return (
    <Box>
      <PersistentDrawerLeft isOpen={true} />
      <Box sx={{ marginLeft: "280px" }}>
        <Routes>
          <Route path="devices/editGateway" element={<EditGateway />} />
          <Route path="devices" element={<GatewayHome handleSettings={handleSettings} gatewayInfo={gatewayInfo}
            nodeInfo={nodeInfo}
            sydNodes={sydNodes}
            kokoNodes={kokoNodes}
            sydGateway={sydGateway}
            kokoGateway={kokoGateway}
            loading={loading}
            error={error} />} />
          <Route path="addcustomlocation" element={<RoomManager />} />
          {role === 'ADMIN' ? <Route path="security" element={<Security />} /> : null}
        </Routes>
      </Box>
    </Box>
  );
};

export default Setting;
