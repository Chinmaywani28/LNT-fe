import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import backgroundImage from "../config/images/BG1.png";
import { Route, Routes } from "react-router-dom";
import Navbar from "../navbar/navbar";
import ComponentOne from "../Energy/components/componentOne";
import PersistentDrawerLeft from "./homeSidebar";
import HomePageSYD from "./homePageSYD";
import { useEnergyData } from "../context/sankeyEnergyDataContext";

const obj = {
  tempM: { meter_reading: [1, 2, 3, 5, 4], timestamp: [5, 10, 15, 20, 25], gadget_type: 'intermidiateTemp', gadget_name: 'Temperature', meter_name: 'Garden', node_location_jp: 'Wing A,Admin Building', min_temp: 1, max_temp: 2, critical_temp: 3, status :1 },
  humM: { meter_reading: [1, 2, 3, 5, 4], timestamp: [5, 10, 15, 20, 25], gadget_type: 'intermidiateHumidity', gadget_name: 'Humidity', meter_name: 'Garden', node_location_jp: 'Wing A,Admin Building', min_humidity: 1, max_humidity: 2, critical_humidity: 3, status :1 },
  enM: { meter_reading: [1, 2, 3, 5, 4], timestamp: [5, 10, 15, 20, 25], gadget_type: 'intermidiateEnergy', gadget_name: 'Energy', meter_name: 'Garden', node_location_jp: 'Wing A,Admin Building', min_energy: 1, max_energy: 2, critical_energy: 3, status :1 },
  co: { meter_reading: [1, 2, 1.5, 3, 5], timestamp: [5, 10, 15, 20, 25], gadget_type: 'basicCO', gadget_name: 'Carbon Monoxide (CO)', meter_name: 'Garden', node_location_jp: 'Wing A,Admin Building', min_co: 1, max_co: 2, critical_co: 3, status :1 },
  coM: { meter_reading: [1, 2, 1.5, 3, 5], timestamp: [5, 10, 15, 20, 25], gadget_type: 'intermidiateCO', gadget_name: 'Carbon Monoxide (CO)', meter_name: 'Garden', node_location_jp: 'Wing A,Admin Building', min_co: 1, max_co: 2, critical_co: 3, status :1 },
  co2: { meter_reading: [1, 2, 3, 5, 1.5], timestamp: [5, 10, 15, 20, 25], gadget_type: 'basicCO2', gadget_name: 'Carbon Dioxide (CO2)', meter_name: 'Garden', node_location_jp: 'Wing A,Admin Building', min_co2: 1, max_co2: 2, critical_co2: 3, status :1 },
  co2M: { meter_reading: [1, 2, 3, 5, 4], timestamp: [5, 10, 15, 20, 25], gadget_type: 'intermidiateCO2', gadget_name: 'Carbon Dioxide (CO2)', meter_name: 'Garden', node_location_jp: 'Wing A,Admin Building', min_co2: 1, max_co2: 2, critical_co2: 3, status :1 },
  pressure: { meter_reading: [1, 2, 3, 4, 70], timestamp: [5, 10, 15, 20, 25], gadget_type: 'basicPressure', gadget_name: 'Pressure', meter_name: 'Garden', node_location_jp: 'Wing A,Admin Building', min_pressure: 1, max_pressure: 70, critical_pressure: 80 },
  pressureM: { meter_reading: [1, 2, 3, 4, 2], timestamp: [5, 10, 15, 20, 25], gadget_type: 'intermidiatePressure', gadget_name: 'Pressure', meter_name: 'Garden', node_location_jp: 'Wing A,Admin Building', min_pressure: 1, max_pressure: 2, critical_pressure: 3 },
  vibration: { meter_reading: [1, 2, 3, 3.5, 2], timestamp: [5, 10, 15, 20, 25], gadget_type: 'basicVibration', gadget_name: 'Vibration', meter_name: 'Garden', node_location_jp: 'Wing A,Admin Building', min_vibration: 1, max_vibration: 2, critical_vibration: 3, status : 1 },
  vibrationM: { meter_reading: [1, 2, 3, 3.5, 2], timestamp: [5, 10, 15, 20, 25], gadget_type: 'intermidiateVibration', gadget_name: 'Vibration', meter_name: 'Garden', node_location_jp: 'Wing A,Admin Building', min_vibration: 1, max_vibration: 2, critical_vibration: 3, status : 1 },
  lux: { meter_reading: [1, 2, 3, 3.5, 4], timestamp: [5, 10, 15, 20, 25], gadget_type: 'basicLux', gadget_name: 'LUX Level', meter_name: 'Garden', node_location_jp: 'Wing A,Admin Building', min_lux: 1, max_lux: 2, critical_lux: 3 },
  luxM: { meter_reading: [1, 2, 3, 3.5, 4], timestamp: [5, 10, 15, 20, 25], gadget_type: 'intermidiateLux', gadget_name: 'LUX Level', meter_name: 'Garden', node_location_jp: 'Wing A,Admin Building', min_lux: 1, max_lux: 2, critical_lux: 3 },
  noise: { meter_reading: [1, 2, 3, 2, 2.5], timestamp: [5, 10, 15, 20, 25], gadget_type: 'basicNoise', gadget_name: 'Noise', meter_name: 'Garden', node_location_jp: 'Wing A,Admin Building', min_noise: 1, max_noise: 2, critical_noise: 3, status : 1 },
  noiseM: { meter_reading: [1, 2, 3, 2, 2.5], timestamp: [5, 10, 15, 20, 25], gadget_type: 'intermidiateNoise', gadget_name: 'Noise', meter_name: 'Garden', node_location_jp: 'Wing A,Admin Building', min_noise: 1, max_noise: 2, critical_noise: 3,status : 1 },
  valve: { meter_reading: [1, 2, 3, 4, 50], timestamp: [5, 10, 15, 20, 25], gadget_type: 'basicValve', gadget_name: 'Valve Position', meter_name: 'Garden', node_location_jp: 'Wing A,Admin Building', min_valve: 1, max_valve: 70, critical_valve: 80 },
  valveM: { meter_reading: [1, 2, 3, 4, 50], timestamp: [5, 10, 15, 20, 25], gadget_type: 'intermidiateValve', gadget_name: 'Valve Position', meter_name: 'Garden', node_location_jp: 'Wing A,Admin Building', min_valve: 1, max_valve: 70, critical_valve: 80 },
  flow: { meter_reading: [1, 2, 3, 4, 50], timestamp: [5, 10, 15, 20, 25], gadget_type: 'basicFlow', gadget_name: 'Flow', meter_name: 'Garden', node_location_jp: 'Wing A,Admin Building', min_flow: 1, max_flow: 70, critical_flow: 80, status: 1 },
  flowM: { meter_reading: [1, 2, 3, 4, 50], timestamp: [5, 10, 15, 20, 25], gadget_type: 'intermidiateFlow', gadget_name: 'Flow', meter_name: 'Garden', node_location_jp: 'Wing A,Admin Building', min_flow: 1, max_flow: 70, critical_flow: 80, status: 1 },
  heat: { meter_reading: [1, 2, 3, 4, 50], timestamp: [5, 10, 15, 20, 25], gadget_type: 'basicHeat', gadget_name: 'Heat', meter_name: 'Garden', node_location_jp: 'Wing A,Admin Building', min_heat: 1, max_heat: 70, critical_heat: 80, status: 1 },
  heatM: { meter_reading: [1, 2, 3, 4, 75], timestamp: [5, 10, 15, 20, 25], gadget_type: 'intermidiateHeat', gadget_name: 'Heat', meter_name: 'Garden', node_location_jp: 'Wing A,Admin Building', min_heat: 1, max_heat: 70, critical_heat: 80, status: 1 },
  alarm: { meter_reading: ['NML', 'NML'], timestamp: [5, 10, 15, 20, 25], gadget_type: 'basicAlarm', gadget_name: 'Alarm', meter_name: 'Garden', node_location_jp: 'Wing A,Admin Building', min_alarm: 1, max_alarm: 70, critical_alarm: 80, status: 1 },
  status: { meter_reading: ['ON', 'ON'], timestamp: [5, 10, 15, 20, 25], gadget_type: 'basicSensor', gadget_name: 'Sensor Status', meter_name: 'Garden', node_location_jp: 'Wing A,Admin Building', min_stat: 1, max_stat: 70, critical_stat: 80, status: 1 },
  current: { meter_reading: [1, 2, 3, 4, 65], timestamp: [5, 10, 15, 20, 25], gadget_type: 'basicCurrent', gadget_name: 'Current', meter_name: 'Garden', node_location_jp: 'Wing A,Admin Building', min_current: 1, max_current: 70, critical_current: 80, status: 1 },
  currentM: { meter_reading: [1, 2, 3, 4, 65], timestamp: [5, 10, 15, 20, 25], gadget_type: 'intermidiateCurrent', gadget_name: 'Current', meter_name: 'Garden', node_location_jp: 'Wing A,Admin Building', min_current: 1, max_current: 70, critical_current: 80, status: 1 },
  partcle: { meter_reading: [1, 2, 3, 4, 55], timestamp: [5, 10, 15, 20, 25], gadget_type: 'basicParticle', gadget_name: 'Particle', meter_name: 'Garden', node_location_jp: 'Wing A,Admin Building', min_particle: 1, max_particle: 70, critical_particle: 80, status: 1 },
  partcleM: { meter_reading: [1, 2, 3, 4, 55], timestamp: [5, 10, 15, 20, 25], gadget_type: 'intermidiateParticle', gadget_name: 'Particle', meter_name: 'Garden', node_location_jp: 'Wing A,Admin Building', min_particle: 1, max_particle: 70, critical_particle: 80, status: 1 },
  check: { meter_reading: [1, 2, 3, 4, 55], timestamp: [5, 10, 15, 20, 25], gadget_type: 'basicCheck', gadget_name: 'Check In/Out', meter_name: 'Garden', node_location_jp: 'Wing A,Admin Building', min_check: 1, max_check: 70, critical_check: 80, status: 1 },
  checkM: { meter_reading: [1, 2, 3, 4, 55], timestamp: [5, 10, 15, 20, 25], gadget_type: 'intermidiateCheck', gadget_name: 'Check In/Out', meter_name: 'Garden', node_location_jp: 'Wing A,Admin Building', min_check: 1, max_check: 70, critical_check: 80, status: 1 },
}

