import React, { useState } from "react";
import { Button, Box } from "@mui/material";

const Gadgetstypes = ({ handleGadgettype }) => {
  const [typeGraph, setGraphtypes] = useState('energy');

  const handleButtonClick = (type) => {
    handleGadgettype(type);

    switch (type) {

      case "energy":
        return setGraphtypes(type);

      case "temperature":
        return setGraphtypes(type);

      case "power":
        return setGraphtypes(type);

      case "humidty":
        return setGraphtypes(type);

      case "pressure":
        return setGraphtypes(type);

      case "co":
        return setGraphtypes(type);

      case "co2":
        return setGraphtypes(type);

      case "lux":
        return setGraphtypes(type);

      case "vibration":
        return setGraphtypes(type);

      case "noise":
        return setGraphtypes(type);

      case "valve":
        return setGraphtypes(type);

      case "check":
        return setGraphtypes(type);

      case "particle":
        return setGraphtypes(type);

      case "current":
        return setGraphtypes(type);

      case "flow":
        return setGraphtypes(type);

      case "sensor":
        return setGraphtypes(type);

      case "alarm":
        return setGraphtypes(type);

      case "heat":
        return setGraphtypes(type);

      case "discomfort":
        return setGraphtypes(type);

      default:
        return setGraphtypes(type);
    }
  };

  const styles = {
    thinBorder: {
      border: "0.5px solid rgba(255, 255, 255, 0.02)",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.02)",
      backgroundColor: "rgba(255, 255, 255, 0.15)",
    },
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        gap: "20px",
        padding: 2,
        flexWrap: 'wrap'
      }}
    >
      <Button
        variant="contained"
        color="inherit"
        sx={{
          fontWeight: "550",
          border: styles.thinBorder,
          borderRadius: 25,
          padding: "10px 20px",
          "&:hover": {
            opacity: 1,
            backgroundColor: "transparent",
          },
          borderWidth: 2,
          borderColor: typeGraph === "energy" ? "#565759" : "",
        }}
        onClick={() => handleButtonClick("energy")}
      >
        Energy
      </Button>
      <Button
        variant="contained"
        color="inherit"
        sx={{
          fontWeight: "550",
          border: styles.thinBorder,
          borderRadius: 25,
          padding: "10px 20px",
          "&:hover": {
            opacity: 1,
            backgroundColor: "transparent",
          },
          borderWidth: 2,
          borderColor: typeGraph === "power" ? "#565759" : "",
        }}
        onClick={() => handleButtonClick("power")}
      >
        Power
      </Button>
      <Button
        variant="contained"
        color="inherit"
        sx={{
          fontWeight: "550",
          border: styles.thinBorder,
          borderRadius: 25,
          padding: "10px 20px",
          "&:hover": {
            opacity: 1,
            backgroundColor: "transparent",
          },
          borderWidth: 2,
          borderColor: typeGraph === "temperature" ? "#565759" : "",
        }}
        onClick={() => handleButtonClick("temperature")}
      >
        Temperature
      </Button>
      <Button
        variant="contained"
        color="inherit"
        sx={{
          fontWeight: "550",
          border: styles.thinBorder,
          borderRadius: 25,
          padding: "10px 20px",
          "&:hover": {
            opacity: 1,
            backgroundColor: "transparent",
          },
          borderWidth: 2,
          borderColor: typeGraph === "humidity" ? "#565759" : "",
        }}
        onClick={() => handleButtonClick("humidity")}
      >
        Humidity
      </Button>
      <Button
        variant="contained"
        color="inherit"
        sx={{
          fontWeight: "550",
          border: styles.thinBorder,
          borderRadius: 25,
          padding: "10px 20px",
          "&:hover": {
            opacity: 1,
            backgroundColor: "transparent",
          },
          borderWidth: 2,
          borderColor: typeGraph === "pressure" ? "#565759" : "",
        }}
        onClick={() => handleButtonClick("pressure")}
      >
        Pressure
      </Button>
      <Button
        variant="contained"
        color="inherit"
        sx={{
          fontWeight: "550",
          border: styles.thinBorder,
          borderRadius: 25,
          padding: "10px 20px",
          "&:hover": {
            opacity: 1,
            backgroundColor: "transparent",
          },
          borderWidth: 2,
          borderColor: typeGraph === "co" ? "#565759" : "",
        }}
        onClick={() => handleButtonClick("co")}
      >
        CO
      </Button>
      <Button
        variant="contained"
        color="inherit"
        sx={{
          fontWeight: "550",
          border: styles.thinBorder,
          borderRadius: 25,
          padding: "10px 20px",
          "&:hover": {
            opacity: 1,
            backgroundColor: "transparent",
          },
          borderWidth: 2,
          borderColor: typeGraph === "co2" ? "#565759" : "",
        }}
        onClick={() => handleButtonClick("co2")}
      >
        CO2
      </Button>
      <Button
        variant="contained"
        color="inherit"
        sx={{
          fontWeight: "550",
          border: styles.thinBorder,
          borderRadius: 25,
          padding: "10px 20px",
          "&:hover": {
            opacity: 1,
            backgroundColor: "transparent",
          },
          borderWidth: 2,
          borderColor: typeGraph === "lux" ? "#565759" : "",
        }}
        onClick={() => handleButtonClick("lux")}
      >
        Illuminance
      </Button>
      <Button
        variant="contained"
        color="inherit"
        sx={{
          fontWeight: "550",
          border: styles.thinBorder,
          borderRadius: 25,
          padding: "10px 20px",
          "&:hover": {
            opacity: 1,
            backgroundColor: "transparent",
          },
          borderWidth: 2,
          borderColor: typeGraph === "noise" ? "#565759" : "",
        }}
        onClick={() => handleButtonClick("noise")}
      >
        Noise
      </Button>
      <Button
        variant="contained"
        color="inherit"
        sx={{
          fontWeight: "550",
          border: styles.thinBorder,
          borderRadius: 25,
          padding: "10px 20px",
          "&:hover": {
            opacity: 1,
            backgroundColor: "transparent",
          },
          borderWidth: 2,
          borderColor: typeGraph === "vibration" ? "#565759" : "",
        }}
        onClick={() => handleButtonClick("vibration")}
      >
        Vibration
      </Button>
      <Button
        variant="contained"
        color="inherit"
        sx={{
          fontWeight: "550",
          border: styles.thinBorder,
          borderRadius: 25,
          padding: "10px 20px",
          "&:hover": {
            opacity: 1,
            backgroundColor: "transparent",
          },
          borderWidth: 2,
          borderColor: typeGraph === "valve" ? "#565759" : "",
        }}
        onClick={() => handleButtonClick("valve")}
      >
        Valve
      </Button>
      <Button
        variant="contained"
        color="inherit"
        sx={{
          fontWeight: "550",
          border: styles.thinBorder,
          borderRadius: 25,
          padding: "10px 20px",
          "&:hover": {
            opacity: 1,
            backgroundColor: "transparent",
          },
          borderWidth: 2,
          borderColor: typeGraph === "check" ? "#565759" : "",
        }}
        onClick={() => handleButtonClick("check")}
      >
        Check
      </Button>
      <Button
        variant="contained"
        color="inherit"
        sx={{
          fontWeight: "550",
          border: styles.thinBorder,
          borderRadius: 25,
          padding: "10px 20px",
          "&:hover": {
            opacity: 1,
            backgroundColor: "transparent",
          },
          borderWidth: 2,
          borderColor: typeGraph === "particle" ? "#565759" : "",
        }}
        onClick={() => handleButtonClick("particle")}
      >
        Particle
      </Button>
      <Button
        variant="contained"
        color="inherit"
        sx={{
          fontWeight: "550",
          border: styles.thinBorder,
          borderRadius: 25,
          padding: "10px 20px",
          "&:hover": {
            opacity: 1,
            backgroundColor: "transparent",
          },
          borderWidth: 2,
          borderColor: typeGraph === "current" ? "#565759" : "",
        }}
        onClick={() => handleButtonClick("current")}
      >
        Electric current
      </Button>
      <Button
        variant="contained"
        color="inherit"
        sx={{
          fontWeight: "550",
          border: styles.thinBorder,
          borderRadius: 25,
          padding: "10px 20px",
          "&:hover": {
            opacity: 1,
            backgroundColor: "transparent",
          },
          borderWidth: 2,
          borderColor: typeGraph === "flow" ? "#565759" : "",
        }}
        onClick={() => handleButtonClick("flow")}
      >
        Flow
      </Button>
      <Button
        variant="contained"
        color="inherit"
        sx={{
          fontWeight: "550",
          border: styles.thinBorder,
          borderRadius: 25,
          padding: "10px 20px",
          "&:hover": {
            opacity: 1,
            backgroundColor: "transparent",
          },
          borderWidth: 2,
          borderColor: typeGraph === "sensor" ? "#565759" : "",
        }}
        onClick={() => handleButtonClick("sensor")}
      >
        Sensor
      </Button>
      <Button
        variant="contained"
        color="inherit"
        sx={{
          fontWeight: "550",
          border: styles.thinBorder,
          borderRadius: 25,
          padding: "10px 20px",
          "&:hover": {
            opacity: 1,
            backgroundColor: "transparent",
          },
          borderWidth: 2,
          borderColor: typeGraph === "alarm" ? "#565759" : "",
        }}
        onClick={() => handleButtonClick("alarm")}
      >
        Alarm
      </Button>
      <Button
        variant="contained"
        color="inherit"
        sx={{
          fontWeight: "550",
          border: styles.thinBorder,
          borderRadius: 25,
          padding: "10px 20px",
          "&:hover": {
            opacity: 1,
            backgroundColor: "transparent",
          },
          borderWidth: 2,
          borderColor: typeGraph === "heat" ? "#565759" : "",
        }}
        onClick={() => handleButtonClick("heat")}
      >
        Heat
      </Button>
      <Button
        variant="contained"
        color="inherit"
        sx={{
          fontWeight: "550",
          border: styles.thinBorder,
          borderRadius: 25,
          padding: "10px 20px",
          "&:hover": {
            opacity: 1,
            backgroundColor: "transparent",
          },
          borderWidth: 2,
          borderColor: typeGraph === "discomfort" ? "#565759" : "",
        }}
        onClick={() => handleButtonClick("discomfort")}
      >
        Discomfort
      </Button>
      <Button
        variant="contained"
        color="inherit"
        sx={{
          fontWeight: "550",
          border: styles.thinBorder,
          borderRadius: 25,
          padding: "10px 20px",
          "&:hover": {
            opacity: 1,
            backgroundColor: "transparent",
          },
          borderWidth: 2,
          borderColor: typeGraph === "no2" ? "#565759" : "",
        }}
        onClick={() => handleButtonClick("no2")}
      >
        NO2
      </Button>
      <Button
        variant="contained"
        color="inherit"
        sx={{
          fontWeight: "550",
          border: styles.thinBorder,
          borderRadius: 25,
          padding: "10px 20px",
          "&:hover": {
            opacity: 1,
            backgroundColor: "transparent",
          },
          borderWidth: 2,
          borderColor: typeGraph === "gas" ? "#565759" : "",
        }}
        onClick={() => handleButtonClick("gas")}
      >
        Gas Detector
      </Button>
    </Box>
  );
};

export default Gadgetstypes;
