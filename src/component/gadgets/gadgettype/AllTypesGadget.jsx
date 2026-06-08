import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Box,
  IconButton,
  FormControl,
  Select,
  MenuItem,
  OutlinedInput,
  InputLabel,
  Menu
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { chartsObj } from "../../config/chartsConfigObj";
import { addGraphConfig } from "../../Services/graph.service";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import {
  tempIntData, tempBaseData, enBasicData, enIntData, powBasicData, powIntData, humBasicData, humIntData, noiseBasicData, noiseIntData,
  pressBasicData, pressIntData, coBasicData, coIntData, co2BasicData, co2IntData, luxBasicData, luxIntData, vibBasicData, vibIntData, check, checkM, partcle, partcleM,
  current, currentM, flow, flowM, alarm, status, heat, heatM, valve, valveM,
  discomfort,
  discomfortM,
  no2,
  no2M,
  gas,
  gasM
} from '../../config/cardsConfigData'
import { getAllFloors } from "../../Services/nodeService";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const AllTypeGadget = ({ open, handleClose, typeGraph, allMeters, componentType }) => {
  const [chartType, setChartType] = useState("");
  const [chart, setChart] = useState();
  const [sizeSelected, setSizeSelected] = useState('1x');
  const [chartWidth, setChartWidth] = useState(450);
  const [chartHeight, setChartHeight] = useState(450);
  const [selectedMeter, setSelectedMeter] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');
  const [timePeriod, setTimePeriod] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const openSite = Boolean(anchorEl);
  const [site, setSite] = useState(null);
  const [floors, setFloors] = useState(null);
  const [selectedFloor, setSelectedFloor] = useState(null);
  const [filterMeters, setFilterMeters] = useState(null);

  const fetchAllFloors = async () => {
    try {
      const resp = await getAllFloors();
      setFloors(resp);
    } catch (error) {
      console.error(error);
    }
  }

  const handleAddToDashboard = async () => {
    try {
      const completeGadget = {
        userId: sessionStorage.getItem('userId'),
        gadgetType: typeGraph,
        chartType: chartType,
        meter: selectedMeter.node_mac,
        // chartHeight: chartHeight,
        // chartWidth: chartWidth,
        componentType: componentType,
        timePeriod: timePeriod,
      }
      if (!completeGadget.gadgetType || !completeGadget.chartType || !completeGadget.meter || !completeGadget.timePeriod) {
        setError(true)
        setMessage('All Field Needs to be select');
        setOpenSnackbar(true);
        return
      }
      const response = await addGraphConfig(completeGadget);
      setSuccess(!!response);
      setError(!response);
      setMessage(response?.message || "An error occurred");
      setOpenSnackbar(true);
      handleClose();
    } catch (error) {
      console.error('Error in handleAddToDashboard', error);
    }
  };

  const handleCloseSnack = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbar(false);
  };

  const handleChartTypeChange = (type) => {
    setChartType(type);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSiteClose = () => {
    setAnchorEl(null);
  };

  const filterNodeBySite = (site) => {
    setSite(site);
    handleSiteClose();
  };

  const filterNodeByFloor = (site) => {
    setSelectedFloor(site);
    handleSiteClose();
  };

  const styles = {
    thinBorder: {
      border: "0.5px solid #E5E7EB",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.05)",
      backgroundColor: "white",
    },
  };

  const renderChart = () => {
    let newChart = null;

    switch (chartType) {
      case "basicEnergy":
        newChart = chartsObj.find((chart) => chart.chartId === 'basicEnergy')?.render({ Data: enBasicData });
        break;

      case "intermidiateEnergy":
        newChart = chartsObj.find((chart) => chart.chartId === 'intermidiateEnergy')?.render({ Data: enIntData });
        break;

      case "basicPower":
        newChart = chartsObj.find((chart) => chart.chartId === 'basicPower')?.render({ Data: powBasicData });
        break;

      case "intermidiatePower":
        newChart = chartsObj.find((chart) => chart.chartId === 'intermidiatePower')?.render({ Data: powIntData });
        break;

      case "basicTemp":
        newChart = chartsObj.find((chart) => chart.chartId === 'basicTemp')?.render({ Data: tempBaseData });
        break;

      case "intermidiateTemp":
        newChart = chartsObj.find((chart) => chart.chartId === 'intermidiateTemp')?.render({ Data: tempIntData });
        break;

      case "basicHumidity":
        newChart = chartsObj.find((chart) => chart.chartId === 'basicHumidity')?.render({ Data: humBasicData });
        break;

      case "intermidiateHumidity":
        newChart = chartsObj.find((chart) => chart.chartId === 'intermidiateHumidity')?.render({ Data: humIntData });
        break;

      case "basicPressure":
        newChart = chartsObj.find((chart) => chart.chartId === 'basicPressure')?.render({ Data: pressBasicData });
        break;

      case "basicPressureMeter":
        newChart = chartsObj.find((chart) => chart.chartId === 'basicPressureMeter')?.render({ Data: pressBasicData });
        break;

      case "intermidiatePressure":
        newChart = chartsObj.find((chart) => chart.chartId === 'intermidiatePressure')?.render({ Data: pressIntData });
        break;

      case "basicCO":
        newChart = chartsObj.find((chart) => chart.chartId === 'basicCO')?.render({ Data: coBasicData });
        break;

      case "intermidiateCO":
        newChart = chartsObj.find((chart) => chart.chartId === 'intermidiateCO')?.render({ Data: coIntData });
        break;

      case "basicCO2":
        newChart = chartsObj.find((chart) => chart.chartId === 'basicCO2')?.render({ Data: co2BasicData });
        break;

      case "intermidiateCO2":
        newChart = chartsObj.find((chart) => chart.chartId === 'intermidiateCO2')?.render({ Data: co2IntData });
        break;

      case "basicLux":
        newChart = chartsObj.find((chart) => chart.chartId === 'basicLux')?.render({ Data: luxBasicData });
        break;

      case "intermidiateLux":
        newChart = chartsObj.find((chart) => chart.chartId === 'intermidiateLux')?.render({ Data: luxIntData });
        break;

      case "basicNoise":
        newChart = chartsObj.find((chart) => chart.chartId === 'basicNoise')?.render({ Data: noiseBasicData });
        break;

      case "intermidiateNoise":
        newChart = chartsObj.find((chart) => chart.chartId === 'intermidiateNoise')?.render({ Data: noiseIntData });
        break;

      case "basicVibration":
        newChart = chartsObj.find((chart) => chart.chartId === 'basicVibration')?.render({ Data: vibBasicData });
        break;

      case "intermidiateVibration":
        newChart = chartsObj.find((chart) => chart.chartId === 'intermidiateVibration')?.render({ Data: vibIntData });
        break;


      case "basicValve":
        newChart = chartsObj.find((chart) => chart.chartId === 'basicValve')?.render({ Data: valve });
        break;

      case "intermidiateValve":
        newChart = chartsObj.find((chart) => chart.chartId === 'intermidiateValve')?.render({ Data: valveM });
        break;

      case "basicCheck":
        newChart = chartsObj.find((chart) => chart.chartId === 'basicCheck')?.render({ Data: check });
        break;

      case "intermidiateCheck":
        newChart = chartsObj.find((chart) => chart.chartId === 'intermidiateCheck')?.render({ Data: checkM });
        break;

      case "basicParticle":
        newChart = chartsObj.find((chart) => chart.chartId === 'basicParticle')?.render({ Data: partcle });
        break;

      case "intermidiateParticle":
        newChart = chartsObj.find((chart) => chart.chartId === 'intermidiateParticle')?.render({ Data: partcleM });
        break;

      case "basicCurrent":
        newChart = chartsObj.find((chart) => chart.chartId === 'basicCurrent')?.render({ Data: current });
        break;

      case "intermidiateCurrent":
        newChart = chartsObj.find((chart) => chart.chartId === 'intermidiateCurrent')?.render({ Data: currentM });
        break;

      case "basicFlow":
        newChart = chartsObj.find((chart) => chart.chartId === 'basicFlow')?.render({ Data: flow });
        break;

      case "intermidiateFlow":
        newChart = chartsObj.find((chart) => chart.chartId === 'intermidiateFlow')?.render({ Data: flowM });
        break;

      case "basicSensor":
        newChart = chartsObj.find((chart) => chart.chartId === 'basicSensor')?.render({ Data: status });
        break;

      case "basicAlarm":
        newChart = chartsObj.find((chart) => chart.chartId === 'basicAlarm')?.render({ Data: alarm });
        break;

      case "basicHeat":
        newChart = chartsObj.find((chart) => chart.chartId === 'basicHeat')?.render({ Data: heat });
        break;

      case "intermidiateHeat":
        newChart = chartsObj.find((chart) => chart.chartId === 'intermidiateHeat')?.render({ Data: heatM });
        break;

      case "basicDiscomfort":
        newChart = chartsObj.find((chart) => chart.chartId === 'basicDiscomfort')?.render({ Data: discomfort });
        break;

      case "intermidiateDiscomfort":
        newChart = chartsObj.find((chart) => chart.chartId === 'intermidiateDiscomfort')?.render({ Data: discomfortM });
        break;

      case "basicNO2":
        newChart = chartsObj.find((chart) => chart.chartId === 'basicNO2')?.render({ Data: no2 });
        break;

      case "intermidiateNO2":
        newChart = chartsObj.find((chart) => chart.chartId === 'intermidiateNO2')?.render({ Data: no2M });
        break;

      case "basicGas":
        newChart = chartsObj.find((chart) => chart.chartId === 'basicGas')?.render({ Data: gas });
        break;

      case "intermidiateGas":
        newChart = chartsObj.find((chart) => chart.chartId === 'intermidiateGas')?.render({ Data: gasM });
        break;

      default:
        // console.warn("Unknown chart type:", chartType);
        break;
    }

    return {
      chart: newChart,
      type: chartType,
    };
  };

  useEffect(() => {
    fetchAllFloors();
  }, [])

  useEffect(() => {
    if (!site && !selectedFloor) return;
    try {
      let data = allMeters;

      if (site !== 'All') {
        data = data?.filter((node) => node?.site === site);
      }

      if (selectedFloor) {
        data = data?.filter((node) => node?.floor === selectedFloor);
      }

      setFilterMeters(data || []);
    } catch (err) {
      console.error("Error filtering gateways:", err);
      setError("Failed to filter gateways");
      setOpenSnackbar(true);
    }
  }, [site, allMeters, selectedFloor]);

  return (
    <Box>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnack} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} sx={{ margin: 'auto' }}>
        <Alert
          severity={success ? "success" : "error"}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      </Snackbar>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="xl"
        fullWidth
        sx={{
          "& .MuiPaper-root": {
            borderRadius: "16px",
            padding: "50px",
            bgcolor: "#F1F3F3",
            height: "auto",
            width: "90%",
          },
        }}
        BackdropProps={{
          style: {
            backdropFilter: 'blur(10px)',
          },
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <DialogTitle>{typeGraph.toUpperCase()} GADGET</DialogTitle>
          <IconButton
            onClick={handleClose}
            color="inherit"
            sx={{
              marginRight: "50px",
              "&:hover": { opacity: 1, background: "transparent" },
            }}
          >
            <ClearIcon />
          </IconButton>
        </Box>
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "20px",
            }}
          >
            {chartsObj
              .filter((chart) => chart.type.includes(typeGraph))
              .map((chart, index) => (
                <Button
                  key={index}
                  onClick={() => handleChartTypeChange(chart.chartId)}
                  sx={{
                    border: styles.thinBorder,
                    color: chartType === chart.chartId ? "white" : "black",
                    background: chartType === chart.chartId ? "#446FF2" : "",
                  }}
                >
                  {chart.chartName}
                </Button>
              ))}
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', marginTop: '20px' }}>
            <FormControl fullWidth sx={{
              maxWidth: 200,
              '& .MuiOutlinedInput-root': {
                borderRadius: '10px',
              },
            }}>
              <InputLabel htmlFor="select-building">Select Building</InputLabel>
              <Select
                input={<OutlinedInput label="Select Building" />}
                value={site || ''}
                onChange={(event) => filterNodeBySite(event.target.value)}
                variant="outlined"
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="TC-4">TC-4</MenuItem>
                <MenuItem value="TC-5">TC-5</MenuItem>
              </Select>
            </FormControl>
            <FormControl
              fullWidth
              sx={{
                maxWidth: 200,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '10px',
                },
              }}
            >
              <InputLabel htmlFor="select-floor">Select Floor</InputLabel>
              <Select
                input={<OutlinedInput label="Select Floor" />}
                value={selectedFloor || ''}
                onChange={(event) => filterNodeByFloor(event.target.value)}
                variant="outlined"
              >
                {floors?.map((floor) => (
                  <MenuItem key={floor} value={floor}>
                    {floor}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{
              maxWidth: 200,
              '& .MuiOutlinedInput-root': {
                borderRadius: '10px',
              },
            }}>
              <InputLabel htmlFor="select-meter">Select Meter</InputLabel>
              <Select
                input={<OutlinedInput label="Select Meter" />}
                defaultValue="Select Meter"
                value={selectedMeter || ''}
                onChange={(e) => setSelectedMeter(e.target.value)}
              >
                {filterMeters?.map((meter, index) => (
                  <MenuItem key={index} value={meter}>
                    {meter.meter_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{
              maxWidth: 200,
              '& .MuiOutlinedInput-root': {
                borderRadius: '10px',
              },
            }}>
              <InputLabel htmlFor="firm-status">Select Time Period</InputLabel>
              <Select
                input={<OutlinedInput label="Select Time Period" />}
                defaultValue="Select Time Period"
                value={timePeriod || ''}
                onChange={(e) => setTimePeriod(e.target.value)}
              >
                {/* {typeGraph !== 'energy' ? <MenuItem value={'live'}>Live</MenuItem> : null
                } */}
                <MenuItem value={'live'}>Live</MenuItem>
                <MenuItem value={'day'}>Day</MenuItem>
                <MenuItem value={'week'}>Week</MenuItem>
                <MenuItem value={'month'}>Month</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              // margin : 'auto',
              paddingTop: "20px",
              width: 'auto',
              height: 'auto',
            }}
          >
            {renderChart().chart}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddToDashboard}
            sx={{ margin: "auto", borderRadius: "10px", bgcolor: "#446FF2" }}
          >
            Add to Dashboard
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AllTypeGadget;
