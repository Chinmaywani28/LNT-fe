import { Alert, Box, Button, Snackbar, TextField, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React, { useEffect, useState } from "react";
import { FormControl } from "@mui/material";
import { getNodeParameter, updateNodeMeterRangeInfo } from "../Services/nodeService";
import nodeInfo from "../config/nodeInfoJson";

const EditNode = ({ data, handleEditInfo }) => {
  const [node, setNode] = useState({});
  const [nodeData, setNodeData] = useState({});
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleEditClick = () => {
    handleEditInfo(false);
  };

  const handleNodeChange = (e) => {
    const { name, value } = e.target;
    setNode((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNodeDataChange = (e) => {
    const { name, value } = e.target;
    setNodeData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateClick = async () => {
    try {
      const resp = await updateNodeMeterRangeInfo(node);
  
      if (resp && resp?.message) {
        setSuccess(true);
        setError(false);
        setMessage(`Node: ${nodeData?.node_name} Range Updated`);
      } else {
        setSuccess(false);
        setError(true);
        setMessage("An error occurred");
      }
    } catch (error) {
      console.error(error);
      setSuccess(false);
      setError(true);
      setMessage(error?.message || "Unexpected error occurred");
    } finally {
      setOpen(true);
    }
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
    if (data && data.length > 0) {
      setNodeData(data[0]);
      fetchParameter();
    }
  }, [data]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          severity={success ? "success" : "error"}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      </Snackbar>
      <Button
        sx={{
          color: "#464AA6",
          marginLeft: "-18px",
          height: "0px",
          width: "220px",
          marginTop: "25px",
          cursor: "pointer",
          "&:hover": {
            opacity: 1,
            backgroundColor: "transparent",
          },
        }}
        color="inherit"
        variant="inherit"
        size="small"
        onClick={handleEditClick}
      >
        <ArrowBackIcon sx={{ marginRight: "20px", fontSize: "25px" }} />
        <Typography fontWeight="bold">Node Name Info</Typography>
      </Button>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          marginTop: "50px",
          gap: "20px",
        }}
      >
        <Typography fontWeight="bold">Device Information</Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignContent: "space-evenly",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          {Object.entries(nodeData).map(([key, value]) => (key !== "node_id" && key !== 'row_num' &&
            <FormControl variant="outlined" sx={{ minWidth: 200 }} key={key}>
              <TextField
                label={key}
                name={key}
                variant="outlined"
                value={value || ""}
                onChange={handleNodeDataChange}
                disabled
              />
            </FormControl>
          ))}
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          marginTop: "50px",
          gap: "20px",
        }}
      >
        <Typography fontWeight="bold">Specification</Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignContent: "space-evenly",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          {Object.entries(node).map(([key, value]) => {
            const specifications = filterSpecifications(key, value) || [];
            return specifications.map(([specKey, value]) => (
              <FormControl variant="outlined" sx={{ minWidth: 200 }} key={specKey}>
                <TextField
                  label={nodeInfo[specKey] || specKey}
                  name={specKey}
                  variant="outlined"
                  value={value || null}
                  onChange={handleNodeChange}
                />
              </FormControl>
            ));
          }
          )}
        </Box>
      </Box>
      <Box sx={{ display: "flex", marginTop: "50px" }}>
        <Button
          variant="contained"
          sx={{ m: 1, width: 200, borderRadius: "5px" }}
          onClick={handleUpdateClick}
        >
          Update Information
        </Button>
        <Button
          variant="outlined"
          sx={{ m: 1, width: 100, borderRadius: "5px" }}
          onClick={handleEditClick}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default EditNode;
