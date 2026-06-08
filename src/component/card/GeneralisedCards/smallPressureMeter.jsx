import { Box, Card, CardContent, IconButton, Typography, Tooltip as ToolTipBox, Menu, MenuItem, FormControl } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { ReactComponent as PressureIcon } from "../../config/svgfiles/clock.svg";
import { ReactComponent as WifiOffIcon } from "../../config/svgfiles/wifi-off.svg";
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js';
import './pressure.css'
import { useFitText } from '../../config/fontResizeConfig';
import { iconsCon } from '../../config/iconsConfig';
import GaugeChart from './gauge';

const SmallPressureMeter = ({ Data, chartData }) => {

    const getConversion = (type) => {
        switch (type) {
            case 'basicEnergy': return 'kWh';
            case 'basicPower': return 'kW';
            case 'basicTemp': return '°C';
            case 'basicHumidity': return '%';
            case 'basicCO': return 'ppm';
            case 'basicCO2': return 'ppm';
            case 'basicPressure': return 'Pa';
            case 'basicValveMeter': return '%';
            case 'basicVibration': return 'mm/s';
            case 'basicLux': return 'lux';
            case 'basicNoise': return 'dB';
            default: return '';
        }
    };

    const [power, setpower] = useState();
    const [minValue, setMinValue] = useState(null);
    const [maxValue, setMaxValue] = useState(null);
    const [criticalValue, setCriticalValue] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const { ref } = useFitText();

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
            case 'mm/s': return value;
            case 'lux': return value;
            case 'dB': return value;
            default:
                return value;
        }
    };

    const formatValue = (value) => {
        if (value == null || isNaN(value)) {
            return '0'; // Return default '0' for undefined, null, or NaN values
        }

        if (value >= 1_000_000_000) {
            return (value / 1_000_000_000)?.toFixed(1) + 'b';
        } else if (value >= 1_000_000) {
            return (value / 1_000_000)?.toFixed(1) + 'm';
        } else if (value >= 1_000) {
            return (value / 1_000)?.toFixed(1) + 'k';
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
      }

    // const getColorSettings = (value) => {
    //     if (value <= 60) {
    //         return { bgColor: "#E9EEEF", borderColor: '#E9EEEF', colors: '#006DBC', fontColor: '#878A8B', fillCol: '#0477BF' };
    //     } else if (value > 60 && value < 85) {
    //         return { bgColor: '#FFF0D9', borderColor: '#FF740E', colors: '#FF6B00', fontColor: '#FF6B00', fillCol: '#F25C05' };
    //     } else if (value >= 85) {
    //         return { bgColor: '#FFD9D9', borderColor: '#FF0E0E', colors: '#FF0000', fontColor: '#FF0000', fillCol: '#F20505' };
    //     }
    //     return { bgColor: '#E5EBEB', borderColor: '#E5EBEB', colors: '#757676', fontColor: '#757676', fillCol: '#D6D6D6' };
    // };

    const getColorSettings = (value) => {
        // if (!value || (!minValue || !maxValue)) {
        //   return {
        //     bgColor: '#E5EBEB',
        //     borderColor: '#E5EBEB',
        //     colors: '#757676',
        //     fontColor: '#757676',
        //   };
        // }

        if (value >= minValue && value < maxValue) {
            // console.log(value,minValue,maxValue,1);
            
            return {
                bgColor: '#E9EEEF',
                borderColor: '#E9EEEF',
                colors: '#006DBC',
                fontColor: '#878A8B',
                fillCol: '#0477BF'
            };
        } else if (value >= maxValue && value < criticalValue) {
            // console.log(2);
            
            return {
                bgColor: '#FFF0D9',
                borderColor: '#FF740E',
                colors: '#FF6B00',
                fontColor: '#FF6B00',
                fillCol: '#F25C05'
            };
        } else if (value >= criticalValue || value <= minValue) {
            // console.log(3);
            
            return {
                bgColor: '#FFD9D9',
                borderColor: '#FF0E0E',
                colors: '#FF0000',
                fontColor: '#FF0000',
                fillCol: '#F20505'
            };
        } else {
            return {
                bgColor: '#E5EBEB',
                borderColor: '#E5EBEB',
                colors: '#757676',
                fontColor: '#757676',
                fillCol: '#D6D6D6'
            };
        }
    };

    const convertDataValues = (values, unit) => {
        try {
            if (!Array.isArray(values)) return [];
            return values?.map(value => convertPower(value, unit));
        } catch (error) {
            console.error(error);
        }
    };

    const labelsData = Data?.timestamp?.slice(1) ?? [];
    const dataValuesData = Data?.meter_reading ? convertDataValues(Data?.meter_reading?.slice(1), power) : [];

    chartData = {
        labels: labelsData,
        data: dataValuesData,
    };

    const powerValue = Data?.meter_reading?.length ? Data.meter_reading[Data.meter_reading.length - 1] : 0;
    const convertedValue = Data ? convertPower(powerValue, power) : 0;
    const formattedValue = Data ? formatValue(parseFloat(convertedValue)) : 0;
    const tempCheck = getColorSettings(powerValue);

    const numericValue = formattedValue?.match(/(\d+(\.\d+)?)/g)?.join('') || "";
    const textValue = formattedValue?.match(/[a-zA-Z]+/g)?.join('') || "";

    const filledPercentage = Math.min((powerValue / criticalValue) * 100, 100);
    const emptyPercentage = 100 - filledPercentage;

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

        if (type === ('basicPressureMeter')) {
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
    }

    const data = {
        datasets: [
            {
                data: [filledPercentage, emptyPercentage], // 75% filled, 25% empty
                backgroundColor: [`${tempCheck.fillCol}`, `#CCCCCC`], // Green for filled, grey for empty
                borderWidth: 0,
                borderColor: `#E5E7EB`,
                cutout: '90%', // This makes the chart look like a gauge
                rotation: -117, // Rotate to start from the top
                circumference: 235, // Display only 75% of the chart (270 degrees)
            },
        ],
    };

    const dataBar = {
        labels: chartData?.labels || '',
        datasets: [
            {
                label: `${Data?.gadget_name} (${power})`,
                data: chartData?.data || '',
                backgroundColor: chartData ? (context) => {
                    const chart = context.chart;
                    const { ctx, chartArea } = chart;
                    if (!chartArea) {
                        return null;
                    }
                    return getGradient(ctx, chartArea, context.dataset.data);
                } : '',
                tension: 0.4,
                fill: true,
                pointRadius: 0,
                pointHoverRadius: 0,
            },
        ],
    };

    const convertedMinPower = minValue ? convertPower(minValue, power) : null;
    const convertedMaxPower = maxValue ? convertPower(maxValue, power) : null;
    const convertedCriticalPower = criticalValue ? convertPower(criticalValue, power) : null;

    function getGradient(ctx, chartArea, data) {
        try {
            if (!Data || !Array.isArray(data)) {
                console.error("Data object or required properties are missing.");
                return ctx.createLinearGradient(chartArea.left, 0, chartArea.right, 0);
            }

            const minValue = Math.min(...data);
            const maxValue = Math.max(...data);

            if (minValue === maxValue || isNaN(minValue) || isNaN(maxValue)) {
                return ctx.createLinearGradient(chartArea.left, 0, chartArea.right, 0);
            }

            const sortedData = [...data].sort((a, b) => a - b);

            const colorScale = (value) => {
                if (!minValue || !maxValue || !criticalValue) {
                    return '#757676'
                }

                if (value > convertedMinPower && value < convertedMaxPower) {
                    return '#76C739'; // Green
                } else if (value >= convertedMaxPower && value < convertedCriticalPower) {
                    return '#e7af84'; // Orange
                } else if (value >= convertedCriticalPower || value <= convertedMinPower) {
                    return '#F26457'; // Red
                }
            };

            const gradient = ctx.createLinearGradient(chartArea.left, 0, chartArea.right, 0);

            sortedData.forEach((value) => {
                const position = (value - minValue) / (maxValue - minValue);
                const clampedPosition = Math.max(0, Math.min(1, position));
                gradient.addColorStop(clampedPosition, colorScale(value));
            });

            return gradient;
        } catch (error) {
            console.error(error);
        }
    }

    const options = {
        rotation: -130, // Start angle for the gauge
        circumference: 260, // Sweep angle for the gauge (270 degrees = 75%)
        plugins: {
            tooltip: { enabled: false }, // Disable tooltips
        },
        responsive: true,
        maintainAspectRatio: false,
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
                        color: '#9e9e9e',
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

    useEffect(() => {
        if (Data?.gadget_type) {
            setpower(getConversion(Data.gadget_type));
        }

        getCriticalValues(Data?.gadget_type)
    }, [Data]);

    return (
        <Card sx={{ ...styles.thinBorder, width: '300px', height: '250px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 5, borderRadius: '20px', bgcolor: "#F1F4F5", borderWidth: 2 }}>
            <CardContent sx={{ position: 'relative', }}>
                {
                    Data?.meter_reading?.length ? <Box sx={{ position: 'relative', bottom: 80, right: 70, height: 290, width: 325 }}>
                        <GaugeChart value={powerValue} tempCheck={tempCheck} gadget={Data?.gadget_name} unit={power} range={criticalValue} />
                    </Box> : <Box></Box>
                }
                <Box sx={{ position: 'absolute', textAlign: 'center', left: 0, right: 0, top: 45 }}>
                    {!Data?.meter_reading?.length ? <Box sx={{ display: 'flex', color: tempCheck.colors, justifyContent: 'center' }}>
                        <Typography fontSize={45} textAlign={'center'} fontWeight={'bold'}>OFF</Typography>
                    </Box> : <Box></Box>}
                    <Box ref={ref} sx={{ color: '#9D9D9D', width: 200, position: 'relative',top : Data?.meter_reading?.length ? 115 : 40 }}>
                        <ToolTipBox title={`${'デバイス名 : ' + (Data?.meter_name || 'N/A')} ${'位置 : ' + (Data?.node_location_jp || 'フジタ技術センター')}`} arrow>
                            <Typography
                                sx={{
                                    textAlign: 'center',
                                    fontWeight: 'bold',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                }}
                            >
                                {Data?.meter_name}
                            </Typography>
                        </ToolTipBox>
                    </Box>
                </Box>
            </CardContent>
        </Card >
    );
};

export default SmallPressureMeter;

