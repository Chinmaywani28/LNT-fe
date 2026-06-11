import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography, Card, FormControl, Menu, MenuItem, Tooltip as ToolTipBox } from '@mui/material';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Filler } from 'chart.js';
import { ReactComponent as WifiOffIcon } from "../../config/svgfiles/wifi-off.svg";
import { useFitText } from '../../config/fontResizeConfig';
import { criticalpowerMail } from "../../Services/emailservice";
import { iconsCon } from "../../config/iconsConfig";
import * as echarts from "echarts";
import LineChart from './lineChart';
import GaugeChart from './gauge';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Filler);

const MediumCard = ({ Data, chartData,openSidebar }) => {

  const chartRef = useRef(null);

  const getConversion = (type) => {
    switch (type) {
      case 'intermidiateEnergy': return 'kWh';
      case 'intermidiatePower': return 'kW';
      case 'intermidiateTemp': return '°C';
      case 'intermidiateHumidity': return '%';
      case 'intermidiateCO': return 'ppm';
      case 'intermidiateCO2': return 'ppm';
      case 'intermidiatePressure': return 'Pa';
      case 'intermidiateVibration': return 'm/s2';
      case 'intermidiateLux': return 'LUX';
      case 'intermidiateNoise': return 'dB';
      case 'intermidiateFlow': return 'm3/h';
      case 'intermidiateHeat': return 'mJ/h';
      case 'intermidiateCurrent': return 'A';
      case 'intermidiateValve': return '%';
      case 'intermidiateParticle': return 'ppm';
      case 'intermidiateNO2': return 'ppm';
      default: return '';
    }
  };

  const [power, setpower] = useState();
  const [minValue, setMinValue] = useState(null);
  const [maxValue, setMaxValue] = useState(null);
  const [criticalValue, setCriticalValue] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const { ref } = useFitText();
  const [isBlinking, setIsBlinking] = useState(true);

  const convertPower = (value, unit) => {
    try {
      if (value == null || isNaN(value)) return 0;

      switch (unit) {
        case 'W': return value * 1000;
        case 'kW': return (value);
        case '°C': return value;
        case '°K': return (value + 273.15);
        case '°F': return (value * 9 / 5) + 32;
        case 'Wh': return value * 1000;
        case 'kWh': return value;
        case 'ppm': return value;
        case 'Pa': return value;
        case 'm/s2': return value;
        case 'LUX': return value;
        case 'dB': return value;
        case 'm3/h': return value;
        case 'mJ/h': return value;
        case 'A': return value;
        case '%': return value;
        default:
          return value;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const formatValue = (value) => {
    try {
      if (value == null || isNaN(value)) {
        return '0';
      }

      if (value >= 1_000_000_000) {
        return (value / 1_000_000_000)?.toFixed(1) + 'B';
      } else if (value >= 1_000_000) {
        return (value / 1_000_000)?.toFixed(1) + 'M';
      } else if (value >= 1_000) {
        return (value / 1_000)?.toFixed(1) + 'K';
      } else {
        return value?.toFixed(1);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleMenuItemClick = (value) => {
    setpower(value);
    handleClose();
  };

  const convertDataValues = (values, unit) => {
    try {
      if (!Array.isArray(values)) return [];
      return values?.map(value => convertPower(value, unit));
    } catch (error) {
      console.error(error);
    }
  };

const labelsData =
  Data?.timestamp
    ?.map(item =>
      typeof item === "string"
        ? item.split(", ")[1]
        : ""
    )
    ?.slice(1) ?? [];
  // const labelsData = Data?.timestamp?.slice(1) ?? [];

  const dataValuesData = Data?.meter_reading ? convertDataValues(Data?.meter_reading.slice(1), power) : [];
  const convertedMinPower = minValue ? convertPower(minValue, power) : null;
  const convertedMaxPower = maxValue ? convertPower(maxValue, power) : null;
  const convertedCriticalPower = criticalValue ? convertPower(criticalValue, power) : null;

  const getBorderColor = (context) => {
    try {
      const chart = context.chart;
      const { ctx, chartArea } = chart;

      if (!chartArea) return null;

      // Get the gradient
      const gradient = ctx.createLinearGradient(0, 0, chartArea.width, 0);

      // Add color stops based on conditions
      context.dataset.data.forEach((value, index) => {
        let color;
        if (!value || !convertedCriticalPower || !convertedMaxPower || !convertedMinPower) {
          color = "#757676"; // Red (Below Min)
        }
        else if (value >= convertedCriticalPower) {
          color = "#F26457"; // Red (Critical)
        } else if (value >= convertedMaxPower) {
          color = "#e7af84"; // Orange (Warning)
        } else if (value >= convertedMinPower) {
          color = "#76C739"; // Green (Safe)
        }

        let position = index / (context.dataset.data.length - 1);
        gradient.addColorStop(position, color);
      });

      return gradient;
    } catch (error) {
      console.error(error);
    }
  };

  chartData = {
    labels: labelsData,
    data: dataValuesData,
  };

  const data = {
    labels: chartData?.labels || '',
    datasets: [
      {
        label: `${Data?.gadget_name} (${power})`,
        data: chartData?.data || '',
        //// borderColor: getBorderColor(chartData?.data),


        // borderColor: (context) => getBorderColor(context),
        // backgroundColor: (context) => getBorderColor(context),
        borderColor: '#006DBC',
        backgroundColor: (context) => getBorderColor(context),


        //  chartData ? (context) => {
        //   const chart = context.chart;
        //   const { ctx, chartArea } = chart;
        //   if (!chartArea) {
        //     return null;
        //   }
        //   return getGradient(ctx, context.dataset.data);
        // } : '',
        // fill: true,
        tension: 0.4,
        // borderWidth: 4,
        borderWidth: 3,
        pointRadius: 0,
        pointHoverRadius: 0,
      },
    ],
  };

  const dataBar = {
    labels: chartData?.labels || '',
    datasets: [
      {
        label: `${Data?.gadget_name} (${power})`,
        data: chartData?.data || '',
        backgroundColor: (context) => getBorderColor(context),
        tension: 0.4,
        fill: true,
        pointRadius: 0,
        pointHoverRadius: 0,
      },
    ],
  };

  const getCriticalValues = (type) => {
    if (type === ('intermidiateEnergy')) {
      setMinValue(Number(Data?.min_energy));
      setMaxValue(Number(Data?.max_energy));
      setCriticalValue(Number(Data?.critical_energy));
    }

    if (type === ('intermidiatePower')) {
      setMinValue(Number(Data?.min_power));
      setMaxValue(Number(Data?.max_power));
      setCriticalValue(Number(Data?.critical_power));
    }

    if (type === ('intermidiateTemp')) {
      setMinValue(Number(Data?.min_temp));
      setMaxValue(Number(Data?.max_temp));
      setCriticalValue(Number(Data?.critical_temp));
    }

    if (type === ('intermidiateHumidity')) {
      setMinValue(Number(Data?.min_humidity));
      setMaxValue(Number(Data?.max_humidity));
      setCriticalValue(Number(Data?.critical_humidity));
    }

    if (type === ('intermidiateCO')) {
      setMinValue(Number(Data?.min_co));
      setMaxValue(Number(Data?.max_co));
      setCriticalValue(Number(Data?.critical_co));
    }

    if (type === ('intermidiateCO2')) {
      setMinValue(Data?.min_co2);
      setMaxValue(Data?.max_co2);
      setCriticalValue(Data?.critical_co2);
    }

    if (type === ('intermidiatePressure')) {
      setMinValue(Number(Data?.min_pressure));
      setMaxValue(Number(Data?.max_pressure));
      setCriticalValue(Number(Data?.critical_pressure));
    }

    if (type === ('intermidiateVibration')) {
      setMinValue(Number(Data?.min_vibration));
      setMaxValue(Number(Data?.max_vibration));
      setCriticalValue(Number(Data?.critical_vibration));
    }

    if (type === ('intermidiateLux')) {
      setMinValue(Data?.min_lux);
      setMaxValue(Data?.max_lux);
      setCriticalValue(Data?.critical_lux);
    }

    if (type === ('intermidiateNoise')) {
      setMinValue(Number(Data?.min_noise));
      setMaxValue(Number(Data?.max_noise));
      setCriticalValue(Number(Data?.critical_noise));
    }

    if (type === ('intermidiateFlow')) {
      setMinValue(Number(Data?.min_flow));
      setMaxValue(Number(Data?.max_flow));
      setCriticalValue(Number(Data?.critical_flow));
    }

    if (type === ('intermidiateHeat')) {
      setMinValue(Number(Data?.min_heat));
      setMaxValue(Number(Data?.max_heat));
      setCriticalValue(Number(Data?.critical_heat));
    }

    if (type === ('intermidiateAlarm')) {
      setMinValue(Number(Data?.min_alarm));
      setMaxValue(Number(Data?.max_alarm));
      setCriticalValue(Number(Data?.critical_alarm));
    }

    if (type === ('intermidiateSensor')) {
      setMinValue(Number(Data?.min_stat));
      setMaxValue(Number(Data?.max_stat));
      setCriticalValue(Number(Data?.critical_stat));
    }

    if (type === ('intermidiateCurrent')) {
      setMinValue(Number(Data?.min_current));
      setMaxValue(Number(Data?.max_current));
      setCriticalValue(Number(Data?.critical_current));
    }

    if (type === ('intermidiateParticle')) {
      setMinValue(Number(Data?.min_particle));
      setMaxValue(Number(Data?.max_particle));
      setCriticalValue(Number(Data?.critical_particle));
    }

    if (type === ('intermidiateCheck')) {
      setMinValue(Number(Data?.min_check));
      setMaxValue(Number(Data?.max_check));
      setCriticalValue(Number(Data?.critical_check));
    }

    if (type === ('intermidiateValve')) {
      setMinValue(Number(Data?.min_valve));
      setMaxValue(Number(Data?.max_valve));
      setCriticalValue(Number(Data?.critical_valve));
    }

    if (type === ('intermidiateNO2')) {
      setMinValue(Number(Data?.min_no2));
      setMaxValue(Number(Data?.max_no2));
      setCriticalValue(Number(Data?.critical_no2));
    }
  }

  const getColorSettings = (value) => {
    try {
      if (!value) {
        return {
          bgColor: '#E5EBEB',
          borderColor: '#E5EBEB',
          colors: '#757676',
          fontColor: 'black',
        }
      }

      if ((!minValue || !maxValue)) {
        return {
          bgColor: '#E9EEEF',
          borderColor: '#E9EEEF',
          colors: '#006DBC',
          fontColor: 'black',
        }
      }

      if (value > minValue && value < maxValue) {

        return {
          bgColor: '#E9EEEF',
          borderColor: '#E9EEEF',
          colors: '#006DBC',
          fontColor: 'black',
        };
      } else if (value >= maxValue && value < criticalValue) {

        return {
          bgColor: '#FFF0D9',
          borderColor: '#FF740E',
          colors: '#FF6B00',
          fontColor: '#FF6B00',
        };
      } else if (value >= criticalValue || value <= minValue) {
        return {
          bgColor: '#FFD9D9',
          borderColor: '#FF0E0E',
          colors: '#FF0000',
          fontColor: '#FF0000',
        };
      }

      return {
        bgColor: '#E5EBEB',
        borderColor: '#E5EBEB',
        colors: '#757676',
        fontColor: '#757676',
      };
    } catch (error) {
      console.error(error);
    }
  };

  const powerValue = Data?.meter_reading?.length ? Data.meter_reading[Data.meter_reading.length - 1] : 0;
  const convertedValue = Data ? convertPower(powerValue, power) : 0;
  const formattedValue = Data ? formatValue(parseFloat(convertedValue)) : 0;
  const tempCheck = getColorSettings(powerValue);
  const numericValue = formattedValue.match(/(\d+(\.\d+)?)/g)?.join('') || "";
  const textValue = formattedValue.match(/[a-zA-Z]+/g)?.join('') || "";

  function getGradient(ctx, data) {
    try {
      if (!data || !Array.isArray(data) || data.length === 0) {
        console.error("Data array is missing or empty.");
        return ctx.createLinearGradient(0, 0, 1, 0);
      }

      const minValue = Math.min(...data);
      const maxValue = Math.max(...data);

      if (minValue === maxValue || isNaN(minValue) || isNaN(maxValue)) {
        return ctx.createLinearGradient(0, 0, 1, 0);
      }

      if (
        isNaN(convertedMinPower) ||
        isNaN(convertedMaxPower) ||
        isNaN(convertedCriticalPower)
      ) {
        console.warn("Power thresholds are undefined.");
        return ctx.createLinearGradient(0, 0, 1, 0);
      }

      const gradient = ctx.createLinearGradient(0, 0, 1, 0);

      // Function to ensure stops stay within range [0, 1]
      const getPosition = (value) => {
        return Math.min(1, Math.max(0, (value - minValue) / (maxValue - minValue || 1)));
      };

      // Add stops ensuring no out-of-range values
      const minPos = getPosition(convertedMinPower);
      const maxPos = getPosition(convertedMaxPower);
      const criticalPos = getPosition(convertedCriticalPower);

      gradient.addColorStop(0, "#F26457"); // Red at start
      gradient.addColorStop(minPos, "#F26457"); // Red before Green
      gradient.addColorStop(Math.min(minPos + 0.0001, 1), "#76C739"); // Instant Green
      gradient.addColorStop(maxPos, "#76C739"); // Green before Orange
      gradient.addColorStop(Math.min(maxPos + 0.0001, 1), "#e7af84"); // Instant Orange
      gradient.addColorStop(criticalPos, "#e7af84"); // Orange before Red
      gradient.addColorStop(Math.min(criticalPos + 0.0001, 1), "#F26457"); // Instant Red
      gradient.addColorStop(1, "#F26457"); // Red at end

      return gradient;
    } catch (error) {
      console.error("Error in getGradient:", error);
      return ctx.createLinearGradient(0, 0, 1, 0);
    }
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "nearest",
      intersect: false,
    },
    hover: {
      mode: "nearest",
      intersect: false,
    },
    elements: {
      point: {
        radius: 0,
      },
      line: {
        tension: 0.4,
      },
    },
    scales: {
      x: {
        title: {
          display: false,
          text: `Time Period`,
          font: {
            weight: 'bold',
            // color: '#9e9e9e',
            color: '#ff0000',
          },
        },
        offset: true,
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 10,
            weight: 'bold',
            color: '#ff0000',
          },
        },
      },
      y: {
        title: {
          display: true,
          text: `${Data?.gadget_name} (${power})`,
          font: {
            weight: 'bold',
            color: '#006DBC',
          },
        },
        display: true,
        ticks: {
          // stepSize: (Data?.gadget_type === 'intermidiateHumidity' || Data?.gadget_type === 'intermidiateTemp') ? step : undefined,
          // min: (Data?.gadget_type === 'intermidiateHumidity' || Data?.gadget_type === 'intermidiateTemp') ? minRange : undefined,
          // max: Data?.gadget_type === 'intermidiateHumidity' ? maxRange : undefined,
          font: {
            size: 10,
            weight: 'bold',
            color: '#006DBC',
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        display: true,
      },
    },
  };

  const optionsBar = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "nearest",
      intersect: false,
    },
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    scales: {
      x: {
        title: {
          display: false,
          text: `Time Period`,
          font: {
            weight: 'bold',
            color: '#9e9e9e',
          },
        },
        grid: {
          display: true,
        },
        ticks: {
          font: {
            size: 10,
            weight: 'bold',
            color: '#9e9e9e',
          },
        },
      },
      y: {
        title: {
          display: true,
          text: `${Data?.gadget_name} (${power})`,
          font: {
            weight: 'bold',
            // color: '#9e9e9e',
            color: 'red',
          },
        },
        display: true,
        ticks: {
          font: {
            size: 10,
            weight: 'bold',
            color: '#9e9e9e',
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        display: true,
      },
    },
  };

  const styles = {
    thinBorder: {
      border: "0.5px solid #E5E7EB",
      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.15)",
      backgroundColor: "rgba(255, 255, 255, 0.68)",
    },
  };

  const getIcon = (type) => {
    try {
      if (type === ('intermidiateEnergy')) {
        return iconsCon.find((item) => item.gadget_name === 'energy')
      }

      if (type === ('intermidiatePower')) {
        return iconsCon.find((item) => item.gadget_name === 'power')
      }

      if (type === ('intermidiateTemp')) {
        return iconsCon.find((item) => item.gadget_name === 'temperature')
      }

      if (type === ('intermidiateHumidity')) {
        return iconsCon.find((item) => item.gadget_name === 'humidity')
      }

      if (type === ('intermidiateCO')) {
        return iconsCon.find((item) => item.gadget_name === 'co')
      }

      if (type === ('intermidiateCO2')) {
        return iconsCon.find((item) => item.gadget_name === 'co2')
      }

      if (type === ('intermidiatePressure')) {
        return iconsCon.find((item) => item.gadget_name === 'pressure')
      }

      if (type === ('intermidiateVibration')) {
        return iconsCon.find((item) => item.gadget_name === 'vibration')
      }

      if (type === ('intermidiateLux')) {
        return iconsCon.find((item) => item.gadget_name === 'lux')
      }

      if (type === ('intermidiateNoise')) {
        return iconsCon.find((item) => item.gadget_name === 'noise')
      }

      if (type === ('intermidiateFlow')) {
        return iconsCon.find((item) => item.gadget_name === 'flow')
      }

      if (type === ('intermidiateHeat')) {
        return iconsCon.find((item) => item.gadget_name === 'heat')
      }

      if (type === ('intermidiateCurrent')) {
        return iconsCon.find((item) => item.gadget_name === 'current')
      }

      if (type === ('intermidiateParticle')) {
        return iconsCon.find((item) => item.gadget_name === 'particle')
      }

      if (type === ('intermidiateCheck')) {
        return iconsCon.find((item) => item.gadget_name === 'check')
      }

      if (type === ('intermidiateValve')) {
        return iconsCon.find((item) => item.gadget_name === 'valve')
      }

      if (type === ('intermidiateDiscomfort')) {
        return iconsCon.find((item) => item.gadget_name === 'discomfort')
      }

      if (type === ('intermidiateNO2')) {
        return iconsCon.find((item) => item.gadget_name === 'no2')
      }

      if (type === ('intermidiateGas')) {
        return iconsCon.find((item) => item.gadget_name === 'gas')
      }
    } catch (error) {
      console.error(error);
    }
  }

  const blinkColor = Data?.status
    ? isBlinking
      ? tempCheck.colors
      : tempCheck.colors // Blink to black if active
    : isBlinking
      ? '#dd1503'
      : '#757676';

  useEffect(() => {
    const interval = setInterval(() => {
      setIsBlinking((prev) => !prev);
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  useEffect(() => {
    if (Data?.gadget_type) {
      setpower(getConversion(Data.gadget_type));
    }

    getCriticalValues(Data?.gadget_type)
  }, [Data]);

  // console.log(Data,openSidebar,'op');


  return (
    <Card sx={{ ...styles.thinBorder, width: Data?.gadget_type === "intermidiateValve" ? 1080 : 510, height: '240px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 2, borderRadius: '20px', bgcolor: '#ECF5FF', borderColor: tempCheck?.borderColor, borderWidth: 2 }}>
{/* bgcolor: '#C7E7FF', */}

      <Box ref={ref} sx={{ color: tempCheck?.fontColor, position: 'relative', bottom: 10 }}>
        <ToolTipBox title={`${'Device Name : ' + (Data?.meter_name || 'N/A')}`} arrow>
          <Typography
            sx={{
              textAlign: 'left',
              fontWeight: 'bold',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              fontSize: 18,
              paddingLeft: '12px', // Move text slightly right,
              position: 'relative',
    top: '20px'
            }}
          >
            {Data?.meter_name?.toUpperCase() || 'N/A'}
          </Typography>
        </ToolTipBox>
      </Box>


      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'left', color: tempCheck?.colors, gap: 1, position: 'relative', top: 30 }}>
        {/* {getIcon(Data?.gadget_type)?.render({ width: 32, height: 32, color: tempCheck?.colors, textAlign: 'left' })} */}
        {getIcon(Data?.gadget_type)?.render({
          width: 32,
          height: 32,
          color: tempCheck?.colors,
          style: { textAlign: 'left' }
        })}

        <Typography variant='h6' fontWeight='bold' sx={{
          fontSize: '14px',
          textAlign: 'left',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis', width: (Data?.gadget_type === 'intermidiateCO2' || Data?.gadget_type === 'intermidiateCO') ? 205 : null
        }}>
          
          {Data?.gadget_name?.toUpperCase()}
        </Typography>
      </Box>


      <Box sx={{ display: 'flex', justifyContent: Data?.gadget_type === 'intermidiateValve' ? 'center' : 'space-evenly', alignItems: 'center', position: 'relative', bottom: Data?.gadget_type === 'intermidiateValve' ? 85 : 44, gap: 1 }}>


        <Box sx={{
          display: 'flex', flexDirection: 'column', gap: Data?.meter_reading?.length ? 3 : 0, position: 'relative', top: 37, left: Data?.gadget_type === 'intermidiateValve' ? 60 : 0
        }}>
          {Data?.meter_reading?.length ?
            <Box>
              <Box sx={{
                display: 'flex', justifyContent: 'center',
                textAlign: 'center', fontSize: 45, fontWeight: 'bold', color: tempCheck?.colors, whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}>
                <Typography sx={{ textAlign: 'center', fontSize: 36, fontWeight: 'bold', }}>{numericValue}</Typography>
                <Typography sx={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold', marginTop: 2 }}>{textValue}</Typography>
                <sup style={{ position: 'relative', bottom: 25, }}>
                  <FormControl sx={{ color: tempCheck?.colors }} size="small" variant="outlined">
                    <Box onClick={handleClick} size='small' sx={{
                      cursor: 'pointer', height: 35, marginTop: '30px',
                    }}>
                      <sup style={{ fontSize: 14, verticalAlign: 'top', color: tempCheck?.colors, }}>{power}</sup>
                    </Box>
                    <Menu id="temperature-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                      {(() => {
                        switch (Data?.gadget_type) {
                          case 'intermidiateEnergy':
                            return [
                              <MenuItem key="wh" onClick={() => handleMenuItemClick("Wh")}>Wh</MenuItem>,
                              <MenuItem key="kwh" onClick={() => handleMenuItemClick("kWh")}>kWh</MenuItem>
                            ];
                          case 'intermidiateTemp':
                            return [
                              <MenuItem key="celsius" onClick={() => handleMenuItemClick("°C")}>°C</MenuItem>,
                              <MenuItem key="fahrenheit" onClick={() => handleMenuItemClick("°F")}>°F</MenuItem>,
                              <MenuItem key="kelvin" onClick={() => handleMenuItemClick("°K")}>°K</MenuItem>
                            ];
                          case 'intermidiatePower':
                            return [
                              <MenuItem key="w" onClick={() => handleMenuItemClick("W")}>W</MenuItem>,
                              <MenuItem key="kw" onClick={() => handleMenuItemClick("kW")}>kW</MenuItem>
                            ];
                          case 'intermidiateHumidity':
                            return [
                              <MenuItem key="humidity" onClick={() => handleMenuItemClick("%")}>%</MenuItem>
                            ];
                          case 'intermidiateCO':
                            return [
                              <MenuItem key="co" onClick={() => handleMenuItemClick("ppm")}>ppm</MenuItem>
                            ];
                          case 'intermidiateCO2':
                            return [
                              <MenuItem key="co2" onClick={() => handleMenuItemClick("ppm")}>ppm</MenuItem>
                            ];
                          case 'intermidiatePressure':
                            return [
                              <MenuItem key="pressure" onClick={() => handleMenuItemClick("Pa")}>Pa</MenuItem>
                            ];
                          case 'intermidiateVibration':
                            return [
                              <MenuItem key="vibration" onClick={() => handleMenuItemClick("m/s2")}>m/s2</MenuItem>
                            ];
                          case 'intermidiateLux':
                            return [
                              <MenuItem key="lux" onClick={() => handleMenuItemClick("LUX")}>LUX</MenuItem>
                            ];
                          case 'intermidiateNoise':
                            return [
                              <MenuItem key="noise" onClick={() => handleMenuItemClick("dB")}>dB</MenuItem>
                            ];
                          case 'intermidiateFlow':
                            return [
                              <MenuItem key="flow" onClick={() => handleMenuItemClick("m3/h")}>m3/h</MenuItem>
                            ];
                          case 'intermidiateHeat':
                            return [
                              <MenuItem key="heat" onClick={() => handleMenuItemClick("mJ/h")}>mJ/h</MenuItem>
                            ];
                          case 'intermidiateCurrent':
                            return [
                              <MenuItem key="current" onClick={() => handleMenuItemClick("A")}>A</MenuItem>
                            ];
                          case 'intermidiateParticle':
                            return [
                              <MenuItem key="particle" onClick={() => handleMenuItemClick("ppm")}>ppm</MenuItem>
                            ];
                          case 'intermidiateNO2':
                            return [
                              <MenuItem key="particle" onClick={() => handleMenuItemClick("ppm")}>ppm</MenuItem>
                            ];
                          default:
                            return null;
                        }
                      })()}
                    </Menu>
                  </FormControl>
                </sup>
              </Box>
              <Typography sx={{ fontWeight: 'bold',fontSize : 14 }}>
                {Data?.timestamp?.length
                  ? Data.timestamp[Data.timestamp.length - 1]
                  : ""}
              </Typography>
            </Box>

            
            : (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: tempCheck?.colors, position: 'relative', bottom: 5 }}>
                <Typography sx={{ textAlign: 'center' }} width={60} height={60} fontSize={30} fontWeight={'bold'}>OFF</Typography>
                {/* textAlign: 'center', fontSize: 20, fontWeight: 'bold', marginTop: 2 */}
              </Box>
            )}
        </Box>


        <Box sx={{ position: 'relative', left: Data?.gadget_type === 'intermidiateValve' ? 60 : 0 }}>
          {(Data?.gadget_type === 'intermidiateEnergy' && Data?.range !== 'live') ? (
            <Bar data={dataBar} options={optionsBar} width={300} height={185} />
          ) : (
            <Line data={data} options={options} width={375} height={185} />
          )}
        </Box>
      </Box>
    </Card >
  );
};

export default MediumCard;


