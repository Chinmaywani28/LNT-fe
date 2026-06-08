import React, { useEffect, useState } from "react";
import InitialCards from "../gadgets/cards/cradsEnergy";
import AllTypeGadget from "../gadgets/gadgettype/AllTypesGadget";
import { Box } from "@mui/material";
import { getAllMeters } from "../Services/nodeService";;

const EnergyHome = ({ typeGraph, componentType }) => {
  const [open, setOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [allMeters, setAllMeters] = useState([]);
  const [meters, setMeters] = useState([]);

  const fetchAllMeters = async () => {
    try {
      const response = await getAllMeters();
      setAllMeters(response);
    } catch (error) {
      console.error('Error fetching meters : ', error);
    }
  };

  const filterMeterData = () => {

    switch (typeGraph) {

      case 'alltypes':
        setMeters(allMeters);
        break;

      case 'energy':
        setMeters(allMeters?.filter((meter) => meter.energy_watt_hr !== null).sort((a, b) => {
          if (a.meter_name < b.meter_name) return -1;
          if (a.meter_name > b.meter_name) return 1;
          return 0;
        }));
        break;

      case 'temperature':
        setMeters(allMeters?.filter((meter) => meter.temperature_c !== null).sort((a, b) => {
          if (a.meter_name < b.meter_name) return -1;
          if (a.meter_name > b.meter_name) return 1;
          return 0;
        }));
        break;

      case 'power':
        setMeters(allMeters?.filter((meter) => meter.power_watt !== null).sort((a, b) => {
          if (a.meter_name < b.meter_name) return -1;
          if (a.meter_name > b.meter_name) return 1;
          return 0;
        }));
        break;

      case 'humidity':
        setMeters(allMeters?.filter((meter) => meter.humidity_g_m3 !== null).sort((a, b) => {
          if (a.meter_name < b.meter_name) return -1;
          if (a.meter_name > b.meter_name) return 1;
          return 0;
        }));
        break;

      case 'pressure':
        setMeters(allMeters?.filter((meter) => meter.pressure_p !== null).sort((a, b) => {
          if (a.meter_name < b.meter_name) return -1;
          if (a.meter_name > b.meter_name) return 1;
          return 0;
        }));
        break;

      case 'co':
        setMeters(allMeters?.filter((meter) => meter.co !== null).sort((a, b) => {
          if (a.meter_name < b.meter_name) return -1;
          if (a.meter_name > b.meter_name) return 1;
          return 0;
        }));
        break;

      case 'co2':
        setMeters(allMeters?.filter((meter) => meter.co2_p !== null).sort((a, b) => {
          if (a.meter_name < b.meter_name) return -1;
          if (a.meter_name > b.meter_name) return 1;
          return 0;
        }));
        break;

      case 'lux':
        setMeters(allMeters?.filter((meter) => meter.lux_l !== null).sort((a, b) => {
          if (a.meter_name < b.meter_name) return -1;
          if (a.meter_name > b.meter_name) return 1;
          return 0;
        }));
        break;

        case 'noise':
        setMeters(allMeters?.filter((meter) => meter.aud_db !== null).sort((a, b) => {
          if (a.meter_name < b.meter_name) return -1;
          if (a.meter_name > b.meter_name) return 1;
          return 0;
        }));
        break;

        case 'vibration':
        setMeters(allMeters?.filter((meter) => meter.vib_mm_s !== null).sort((a, b) => {
          if (a.meter_name < b.meter_name) return -1;
          if (a.meter_name > b.meter_name) return 1;
          return 0;
        }));
        break;

        case 'valve':
        setMeters(allMeters?.filter((meter) => meter.valve_position !== null).sort((a, b) => {
          if (a.meter_name < b.meter_name) return -1;
          if (a.meter_name > b.meter_name) return 1;
          return 0;
        }));
        break;

        case 'check':
        setMeters(allMeters?.filter((meter) => meter.check !== null).sort((a, b) => {
          if (a.meter_name < b.meter_name) return -1;
          if (a.meter_name > b.meter_name) return 1;
          return 0;
        }));
        break;

        case 'particle':
        setMeters(allMeters?.filter((meter) => meter.particle !== null).sort((a, b) => {
          if (a.meter_name < b.meter_name) return -1;
          if (a.meter_name > b.meter_name) return 1;
          return 0;
        }));
        break;

        case 'current':
        setMeters(allMeters?.filter((meter) => meter.current_a !== null).sort((a, b) => {
          if (a.meter_name < b.meter_name) return -1;
          if (a.meter_name > b.meter_name) return 1;
          return 0;
        }));
        break;

        case 'flow':
        setMeters(allMeters?.filter((meter) => meter.flow_control !== null).sort((a, b) => {
          if (a.meter_name < b.meter_name) return -1;
          if (a.meter_name > b.meter_name) return 1;
          return 0;
        }));
        break;

        case 'sensor':
        setMeters(allMeters?.filter((meter) => meter.sensor_status !== null).sort((a, b) => {
          if (a.meter_name < b.meter_name) return -1;
          if (a.meter_name > b.meter_name) return 1;
          return 0;
        }));
        break;

        case 'alarm':
        setMeters(allMeters?.filter((meter) => meter.alarm_status !== null).sort((a, b) => {
          if (a.meter_name < b.meter_name) return -1;
          if (a.meter_name > b.meter_name) return 1;
          return 0;
        }));
        break;

        case 'heat':
        setMeters(allMeters?.filter((meter) => meter.heat_joules !== null).sort((a, b) => {
          if (a.meter_name < b.meter_name) return -1;
          if (a.meter_name > b.meter_name) return 1;
          return 0;
        }));

        case 'discomfort':
        setMeters(allMeters?.filter((meter) => meter.discomfort_index !== null).sort((a, b) => {
          if (a.meter_name < b.meter_name) return -1;
          if (a.meter_name > b.meter_name) return 1;
          return 0;
        }));

         case 'no2':
        setMeters(allMeters?.filter((meter) => meter.no2_p !== null).sort((a, b) => {
          if (a.meter_name < b.meter_name) return -1;
          if (a.meter_name > b.meter_name) return 1;
          return 0;
        }));

         case 'gas':
        setMeters(allMeters?.filter((meter) => meter.gas_detector !== null).sort((a, b) => {
          if (a.meter_name < b.meter_name) return -1;
          if (a.meter_name > b.meter_name) return 1;
          return 0;
        }));
        break;
    }
  }

  const handleAdd = (card) => {
    setSelectedCard(card);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    fetchAllMeters();
  }, []);

  useEffect(() => {
    filterMeterData();
  }, [allMeters, typeGraph]);

  return (
    <Box>
      <Box sx={{ overflowX: "auto" }}>
        <InitialCards onAdd={handleAdd} typeGraph={typeGraph} />
      </Box>
      <Box>
        <AllTypeGadget
          open={open}
          handleClose={handleClose}
          selectedCard={selectedCard}
          typeGraph={typeGraph}
          allMeters={meters}
          componentType={componentType}
        />
      </Box>
    </Box>
  );
};

export default EnergyHome;