function Home({ Monthlydata_Gen, Monthlydata_Consume, floor1, floor2, floor3 }) {
  const [component, setComponent] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const [floorKey, setFloorKey] = useState(null);
  const [imageKey,setImageKey] = useState(null);

  const [isBoxVisible, setIsBoxVisible] = useState(false);
  

  const toggleBoxVisibility = () => {
    setIsBoxVisible(prevState => !prevState);
  };

  const handleOpen = (val) => {
    setOpen(val);
  };

  const handleNodeClickValue = (value) => {
    setComponent(value)
  }

  const handleMenuClick = (item, value, node) => {    
    console.log(node);
    setSelectedMenuItem(item);
    setComponent(value);
    setFloorKey(node?.parent);
    setImageKey(node?.label);
  };

  useEffect(() => {

  }, [selectedMenuItem])

  return (
    <div
      style={{
        // backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "100vw",
        height: "100vh",
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
        boxShadow: 'none'
      }}
    >
      <Box>
        <PersistentDrawerLeft open={open} component={component} handleOpen={handleOpen} handleMenuClick={handleMenuClick} handleNodeClickValue={handleNodeClickValue} />
        <Box
          sx={{
            marginTop: "20px",
            position: "relative",
            marginLeft: open ? "300px" : "0px",
            width: open ? "calc(100% - 300px)" : "100%",
            transition: "margin-left 0.3s, width 0.3s",
          }}
        >
          <Navbar openDrawer={open} handleOpen={handleOpen} selectedMenuItem={selectedMenuItem} component={component} toggleBoxVisibility={toggleBoxVisibility} isBoxVisible={isBoxVisible} floorKey={floorKey} />
          <Routes>
            <Route path="/" element={<HomePageSYD />} />
            <Route path="componentOne" element={<ComponentOne componentMap={component} isBoxVisible={isBoxVisible} toggleBoxVisibility={toggleBoxVisibility} floorKey={floorKey} imageKey={imageKey} openSidebar={open} />} />
          </Routes>
        </Box>
      </Box>
    </div>
  );
}

export default Home;
