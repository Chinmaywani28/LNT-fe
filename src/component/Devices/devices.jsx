import React, { useEffect, useState } from "react";
import { Box, Button, Divider, TextField } from "@mui/material";
import ToggleButtonComponent from "./toggleButton";
import AllGateways from "./allGateways";
import AllNodes from "./allNodes";
import { getGatewayInfo } from "../Services/gatewayService";
import { getNodeInfo } from "../Services/nodeService";
import ClearIcon from "@mui/icons-material/Clear";
import { useNavigate } from "react-router-dom";
import { useNodeData } from "../context/nodeContext";

const GatewayHome = ({ handleSettings,gatewayInfo,nodeInfo,sydNodes,kokoNodes,sydGateway,kokoGateway,loading,error }) => {
  const [value, setValue] = useState("gateway");
  const navigate = useNavigate();


  const fetchNodesConnectedTOGateway = (gateway_mac) => {
    const connectedNodes = nodeInfo?.filter(
      (element) => element.assigned_gateway === gateway_mac
    );
    return connectedNodes;
  };

  const fetchSingleNode = (node_mac) => {
    const singleNode = nodeInfo?.filter((element) => element.node_mac === node_mac);
    return singleNode;
  };

  const fetchSingleGateway = (gateway_mac) => {
    const singleGateway = gatewayInfo?.filter(
      (element) => element.gateway_mac === gateway_mac
    );
    return singleGateway;
  };

  const handleFilterGateway = (status) => {
    const filtered = gatewayInfo?.filter((gateway) => gateway.status === status);
    return filtered;
  };

  const handleFilterNode = (status) => {
    const filtered = nodeInfo?.filter((node) => node.status === status);
    return filtered;
  };

  // useEffect(() => {
  //   fetchGatewayInfo();
  //   fetchNodeInfo();
  // }, []);

  const styles = {
    thinBorder: {
      border: "0.5px solid #E5E7EB",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.05)",
      backgroundColor: "white",
    },
  };

  const handleCloseSettings = () => {
    handleSettings(false);
    navigate("/home");
  };

  const handleValue = (val) => {
    setValue(val);
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          gap: '10px',
          top: 0,
          width: "100%",
          marginTop: -10,
        }}
      >
        <Box >
          <ToggleButtonComponent handleValue={handleValue} />
        </Box>
        <Button
          variant="contained"
          color="inherit"
          onClick={handleCloseSettings}
          sx={{ background: "#FFFFFF", border: styles.thinBorder, marginRight: "30px" }}
        >
          <ClearIcon sx={{ transform: "rotate(90deg)" }} />
        </Button>
      </Box>
      <Divider sx={{ marginTop: "20px", marginLeft: "-40px" }} />
      {value === "gateway" ? (
        <AllGateways
          allGateways={gatewayInfo}
          fetchNodesConnectedTOGateway={fetchNodesConnectedTOGateway}
          fetchSingleNode={fetchSingleNode}
          fetchSingleGateway={fetchSingleGateway}
          handleFilterGateway={handleFilterGateway}
          errorMessage={error}
          sydGateway={sydGateway}
          kokoGateway={kokoGateway}
        />
      ) : (
        <AllNodes
          allNodes={nodeInfo}
          fetchSingleNode={fetchSingleNode}
          handleFilterNode={handleFilterNode}
          errorMessage={error}
          sydNodes={sydNodes}
          kokoNodes={kokoNodes}
        />
      )}
    </div>
  );
};

export default GatewayHome;

