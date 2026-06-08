import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import nodeInfo from "../config/nodeInfoJson";
import Infocard from "../card/infcard";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { getNodeParameter } from "../Services/nodeService";
import { useFitText } from "../config/fontResizeConfig";

const NodeInfo = ({ data, handleIsClickedNode, handleEditInfo }) => {
  const [node, setNode] = useState({});
  const userRole = sessionStorage.getItem("role");
  const { ref } = useFitText();
  const handleClick = () => {
    handleIsClickedNode(false);
  };

  const handleEditClick = () => {
    handleEditInfo(true);
  };

  const fetchParameter = async () => {
    try {
      const resp = await getNodeParameter(data[0].node_mac);
      setNode(resp[0]);
    } catch (error) {
      console.error(error);
    }
  };

  const filterSpecifications = (type, value) => {

    const ignoreKeys = ['timestamp', 'id', 'name_of_table', 'meter_name'];
    if (value !== null) {

      switch (type) { 
        case 'energy_watt_hr' || 'power_watt' || 'current_a':
          return Object.entries(node).filter(([key, value]) =>
            !ignoreKeys.includes(key) &&
            ['type', 'interval_data', 'energy_watt_hr', 'power_watt', 'current_a', 'min_energy', 'max_energy', 'critical_energy', 'min_power', 'max_power', 'critical_power', 'pf', 'voltage'].includes(key)
          );

        case 'temperature_c' || 'humidity_g_m3':
          return Object.entries(node).filter(([key, value]) =>
            !ignoreKeys.includes(key) &&
            ['type', 'interval_data', 'temperature_c', 'humidity_g_m3', 'min_temp', 'max_temp', 'critical_temp', 'min_humidity', 'max_humidity', 'critical_humidity'].includes(key)
          );

        case 'pressure_p':
          return Object.entries(node).filter(([key, value]) =>
            !ignoreKeys.includes(key) &&
            ['type', 'interval_data', 'pressure_p', 'min_pressure', 'max_pressure', 'critical_pressure'].includes(key)
          );

        case 'co2_p':
          return Object.entries(node).filter(([key, value]) =>
            !ignoreKeys.includes(key) &&
            ['type', 'interval_data', 'co2_p', 'min_co2', 'max_co2', 'critical_co2'].includes(key)
          );

        case 'co_p':
          return Object.entries(node).filter(([key, value]) =>
            !ignoreKeys.includes(key) &&
            ['type', 'interval_data', 'co_p', 'min_co', 'max_co', 'critical_co'].includes(key)
          );

        case 'lux_l':
          return Object.entries(node).filter(([key, value]) =>
            !ignoreKeys.includes(key) &&
            ['type', 'interval_data', 'lux_l', 'min_lux', 'max_lux', 'critical_lux'].includes(key)
          );

        case 'aud_db':
          return Object.entries(node).filter(([key, value]) =>
            !ignoreKeys.includes(key) &&
            ['type', 'interval_data', 'aud_db', 'min_aud', 'max_aud', 'critical_aud'].includes(key)
          );

        case 'valve_position':
          return Object.entries(node).filter(([key, value]) =>
            !ignoreKeys.includes(key) &&
            ['type', 'interval_data', 'valve_position'].includes(key)
          );

        case 'sensor_status':
          return Object.entries(node).filter(([key, value]) =>
            !ignoreKeys.includes(key) &&
            ['type', 'interval_data', 'sensor_status'].includes(key)
          );

        case 'alarm_status':
          return Object.entries(node).filter(([key, value]) =>
            !ignoreKeys.includes(key) &&
            ['type', 'interval_data', 'alarm_status'].includes(key)
          );

        case 'flow_control':
          return Object.entries(node).filter(([key, value]) =>
            !ignoreKeys.includes(key) &&
            ['type', 'interval_data', 'flow_control', 'min_flow', 'max_flow', 'critical_flow'].includes(key)
          );

        case 'heat_joules':
          return Object.entries(node).filter(([key, value]) =>
            !ignoreKeys.includes(key) &&
            ['type', 'interval_data', 'heat_joules', 'min_heat', 'max_heat', 'critical_heat'].includes(key)
          );
        default:
          break;
      }
    }
  };

  useEffect(() => {
    fetchParameter();
  }, [data]);

  return (
    <Box sx={{ display: "flex" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          width: "80%",
        }}
      >
        <Box>
          <Button
            sx={{
              color: "#464AA6",
              marginLeft: -1,
              height: "0px",
              marginTop: "65px",
              cursor: "pointer",
              "&:hover": {
                opacity: 1,
                backgroundColor: "transparent",
              },
            }}
            color="inherit"
            variant="inherit"
            size="small"
            onClick={handleClick}
          >
            <ArrowBackIcon
              sx={{ marginRight: "10px", fontSize: "25px" }}
            />
            <Typography fontWeight="bold">
              All nodes</Typography>
          </Button>
        </Box>
        <Box></Box>
        <Box sx={{ marginTop: 4, marginBottom: 5 }}>
          <Typography variant="h5" fontWeight="bold">
            {data?.location}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Typography marginBottom={3} color={"lightgray"}>
            DEVICE INFORMATION
          </Typography>
          <Box
            ref={ref}
            sx={{
              display: "flex",
              flexWrap: "wrap",
              columnGap: "40px",
              rowGap: "5px",
              maxWidth: "100%",
            }}
          >
            {Object.entries(data[0]).map(([key, value]) => (key !== "node_id" && key !== 'row_num' &&
              <Infocard
                key={key}
                data={{ heading: key, value: value ? value : "NA" }}
              />
            ))}
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Typography marginBottom={3} color={"lightgray"}>
            SPECIFICATION
          </Typography>
          <Box
            ref={ref}
            sx={{
              display: "flex",
              flexWrap: "wrap",
              columnGap: "40px",
              rowGap: "5px",
              maxWidth: "100%",
            }}
          >
            {Object.entries(node).map(([key, item]) => {
              const specifications = filterSpecifications(key, item) || [];
              return specifications.map(([specKey, value]) => (
                <Infocard
                  key={specKey}
                  data={{
                    heading: nodeInfo[specKey] || specKey,
                    value: value !== null ? value : "NA",
                  }}
                />
              ));
            })}
          </Box>
        </Box>
        {userRole === "ADMIN" && (
          <Box
            sx={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <Typography marginBottom={3} color={"lightgray"}>
              ACTION
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "10px",
              }}
            >
              <Button variant="contained"
                sx={{ paddingLeft: 3 }}
                onClick={handleEditClick}
              >
                Edit Device Information
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default NodeInfo;
