import { Box, Link, Typography } from "@mui/material";
import React, { useState } from "react";
import { FiCpu } from "react-icons/fi";
import { GrLocation } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import EditGateway from "./editGateway";

const Detailgateway = ({ data }) => {
  const navigate = useNavigate();
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const info = {
    outputModel: "MQTT",
    brokerHost: "10.1.1.177",
    port: "1883",
    clientId: "Client ID",
    userName: "mqtt_user_iiot",
    subscribeTopic: "my/ltroom",
    publishTopic: "XYZ",
    password: "********",
  };

  return (
    <Box
      sx={{
        position: "relative",
        bgcolor: "#F7F7F7",
        borderRadius: "10px",
        flexWrap: "wrap",
        marginRight: 4,
        padding: "40px",
        height: "750px",
      }}
    >
      <Box>
        <Typography variant="h4" fontWeight="bold" textAlign="center">
          {data[0]?.gateway_name?.toUpperCase()}
        </Typography>
        <Typography variant="h6" sx={{ color: "grey" }} textAlign="center">
          {data[0]?.gateway_mac}
        </Typography>
      </Box>
      <Box sx={{ marginTop: 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            bottom: 5, 
            left: 16, 
            zIndex: 1,
            paddingBottom: 2,
          }}
        >
          <GrLocation fontSize={20} />
          <Typography marginLeft="20px" fontWeight="bold">
            {data[0]?.location}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            bottom: 5,
            left: 16,
            zIndex: 1,
            paddingBottom: 2,
          }}
        >
          <FiCpu fontSize={20} />
          <Typography marginLeft="20px" fontWeight="bold">
            {data[0]?.assigned_node} Connected node
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 1,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 2,
        }}
      >
        {Object.entries(info).map(([key, value]) => (
          <Box key={key} sx={{ padding: 1, marginLeft: 4 }}>
            <Typography variant="subtitle1" gutterBottom>
              {key}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              {value}
            </Typography>
          </Box>
        ))}
      </Box>
      <EditGateway info={info} open={isDialogOpen} onClose={handleDialogClose}/>
    </Box>
  );
};

export default Detailgateway;
