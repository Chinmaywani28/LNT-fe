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

const ValveMediumCard = ({ Data, chartData }) => {
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
            case 'intermidiateVibration': return 'mm/s';
            case 'intermidiateLux': return 'LUX';
            case 'intermidiateNoise': return 'dB';
            case 'intermidiateFlow': return 'm3/h';
            case 'intermidiateHeat': return 'mJ/h';
            case 'intermidiateCurrent': return 'A';
            case 'intermidiateValve': return '%';
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
                case 'mm/s': return value;
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

    const getBorderColor = (data) => {
    return data.map((value) => {
      if (value >= convertedCriticalPower) return "#F26457"; // Red (Critical)
      if (value >= convertedMaxPower) return "#e7af84"; // Orange (Warning)
      if (value >= convertedMinPower) return "#76C739"; // Green (Safe)
      return "#F26457"; // Red (Below Min)
    });
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

    const labelsData = Data?.timestamp?.slice(1) ?? [];
    const dataValuesData = Data?.meter_reading ? convertDataValues(Data?.meter_reading.slice(1), power) : [];

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
                 borderColor: '#76C739',
                // borderColor: chartData ? (context) => {
                //     const chart = context.chart;
                //     const { ctx, chartArea } = chart;
                //     if (!chartArea) {
                //         return null;
                //     }
                //     return getGradient(ctx, chartArea, context.dataset.data);
                // } : '',

                tension: 0.4,
                borderWidth: 4,
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

    const getCriticalValues = (type) => {
        try {
            if (type === ('intermidiateEnergy')) {
                setMinValue(Data?.min_energy);
                setMaxValue(Data?.max_energy);
                setCriticalValue(Data?.critical_energy);
            }

            if (type === ('intermidiatePower')) {
                setMinValue(Data?.min_power);
                setMaxValue(Data?.max_power);
                setCriticalValue(Data?.critical_power);
            }

            if (type === ('intermidiateTemp')) {
                setMinValue(Data?.min_temp);
                setMaxValue(Data?.max_temp);
                setCriticalValue(Data?.critical_temp);
            }

            if (type === ('intermidiateHumidity')) {
                setMinValue(Data?.min_humidity);
                setMaxValue(Data?.max_humidity);
                setCriticalValue(Data?.critical_humidity);
            }

            if (type === ('intermidiateCO')) {
                setMinValue(Data?.min_co);
                setMaxValue(Data?.max_co);
                setCriticalValue(Data?.critical_co);
            }

            if (type === ('intermidiateCO2')) {
                setMinValue(Data?.min_co2);
                setMaxValue(Data?.max_co2);
                setCriticalValue(Data?.critical_co2);
            }

            if (type === ('intermidiatePressure')) {
                setMinValue(Data?.min_pressure);
                setMaxValue(Data?.max_pressure);
                setCriticalValue(Data?.critical_pressure);
            }

            if (type === ('intermidiateVibration')) {
                setMinValue(Data?.min_vibration);
                setMaxValue(Data?.max_vibration);
                setCriticalValue(Data?.critical_vibration);
            }

            if (type === ('intermidiateLux')) {
                setMinValue(Data?.min_lux);
                setMaxValue(Data?.max_lux);
                setCriticalValue(Data?.critical_lux);
            }

            if (type === ('intermidiateNoise')) {
                setMinValue(Data?.min_noise);
                setMaxValue(Data?.max_noise);
                setCriticalValue(Data?.critical_noise);
            }

            if (type === ('intermidiateFlow')) {
                setMinValue(Data?.min_flow);
                setMaxValue(Data?.max_flow);
                setCriticalValue(Data?.critical_flow);
            }

            if (type === ('intermidiateHeat')) {
                setMinValue(Data?.min_heat);
                setMaxValue(Data?.max_heat);
                setCriticalValue(Data?.critical_heat);
            }

            if (type === ('intermidiateCurrent')) {
                setMinValue(Data?.min_current);
                setMaxValue(Data?.max_current);
                setCriticalValue(Data?.critical_current);
            }

            if (type === ('intermidiateParticle')) {
                setMinValue(Data?.min_particle);
                setMaxValue(Data?.max_particle);
                setCriticalValue(Data?.critical_particle);
            }

            if (type === ('intermidiateCheck')) {
                setMinValue(Data?.min_check);
                setMaxValue(Data?.max_check);
                setCriticalValue(Data?.critical_check);
            }

            if (type === ('intermidiateValve')) {
                setMinValue(Data?.min_valve);
                setMaxValue(Data?.max_valve);
                setCriticalValue(Data?.critical_valve);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const getColorSettings = (value) => {
        try {
            // if (!value || (!minValue || !maxValue)) {
            //     return {
            //         bgColor: '#E5EBEB',
            //         borderColor: '#E5EBEB',
            //         colors: '#757676',
            //         fontColor: '#757676',
            //     }
            // }
            // else if (value > minValue && value < maxValue) {

            //     return {
            //         bgColor: '#E9EEEF',
            //         borderColor: '#E9EEEF',
            //         colors: '#006DBC',
            //         fontColor: 'black',
            //     };
            // } else if (value >= maxValue && value < criticalValue) {

            //     return {
            //         bgColor: '#FFF0D9',
            //         borderColor: '#FF740E',
            //         colors: '#FF6B00',
            //         fontColor: '#FF6B00',
            //     };
            // } else if (value >= criticalValue || value <= minValue) {
            //     return {
            //         bgColor: '#FFD9D9',
            //         borderColor: '#FF0E0E',
            //         colors: '#FF0000',
            //         fontColor: '#FF0000',
            //     };
            // }

            return {
                bgColor: '#E9EEEF',
                borderColor: '#E9EEEF',
                colors: '#006DBC',
                fontColor: 'black',
            };
        } catch (error) {
            console.error(error);
        }
    };

    const convertedMinPower = minValue ? convertPower(minValue, power) : null;
    const convertedMaxPower = maxValue ? convertPower(maxValue, power) : null;
    const convertedCriticalPower = criticalValue ? convertPower(criticalValue, power) : null;
    const powerValue = Data?.meter_reading?.length ? Data.meter_reading[Data.meter_reading.length - 1] : 0;
    const convertedValue = Data ? convertPower(powerValue, power) : 0;
    const formattedValue = Data ? formatValue(parseFloat(convertedValue)) : 0;
    const tempCheck = getColorSettings(powerValue);
    const numericValue = formattedValue.match(/(\d+(\.\d+)?)/g)?.join('') || "";
    const textValue = formattedValue.match(/[a-zA-Z]+/g)?.join('') || "";
    // const minRange = Data?.meter_reading ? Math.min(...Data?.meter_reading?.map(item => item)) : undefined;
    // const maxRange = Data?.meter_reading ? Math.max(...Data?.meter_reading?.map(item => item)) : undefined;
    // const step = (maxRange) / 5;

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
                        color: '#9e9e9e',
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
                    // stepSize: (Data?.gadget_type === 'intermidiateHumidity' || Data?.gadget_type === 'intermidiateTemp') ? step : undefined,
                    // min: (Data?.gadget_type === 'intermidiateHumidity' || Data?.gadget_type === 'intermidiateTemp') ? minRange : undefined,
                    // max: Data?.gadget_type === 'intermidiateHumidity' ? maxRange : undefined,
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

    // useEffect(() => {
    //   if (chartRef.current) {
    //     const chartInstance = echarts.init(chartRef.current);

    //     const options = {
    //       title: {
    //         text: `${Data?.gadget_name || 'Device'} (${power || 'W'})`,
    //         left: 'center',
    //       },
    //       tooltip: {
    //         trigger: 'axis',
    //       },
    //       xAxis: {
    //         type: 'category',
    //         data: chartData?.labels || [],
    //       },
    //       yAxis: {
    //         type: 'value',
    //       },
    //       series: [
    //         {
    //           name: `${Data?.gadget_name || 'Device'} (${power || 'W'})`,
    //           type: 'line', // Change to 'bar' for bar chart
    //           smooth: true,
    //           data: chartData?.data || [],
    //           lineStyle: {
    //             color: "#007bff",
    //           },
    //           areaStyle: {
    //             color: "rgba(0, 123, 255, 0.2)",
    //           },
    //           symbol: 'none', // Removes points on the line
    //         },
    //       ],
    //     };

    //     chartInstance.setOption(options);
    //     window.addEventListener("resize", () => chartInstance.resize());

    //     return () => {
    //       chartInstance.dispose();
    //     };
    //   }
    // }, [chartData, Data, power]);

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
        <Card sx={{ ...styles.thinBorder, width: 920, height: '250px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 4, borderRadius: '20px', bgcolor: tempCheck?.bgColor, borderColor: tempCheck?.borderColor, borderWidth: 2 }}>
            <Box ref={ref} sx={{ color: tempCheck?.fontColor, position: 'relative', bottom: 15, gap: 5 }}>
                {/* <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'left', color: tempCheck?.colors, gap: 1, }}>
                    {getIcon(Data?.gadget_type)?.render({ width: 32, height: 32, color: tempCheck?.colors, textAlign: 'left' })}
                    <Typography variant='h6' fontWeight='bold' sx={{
                        textAlign: 'left',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis', width: (Data?.gadget_type === 'intermidiateCO2' || Data?.gadget_type === 'intermidiateCO') ? 205 : null
                    }}>
                        {Data?.gadget_name}
                    </Typography>
                </Box> */}
                <ToolTipBox title={`${'デバイス名 : ' + (Data?.meter_name || 'N/A')}`} arrow>
                    <Typography
                        sx={{
                            textAlign: 'left',
                            fontWeight: 'bold',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            fontSize: 18
                        }}
                    >
                        {Data?.meter_name?.toUpperCase() || 'N/A'}
                    </Typography>
                </ToolTipBox>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', bottom: 65, gap: 1 }}>
                <Box sx={{ height: 290, width: 325, position: 'relative', top: 20, right: 20 }}>
                    <GaugeChart
                        value={powerValue}
                        tempCheck={tempCheck}
                        gadget={Data?.gadget_name}
                        unit={power}
                        range={criticalValue}
                    />
                </Box>
                <Box sx={{ position: 'relative', right: 20 }}>
                    {(Data?.gadget_type === 'intermediateEnergy' && Data?.range !== 'live') ? (
                        <Bar data={dataBar} options={optionsBar} width={600} height={185} />
                    ) : (
                        <Line data={data} options={options} width={600} height={185} />
                    )}
                </Box>
            </Box>
        </Card >
    );
};

export default ValveMediumCard;


