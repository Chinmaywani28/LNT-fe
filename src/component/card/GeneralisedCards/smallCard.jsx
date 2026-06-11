import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, FormControl, Menu, MenuItem, Tooltip as ToolTipBox, IconButton, TextField } from '@mui/material';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';
import { ReactComponent as WifiOffIcon } from "../../config/svgfiles/wifi-off.svg";
import { useFitText } from '../../config/fontResizeConfig';
import { criticalpowerMail } from "../../Services/emailservice";
import { iconsCon } from "../../config/iconsConfig";
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import CircleIcon from '@mui/icons-material/Circle';
import OfflineBoltIcon from '@mui/icons-material/OfflineBolt';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const SmallCard = ({ Data }) => {
  console.log('datajlj', Data)
  
  const getConversion = (type) => {
    switch (type) { 
      case 'basicEnergy': return 'kWh';
      case 'basicPower': return 'kW';
      case 'basicTemp': return '°C';
      case 'basicHumidity': return '%';
      case 'basicCO': return 'ppm';
      case 'basicCO2': return 'ppm';
      case 'basicPressure': return 'Pa';
      case 'basicVibration': return 'm/s2';
      case 'basicLux': return 'LUX';
      case 'basicNoise': return 'dBA';
      case 'basicFlow': return 'm3/h';
      case 'basicHeat': return 'mJ/h';
      case 'basicCurrent': return 'A';
      case 'basicValve': return '%';
      case 'basicParticle': return 'ppm';
      case 'basicNO2': return 'ppm';
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
    if (value == null || isNaN(value)) return 0;
    
    switch (unit) {
      case 'W': return value * 1000;
      case 'kW': return (value);
      case '°C': return value;
      case '°K': return (value + 273.15);
      case '°F': return (value * 9 / 5) + 32;
      case 'Wh': return value * 1000;
      case 'kWh': return (1.0 * value);
      case 'ppm': return value;
      case 'Pa': return value;
      case 'm/s2': return value;
      case 'LUX': return value;
      case 'dB': return value;
      case 'm3/h': return value;
      case 'mJ/h': return value;
      case 'A': return value;
      default:
        return value;
    }
  };

  const formatValue = (value) => {
    if (value == null || isNaN(value)) {
      return '0'; // Return default '0' for undefined, null, or NaN values
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
  };

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleMenuItemClick = (value) => {
    setpower(value);
    handleClose();
  };

  const getCriticalValues = (type) => {
    if (type === ('basicEnergy')) {
      setMinValue(Number(Data?.min_energy));
      setMaxValue(Number(Data?.max_energy));
      setCriticalValue(Number(Data?.critical_energy));
    }

    if (type === ('basicPower')) {
      setMinValue(Number(Data?.min_power));
      setMaxValue(Number(Data?.max_power));
      setCriticalValue(Number(Data?.critical_power));
    }

    if (type === ('basicTemp')) {
      setMinValue(Number(Data?.min_temp));
      setMaxValue(Number(Data?.max_temp));
      setCriticalValue(Number(Data?.critical_temp));
    }

    if (type === ('basicHumidity')) {
      setMinValue(Number(Data?.min_humidity));
      setMaxValue(Number(Data?.max_humidity));
      setCriticalValue(Number(Data?.critical_humidity));
    }

    if (type === ('basicCO')) {
      setMinValue(Number(Data?.min_co));
      setMaxValue(Number(Data?.max_co));
      setCriticalValue(Number(Data?.critical_co));
    }

    if (type === ('basicCO2')) {
      setMinValue(Data?.min_co2);
      setMaxValue(Data?.max_co2);
      setCriticalValue(Data?.critical_co2);
    }

    if (type === ('basicPressure')) {
      setMinValue(Number(Data?.min_pressure));
      setMaxValue(Number(Data?.max_pressure));
      setCriticalValue(Number(Data?.critical_pressure));
    }

    if (type === ('basicVibration')) {
      setMinValue(Number(Data?.min_vibration));
      setMaxValue(Number(Data?.max_vibration));
      setCriticalValue(Number(Data?.critical_vibration));
    }

    if (type === ('basicLux')) {
      setMinValue(Data?.min_lux);
      setMaxValue(Data?.max_lux);
      setCriticalValue(Data?.critical_lux);
    }

    if (type === ('basicNoise')) {
      setMinValue(Number(Data?.min_noise));
      setMaxValue(Number(Data?.max_noise));
      setCriticalValue(Number(Data?.critical_noise));
    }

    if (type === ('basicFlow')) {
      setMinValue(Number(Data?.min_flow));
      setMaxValue(Number(Data?.max_flow));
      setCriticalValue(Number(Data?.critical_flow));
    }

    if (type === ('basicHeat')) {
      setMinValue(Number(Data?.min_heat));
      setMaxValue(Number(Data?.max_heat));
      setCriticalValue(Number(Data?.critical_heat));
    }

    if (type === ('basicAlarm')) {
      setMinValue(Number(Data?.min_alarm));
      setMaxValue(Number(Data?.max_alarm));
      setCriticalValue(Number(Data?.critical_alarm));
    }

    if (type === ('basicSensor')) {
      setMinValue(Number(Data?.min_stat));
      setMaxValue(Number(Data?.max_stat));
      setCriticalValue(Number(Data?.critical_stat));
    }

    if (type === ('basicCurrent')) {
      setMinValue(Number(Data?.min_current));
      setMaxValue(Number(Data?.max_current));
      setCriticalValue(Number(Data?.critical_current));
    }

    if (type === ('basicParticle')) {
      setMinValue(Number(Data?.min_particle));
      setMaxValue(Number(Data?.max_particle));
      setCriticalValue(Number(Data?.critical_particle));
    }

    if (type === ('basicCheck')) {
      setMinValue(Number(Data?.min_check));
      setMaxValue(Number(Data?.max_check));
      setCriticalValue(Number(Data?.critical_check));
    }

    if (type === ('basicValve')) {
      setMinValue(Number(Data?.min_valve));
      setMaxValue(Number(Data?.max_valve));
      setCriticalValue(Number(Data?.critical_valve));
    }

    if (type === ('basicNO2')) {
      setMinValue(Number(Data?.min_no2));
      setMaxValue(Number(Data?.max_no2));
      setCriticalValue(Number(Data?.critical_no2));
    }

    if (type === ('basicGas')) {
      setMinValue(Number(Data?.min_gas));
      setMaxValue(Number(Data?.max_gas));
      setCriticalValue(Number(Data?.critical_gas));
    }
  }

  const getColorSettings = (value) => {

    // console.log(minValue,maxValue,criticalValue,'range',value);

    if (!value) {
      // console.log(1);
      
      return {
        bgColor: '#E5EBEB',
        borderColor: '#E5EBEB',
        colors: '#757676',
        fontColor: 'black',
      }
    }

    if ((!minValue || !maxValue)) {
      // console.log(2);
      
      return {
        bgColor: '#E9EEEF',
        borderColor: '#E9EEEF',
        colors: '#006DBC',
        fontColor: 'black',
      }
    }

    if ((value > minValue && value < maxValue) || value === 'NML' || value === 'OFF' || value === 'ON') {
      // console.log(3);
      return {
        bgColor: '#E9EEEF',
        borderColor: '#E9EEEF',
        colors: '#006DBC',
        fontColor: 'black',
      };
    } else if (value >= maxValue && value < criticalValue) {
      // console.log(4);
      
      return {
        bgColor: '#FFF0D9',
        borderColor: '#FF740E',
        colors: '#FF6B00',
        fontColor: '#FF6B00',
      };
    } else if ((value >= criticalValue || value <= minValue) || value === 'ALM') {
      // console.log(5,criticalValue,minValue,value);
      
      return {
        bgColor: '#FFD9D9',
        borderColor: '#FF0E0E',
        colors: '#FF0000',
        fontColor: '#FF0000',
      };
    } 
    else if (!value || (!minValue || !maxValue)) {
      // console.log(6);
      
      return {
        bgColor: '#E5EBEB',
        borderColor: '#E5EBEB',
        colors: '#757676',
        fontColor: '#757676',
      };
    } 
    else {
      return {
        bgColor: '#E5EBEB',
        borderColor: '#E5EBEB',
        colors: '#757676',
        fontColor: '#757676',
      };
    }

    // return {
    //   bgColor: '#E5EBEB',
    //   borderColor: '#E5EBEB',
    //   colors: '#757676',
    //   fontColor: '#757676',
    // };
  };

  const powerValue = Data?.meter_reading?.length ? Data.meter_reading[Data.meter_reading.length - 1] : 0;
  const convertedValue = Data?.gadget_type === 'basicAlarm' || Data?.gadget_type === 'basicSensor' ? powerValue : (Data ? convertPower(powerValue, power) : null);
  const formattedValue = Data?.gadget_type === 'basicAlarm' || Data?.gadget_type === 'basicSensor' ? powerValue : (Data ? formatValue(parseFloat(convertedValue)) : null);
  const lastReading = Array.isArray(Data?.meter_reading) ? Data.meter_reading[Data.meter_reading.length - 1] : null;
  const alarm = lastReading > 0 ? 'ALM' : 'NML';
  const sensor = lastReading > 0 ? 'ON' : 'OFF';
  //const sensor = lastReading > 0 ? <CircleIcon sx={{ color: '#2ce100', height: 70, width: 70, }} /> : <CircleIcon sx={{ color: 'red', height: 70, width: 70, }} />;
  const tempCheck = getColorSettings(Data?.gadget_type === 'basicAlarm' ? alarm : Data?.gadget_type === 'basicSensor' ? sensor : powerValue);
  const numericValue = parseFloat(formattedValue) && formattedValue?.match(/(\d+(\.\d+)?)/g)?.join('');
  const textValue = parseFloat(formattedValue) && formattedValue?.match(/[a-zA-Z]+/g)?.join('');

  const styles = {
    thinBorder: {
      border: "0.5px solid #E5E7EB",
      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.15)",
      backgroundColor: "rgba(255, 255, 255, 0.68)",
    },
  };

  const getIcon = (type) => {
    if (type === ('basicEnergy')) {
      return iconsCon.find((item) => item.gadget_name === 'energy')
    }

    if (type === ('basicPower')) {
      return iconsCon.find((item) => item.gadget_name === 'power')
    }

    if (type === ('basicTemp')) {
      return iconsCon.find((item) => item.gadget_name === 'temperature')
    }

    if (type === ('basicHumidity')) {
      return iconsCon.find((item) => item.gadget_name === 'humidity')
    }

    if (type === ('basicCO')) {
      return iconsCon.find((item) => item.gadget_name === 'co')
    }

    if (type === ('basicCO2')) {
      return iconsCon.find((item) => item.gadget_name === 'co2')
    }

    if (type === ('basicPressure')) {
      return iconsCon.find((item) => item.gadget_name === 'pressure')
    }

    if (type === ('basicVibration')) {
      return iconsCon.find((item) => item.gadget_name === 'vibration')
    }

    if (type === ('basicLux')) {
      return iconsCon.find((item) => item.gadget_name === 'lux')
    }

    if (type === ('basicNoise')) {
      return iconsCon.find((item) => item.gadget_name === 'noise')
    }

    if (type === ('basicFlow')) {
      return iconsCon.find((item) => item.gadget_name === 'flow')
    }

    if (type === ('basicHeat')) {
      return iconsCon.find((item) => item.gadget_name === 'heat')
    }

    if (type === ('basicAlarm')) {
      return iconsCon.find((item) => item.gadget_name === 'alarm')
    }

    if (type === ('basicSensor')) {
      return iconsCon.find((item) => item.gadget_name === 'sensor')
    }

    if (type === ('basicCurrent')) {
      return iconsCon.find((item) => item.gadget_name === 'current')
    }

    if (type === ('basicParticle')) {
      return iconsCon.find((item) => item.gadget_name === 'particle')
    }

    if (type === ('basicCheck')) {
      return iconsCon.find((item) => item.gadget_name === 'check')
    }

    if (type === ('basicValve')) {
      return iconsCon.find((item) => item.gadget_name === 'valve')
    }

    if (type === ('basicDiscomfort')) {
      return iconsCon.find((item) => item.gadget_name === 'discomfort')
    }

     if (type === ('basicNO2')) {
      return iconsCon.find((item) => item.gadget_name === 'no2')
    }

     if (type === ('basicGas')) {
      return iconsCon.find((item) => item.gadget_name === 'gas')
    }
  }

  const blinkColor = Data?.status
    ? isBlinking
      ? tempCheck.colors
      : tempCheck.colors // Blink to black if active
    : isBlinking
      ? '#dd1503'
      : '#000';

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


  return (
    // <Card sx={{ ...styles.thinBorder, width: 300, height: '250px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 4, borderRadius: '20px', bgcolor: tempCheck.bgColor, borderColor: tempCheck.borderColor, borderWidth: 2 }}>
    //   <Box display="flex" alignItems="center" justifyContent="space-evenly" gap='20px'>
    //     <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, }}>
    //       <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'left', color: tempCheck.colors, position: 'relative', left: -10, gap: 1 }}>
    //         {getIcon(Data?.gadget_type)?.render({ width: 32, height: 32, color: tempCheck.colors, })}
    //         <Typography variant='h6' fontWeight='bold' sx={{
    //           whiteSpace: 'nowrap',
    //           overflow: 'hidden',
    //           textOverflow: 'ellipsis',
    //         }}>
    //           {Data?.gadget_name}
    //         </Typography>
    //         {!Data?.status && <PriorityHighIcon sx={{ position: 'relative', left: 100, color: blinkColor, width: 32, height: 32 }} />}
    //       </Box>
    //       <Box sx={{ display: 'flex', flexDirection: 'column', gap: Data?.meter_reading?.length ? 3 : -5 }}>
    //         {Data?.meter_reading?.length ?
    //           <Box>
    //             <Box sx={{
    //               display: 'flex', justifyContent: 'center',
    //               textAlign: 'center', fontSize: 45, fontWeight: 'bold', color: tempCheck.colors, whiteSpace: 'nowrap',
    //               overflow: 'hidden',
    //               textOverflow: 'ellipsis',
    //             }}>
    //               {(Data?.gadget_type === 'basicAlarm' || Data?.gadget_type === 'basicSensor') ? <Typography sx={{ textAlign: 'center', fontSize: 45, fontWeight: 'bold', }}>{Data?.gadget_type === 'basicAlarm' ? alarm : sensor}</Typography>  : <Box>
    //               <Typography sx={{ textAlign: 'center', fontSize: 45, fontWeight: 'bold', }}>{numericValue || 0}</Typography>
    //               <Typography sx={{ textAlign: 'center', fontSize: 30, fontWeight: 'bold', marginTop: 2 }}>{textValue || ''}</Typography> </Box>
    //               }
    //               <sup style={{ position: 'relative', bottom: 25, }}>
    //                 <FormControl sx={{ color: tempCheck.colors }} size="small" variant="outlined">
    //                   <Box onClick={handleClick} size='small' sx={{
    //                     cursor: 'pointer', height: 35, marginTop: '30px',
    //                   }}>
    //                     <sup style={{ fontSize: 18, verticalAlign: 'top', color: tempCheck.colors, }}>{power}</sup>
    //                   </Box>
    //                   {/* <Menu id="temperature-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
    //                     {(() => {
    //                       switch (Data?.gadget_type) {
    //                         case 'basicEnergy':
    //                           return (
    //                             <>
    //                               <MenuItem onClick={() => handleMenuItemClick("Wh")}>Wh</MenuItem>
    //                               <MenuItem onClick={() => handleMenuItemClick("kWh")}>kWh</MenuItem>
    //                             </>
    //                           );
    //                         case 'basicTemp':
    //                           return (
    //                             <>
    //                               <MenuItem onClick={() => handleMenuItemClick("°C")}>°C</MenuItem>
    //                               <MenuItem onClick={() => handleMenuItemClick("°F")}>°F</MenuItem>
    //                               <MenuItem onClick={() => handleMenuItemClick("°K")}>°K</MenuItem>
    //                             </>
    //                           );
    //                         case 'basicPower':
    //                           return (
    //                             <>
    //                               <MenuItem onClick={() => handleMenuItemClick("W")}>W</MenuItem>
    //                               <MenuItem onClick={() => handleMenuItemClick("kW")}>kW</MenuItem>
    //                             </>
    //                           );
    //                         case 'basicHumidity':
    //                           return (
    //                             <>
    //                               <MenuItem onClick={() => handleMenuItemClick("%")}>%</MenuItem>
    //                             </>
    //                           );
    //                         case 'basicCO':
    //                           return (
    //                             <>
    //                               <MenuItem onClick={() => handleMenuItemClick("ppm")}>ppm</MenuItem>
    //                             </>
    //                           );
    //                         case 'basicCO2':
    //                           return (
    //                             <>
    //                               <MenuItem onClick={() => handleMenuItemClick("ppm")}>ppm</MenuItem>
    //                             </>
    //                           );

    //                         case 'basicPressure':
    //                           return (
    //                             <>
    //                               <MenuItem onClick={() => handleMenuItemClick("Pa")}>Pa</MenuItem>
    //                             </>
    //                           );
    //                         case 'basicVibration':
    //                           return (
    //                             <>
    //                               <MenuItem onClick={() => handleMenuItemClick("mm/s")}>mm/s</MenuItem>
    //                             </>
    //                           );
    //                         case 'basicLux':
    //                           return (
    //                             <>
    //                               <MenuItem onClick={() => handleMenuItemClick("LUX")}>lux</MenuItem>
    //                             </>
    //                           );
    //                         case 'basicNoise':
    //                           return (
    //                             <>
    //                               <MenuItem onClick={() => handleMenuItemClick("dB")}>dB</MenuItem>
    //                             </>
    //                           );
    //                           case 'basicFlow':
    //                             return (
    //                               <>
    //                                 <MenuItem onClick={() => handleMenuItemClick("m3/h")}>m3/h</MenuItem>
    //                               </>
    //                             );
    //                             case 'basicHeat':
    //                               return (
    //                                 <>
    //                                   <MenuItem onClick={() => handleMenuItemClick("mJ/h")}>mJ/h</MenuItem>
    //                                 </>
    //                               );
    //                               case 'basicCurrent':
    //                                 return (
    //                                   <>
    //                                     <MenuItem onClick={() => handleMenuItemClick("A")}>A</MenuItem>
    //                                   </>
    //                                 );
    //                                 case 'basicParticle':
    //                                 return (
    //                                   <>
    //                                     <MenuItem onClick={() => handleMenuItemClick("A")}>A</MenuItem>
    //                                   </>
    //                                 );
    //                         default:
    //                           return null;
    //                       }
    //                     })()}
    //                   </Menu> */}
    //                   <Menu id="temperature-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
    //                     {(() => {
    //                       const menuItems = {
    //                         basicEnergy: ["Wh", "kWh"],
    //                         basicTemp: ["°C", "°F", "°K"],
    //                         basicPower: ["W", "kW"],
    //                         basicHumidity: ["%"],
    //                         basicCO: ["ppm"],
    //                         basicCO2: ["ppm"],
    //                         basicPressure: ["Pa"],
    //                         basicVibration: ["mm/s"],
    //                         basicLux: ["lux"],
    //                         basicNoise: ["dB"],
    //                         basicFlow: ["m3/h"],
    //                         basicHeat: ["mJ/h"],
    //                         basicCurrent: ["A"],
    //                         basicValve: ["%"],
    //                       };

    //                       return menuItems[Data?.gadget_type]?.map((unit) => (
    //                         <MenuItem key={unit} onClick={() => handleMenuItemClick(unit)}>
    //                           {unit}
    //                         </MenuItem>
    //                       )) || null;
    //                     })()}
    //                   </Menu>
    //                 </FormControl>
    //               </sup>
    //             </Box>
    //           </Box>
    //           : (
    //             <Box sx={{ display: 'flex', color: tempCheck.colors,position : 'relative', top : 3,  marginLeft: '50px' }}>
    //               {/* <WifiOffIcon className="temperature-icon" width={60} height={60} /> */} <Typography width={60} height={60} fontSize={45} textAlign={'left'} fontWeight={'bold'}>OFF</Typography>
    //             </Box>
    //           )}
    //         <Box ref={ref} sx={{ color: tempCheck.fontColor, width: 200, position : 'relative', bottom : Data?.gadget_type === 'basicSensor' ? 20 : 0 }}>
    //           <ToolTipBox title={`${'デバイス名 : ' + (Data?.meter_name || 'N/A')}`} arrow>
    //             <Typography
    //               sx={{
    //                 textAlign: 'center',
    //                 fontWeight: 'bold',
    //                 whiteSpace: 'nowrap',
    //                 overflow: 'hidden',
    //                 textOverflow: 'ellipsis',
    //               }}
    //             >
    //               {Data?.meter_name.toUpperCase() || 'N/A'}
    //             </Typography>
    //           </ToolTipBox>
    //           {/* <Typography sx={{
    //             textAlign: 'center', fontWeight: 'bold', whiteSpace: 'nowrap',
    //             overflow: 'hidden',
    //             textOverflow: 'ellipsis',
    //           }}>{Data?.node_location_jp || 'フジタ技術センター'}</Typography> */}
    //         </Box>
    //       </Box>
    //     </Box>
    //   </Box>
    // </Card>
    // );
    <Card sx={{ ...styles.thinBorder, width: 250, height: '240px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 4, borderRadius: '20px', bgcolor: '#ECF5FF', borderColor: tempCheck.borderColor, borderWidth: 2 }}>

     <Box ref={ref} sx={{ color: tempCheck.fontColor,  }}>
        <ToolTipBox title={`${'Device Name : ' + (Data?.meter_name || 'N/A')}`} arrow>
          <Typography
            sx={{
              textAlign: 'left',
              fontWeight: 'bold',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              fontSize : 16
            }}
          >
            {Data?.meter_name?.toUpperCase() || 'N/A'}
          </Typography>
        </ToolTipBox>
      </Box>


     <Box sx={{ display: 'flex',justifyContent : 'center', flexDirection: 'column', gap: 2.5, }}>
        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', color: tempCheck.colors, position: 'relative', left: 0, gap: 1 }}>
          {getIcon(Data?.gadget_type)?.render({ width: 32, height: 32, color: tempCheck.colors, })}
          <Typography variant='h6' fontWeight='bold' sx={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}>
            {Data?.gadget_name}
          </Typography>
          {/* {!Number(Data?.status) && <PriorityHighIcon sx={{ position: 'absolute', right: -15, color: blinkColor, width: 32, height: 32 }} />}  */}
        </Box>
      </Box>
      <Box>
        {Data?.meter_reading?.length ?
          <Box>
            <Box sx={{
              display: 'flex', justifyContent: 'center', flexDirection : 'row',
              textAlign: 'center', fontSize: 45, fontWeight: 'bold', color: tempCheck.colors, whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}>
              {(Data?.gadget_type === 'basicAlarm' || Data?.gadget_type === 'basicSensor') ? <Typography sx={{ textAlign: 'center', fontSize: 45, fontWeight: 'bold', }}>{Data?.gadget_type === 'basicAlarm' ? alarm : sensor}</Typography> : <Box sx={{ display : 'flex'}}>
                <Typography sx={{ textAlign: 'center', fontSize: 45, fontWeight: 'bold', }}>{numericValue || 0}</Typography>
                <Typography sx={{ textAlign: 'center', fontSize: 30, fontWeight: 'bold', marginTop: 2 }}>{textValue || ''}</Typography> </Box>
              }
              <sup style={{ position: 'relative', bottom: 25, }}>
                <FormControl sx={{ color: tempCheck.colors }} size="small" variant="outlined">
                  <Box onClick={handleClick} size='small' sx={{
                    cursor: 'pointer', height: 35, marginTop: '30px',
                  }}>
                    <sup style={{ fontSize: 18, verticalAlign: 'top', color: tempCheck.colors, }}>{power}</sup>
                  </Box>
                  <Menu id="temperature-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                    {(() => {
                      const menuItems = {
                        basicEnergy: ["Wh", "kWh"],
                        basicTemp: ["°C", "°F", "°K"],
                        basicPower: ["W", "kW"],
                        basicHumidity: ["%"],
                        basicCO: ["ppm"],
                        basicCO2: ["ppm"],
                        basicPressure: ["Pa"],
                        basicVibration: ["m/s2"],
                        basicLux: ["lux"],
                        basicNoise: ["dBA"],
                        basicFlow: ["m3/h"],
                        basicHeat: ["mJ/h"],
                        basicCurrent: ["A"],
                        basicValve: ["%"],
                        basicParticle: ["ppm"],
                         basicNO2: ["ppm"],
                      };

                      return menuItems[Data?.gadget_type]?.map((unit) => (
                        <MenuItem key={unit} onClick={() => handleMenuItemClick(unit)}>
                          {unit}
                        </MenuItem>
                      )) || null;
                    })()}
                  </Menu>
                </FormControl>
              </sup>
            </Box>
            <Box sx={{
            position: 'relative',
            top: '10px'
            }}>
                    <Typography sx={{textAlign: 'center', fontWeight : 'bold'}} >
                     {Data?.timestamp?.length 
                      ? Data.timestamp[Data.timestamp.length - 1]
                      : ""}
                    </Typography>
            </Box>
            
          </Box>
          : (
            <Box sx={{ display: 'flex', color: tempCheck.colors, justifyContent : 'center'  }}>
              <Typography fontSize={45} textAlign={'center'} fontWeight={'bold'}>OFF</Typography>
            </Box>
          )}
      </Box>
    </Card>
  )
};

export default SmallCard;


