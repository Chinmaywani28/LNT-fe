import React, { useEffect, useState, useRef, useCallback } from "react";
import { Box, Grid, styled } from "@mui/material";
import CardComponent from "../../card/graphcard/card";
import {
  getCompleteGraphConfig,
  getdataEnergyDynamicindi,
  deleteGraphConfig,
  getDeviceInfoIndivisualDeviceCurrent,
  getDeviceCombineIndivisualDeviceCurrent,
  getEnergyDataCombineDynamicallSpecificTable,
  getFloorWiseDeviceImage,
  getDeviceInfoIndivisualDeviceLive,
} from "../../Services/graph.service";
import { chartsObj } from "../../config/chartsConfigObj";
import { energy_day } from "../../Services/congif_energy_combine/config_energy_file";
import { grey } from "@mui/material/colors";
import "./../image.css";
import ImageBox from "./imageComponent";

const ComponentOne = ({
  componentMap,
  isBoxVisible,
  toggleBoxVisibility,
  floorKey,
  imageKey,
}) => {
  const [graphConfig, setGraphConfig] = useState([]);
  const [resultantObj, setresultantObj] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [chartData, setChartData] = useState([]);
  const [chartType, setChartType] = useState([]);
  const [chartSize, setChartSize] = useState([]);
  const allocatedAdmin = sessionStorage.getItem("allocatedAdmin");
  const userId = sessionStorage.getItem("userId");
  const role = sessionStorage.getItem("role");
  const [open, setOpen] = React.useState(false);
  const [image, setImage] = useState(null);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const fetchGraphConfig = async () => {
    try {
      setresultantObj([]);
      setGraphConfig([]);
      setChartData([]);
      let resp;

      resp = await getCompleteGraphConfig(
        userId, componentMap, floorKey
      );

      const filteredgraphData = resp?.result;

      console.log(filteredgraphData,'graphs');
      

      if (resp) {
        setGraphConfig(filteredgraphData);
      }
    } catch (error) {
      setError("Error fetching graph configuration");
    }
  };

  const handleFetchError = (error) => {
    setIsLoading(false);
    setError(error.message || "An error occurred while fetching data");
    return null;
  };

  const fetchEnergyData = async (selectedRange, meterConfig) => {
    try {
      const result = await getdataEnergyDynamicindi(selectedRange, meterConfig);
      const chartData = [result];

      return chartData;
    } catch (error) {
      return handleFetchError(error);
    }
  };

  const fetchPowerData = async (selectedRange, meterConfig) => {
    try {
      const result = await getDeviceInfoIndivisualDeviceCurrent(
        selectedRange,
        meterConfig
      );

      const data = result;
      if (data.length <= 0) throw new Error("No Data Found!");

      const chartData = ["basicPower", "intermidiatePower"].includes(
        meterConfig.chart_type
      )
        ? [result]
        : filterPowerData(result.data);

      return chartData;
    } catch (error) {
      return handleFetchError(error);
    }
  };

  const fetchTemperatureData = async (selectedRange, meterConfig) => {
    try {
      const result = await getDeviceInfoIndivisualDeviceLive(
        selectedRange,
        meterConfig
      );
      const chartData = [result];
      return chartData;
    } catch (error) {
      return handleFetchError(error);
    }
  };

  const fetchCurrentData = async (selectedRange, meterConfig) => {
    try {
      const result = await getDeviceInfoIndivisualDeviceCurrent(
        selectedRange,
        meterConfig
      );
      const chartData = [result];
      return chartData;
    } catch (error) {
      return handleFetchError(error);
    }
  };

  const fetchHumidityData = async (selectedRange, meterConfig) => {
    try {
      const result = await getDeviceInfoIndivisualDeviceLive(
        selectedRange,
        meterConfig
      );
      return [result];
    } catch (error) {
      return handleFetchError(error);
    }
  };

  const fetchCombineData = async (selectedRange) => {
    try {
      const floor = energy_day[componentMap];
      const result = await getDeviceCombineIndivisualDeviceCurrent(
        selectedRange,
        floor
      );

      return [result];
    } catch (error) {
      return handleFetchError(error);
    }
  };

  const fetchCombineDataEnergy = async (selectedRange) => {
    try {

      const floor = energy_day[componentMap];
      const result = await getEnergyDataCombineDynamicallSpecificTable(
        selectedRange,
        floor
      );

      return [result];
    } catch (error) {
      return handleFetchError(error);
    }
  };

  const fetchCharts = useCallback(async () => {
    setIsLoading(true);
    setresultantObj([]);

    if (!graphConfig.length) {
      setIsLoading(false);
      return;
    }

    try {
      const results = await Promise.allSettled(
        graphConfig.map(async (item) => {
          try {
            const meterConfig = renderChart(item);
            let obj = {
              meterConfig,
              chart_type: item.chart_type,
              graph_id: item.graph_id,
              meter_name: item.meter_name,
            };

            let data;
            switch (item.gadget_type) {
              case "temperature":
              case "current":
              case "humidity":
              case "pressure":
              case "co":
              case "co2":
              case "lux":
              case "alarm":
              case "valve":
              case "heat":
              case "flow":
              case "sensor":
              case "vibration":
              case "particle":
              case "noise":
              case "discomfort":
              case "no2":  
              case "gas":
                data = await fetchTemperatureData(
                  item.time_period,
                  meterConfig
                );
                break;
              case "energy":
                data = await fetchEnergyData(item.time_period, meterConfig);
                break;
              case "power":
                data = await fetchPowerData(item.time_period, meterConfig);
                break;
              case "combinePower":
                data = await fetchCombineData(item.time_period);
                obj.meterConfig = { gadget: "Power", meter_name: componentMap };
                break;
              case "combineEnergy":
                data = await fetchCombineDataEnergy(item.time_period);
                obj.meterConfig = { gadget: "Energy", meter_name: componentMap };
                break;
              default:
                console.warn(`Unknown gadget_type: ${item.gadget_type}`);
                return null;
            }

            return { ...obj, energy_data: data };
          } catch (error) {
            setError(error.message || "Error fetching data");
            return null;
          }
        })
      );

      setresultantObj(
        results
          .filter((res) => res.status === "fulfilled" && res.value)
          .map((res) => res.value)
          .sort(
            (a, b) =>
              (a?.chart_type?.length || 0) - (b?.chart_type?.length || 0)
          )
      );
    } catch (error) {
      setError("Error processing chart data");
    } finally {
      setIsLoading(false);
    }
  }, [graphConfig]);

  const renderChart = (meter) => {
    switch (meter.gadget_type) {
      case "alltypes":
      case "energy":
        return {
          dbTable: meter.name_of_table,
          energy: meter.energy_watt_hr,
          chart_type: meter.chart_type,
          range: meter.time_period,
          gadget: meter.gadget_type,
          views: meter.name_of_table + "_energy",
        };
      case "temperature":
        return {
          dbTable: meter.name_of_table,
          temperature: meter.temperature_c,
          parameter: meter.temperature_c,
          range: meter.time_period,
          gadget: meter.gadget_type,
          views: meter.name_of_table + "_temp",
        };
      case "power":
        return {
          dbTable: meter.name_of_table,
          power: meter.power_watt,
          parameter: meter.power_watt,
          chart_type: meter.chart_type,
          range: meter.time_period,
          gadget: meter.gadget_type,
          views: meter.name_of_table + "_power",
        };

      case "humidity":
        return {
          dbTable: meter.name_of_table,
          humidity: meter.humidity_g_m3,
          parameter: meter.humidity_g_m3,
          range: meter.time_period,
          gadget: meter.gadget_type,
          views: meter.name_of_table + "_hum",
        };

      case "pressure":
        return {
          dbTable: meter.name_of_table,
          pressure: meter.pressure_p,
          parameter: meter.pressure_p,
          range: meter.time_period,
          gadget: meter.gadget_type,
        };

      case "co":
        return {
          dbTable: meter.name_of_table,
          co: meter.co_p,
          parameter: meter.co,
          range: meter.time_period,
          gadget: meter.gadget_type
        };

      case "co2":
        return {
          dbTable: meter.name_of_table,
          co: meter.co2_p,
          parameter: meter.co2_p,
          range: meter.time_period,
          gadget: 'CO₂',
        };

      case "lux":
        return {
          dbTable: meter.name_of_table,
          lux: meter.lux_l,
          parameter: meter.lux_l,
          range: meter.time_period,
          gadget: meter.gadget_type,
        };

      case "noise":
        return {
          dbTable: meter.name_of_table,
          aud: meter.aud_db,
          parameter: meter.aud_db,
          range: meter.time_period,
          gadget: meter.gadget_type,
        };

      case "vibration":
        return {
          dbTable: meter.name_of_table,
          vib: meter.vib_mm_s,
          parameter: meter.vib_mm_s,
          range: meter.time_period,
          gadget: meter.gadget_type,
        };

      case "valve":
        return {
          dbTable: meter.name_of_table,
          valve: meter.valve_position,
          parameter: meter.valve_position,
          range: meter.time_period,
          gadget: meter.gadget_type,
        };

      case "check":
        return {
          dbTable: meter.name_of_table,
          check: meter.check,
          parameter: meter.check,
          range: meter.time_period,
          gadget: meter.gadget_type,
        };

      case "particle":
        return {
          dbTable: meter.name_of_table,
          particle: meter.particle,
          parameter: meter.particle,
          range: meter.time_period,
          gadget: 'OZONE',
        };

      case "current":
        return {
          dbTable: meter.name_of_table,
          current: meter.current_a,
          parameter: meter.current_a,
          range: meter.time_period,
          gadget: meter.gadget_type,
        };

      case "flow":
        return {
          dbTable: meter.name_of_table,
          flow: meter.flow_control,
          parameter: meter.flow_control,
          range: meter.time_period,
          gadget: meter.gadget_type,
        };

      case "sensor":
        return {
          dbTable: meter.name_of_table,
          sensor: meter.sensor_status,
          parameter: meter.sensor_status,
          range: meter.time_period,
          gadget: meter.gadget_type,
        };

      case "alarm":
        return {
          dbTable: meter.name_of_table,
          alarm: meter.alarm_status,
          parameter: meter.alarm_status,
          range: meter.time_period,
          gadget: meter.gadget_type,
        };

      case "heat":
        return {
          dbTable: meter.name_of_table,
          heat: meter.heat_joules,
          parameter: meter.heat_joules,
          range: meter.time_period,
          gadget: meter.gadget_type,
        };

      case "discomfort":
        return {
          dbTable: meter.name_of_table,
          discomfort: meter.discomfort_index,
          parameter: meter.discomfort_index,
          range: meter.time_period,
          gadget: meter.gadget_type,
        };

       case "no2":
        return {
          dbTable: meter.name_of_table,
          no2: meter.no2_p,
          parameter: meter.no2_p,
          range: meter.time_period,
          gadget: meter.gadget_type,
        };
        
         case "gas":
        return {
          dbTable: meter.name_of_table,
          gas: meter.gas_detector,
          parameter: meter.gas_detector,
          range: meter.time_period,
          gadget: meter.gadget_type,
        };

      default:
        return {};
    }
  };

  const filterPowerData = (data) => {
    const filter = data.timestamp
      .splice(1)
      .map((timestamp, index) => [timestamp, data.meter_reading[index + 1]]);

    return filter;
  };

  const handleRemoveGadget = async (graph_id) => {
    try {
      const resp = await deleteGraphConfig(graph_id);
      if (resp) {
        fetchGraphConfig();
      }
    } catch (error) {
      console.error("Error deleting gadget: " + error);
    }
  };

  const styles = {
    thinBorder: {
      border: "0.5px solid #E5E7EB",
      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.08)",
      backgroundColor: "rgba(255, 255, 255, 0.5)",
    },
    slidingBox: {
      transition: "0.3s ease-in-out",
      backgroundColor: "transparent",
      width: "100%",
      opacity: isBoxVisible ? 1 : 0,
      transform: isBoxVisible ? "translateY(0)" : "translateY(-100%)",
      display: "flex",
      alignItems: "center",
      padding: 1,
      borderRadius: 2,
      pointerEvents: "auto",
      zIndex: 10,
    },
  };

  const Puller = styled("div")(({ theme }) => ({
    transition: "all 10s ease-in-out",
    transform: isBoxVisible ? "translateY(0)" : "translateY(-100%)",
    width: 30,
    height: 6,
    backgroundColor: grey[500],
    borderRadius: 3,
    position: "absolute",
    top: isBoxVisible ? 520 : 115,
    left: "calc(50% - 15px)",
    ...theme.applyStyles("dark", {
      backgroundColor: grey[900],
    }),
    cursor: "pointer",
    pointerEvents: "auto",
    zIndex: 10,
  }));

  const fetchFloorWiseImage = async () => {
    try {
      setImage(null);
      const resp = await getFloorWiseDeviceImage(floorKey);
      if (resp) {
        setImage(resp?.filePath);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchGraphConfig();
  }, [floorKey, componentMap]);


  useEffect(() => {
    if (!graphConfig || graphConfig.length === 0) {
      setError("No Graphs Available");
      setresultantObj([]);
      return;
    }
    fetchCharts();
  }, [graphConfig]);

  useEffect(() => {
    fetchFloorWiseImage();
  }, [imageKey]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
        py : 2
      }}
    >
      <Box sx={styles.slidingBox}>
        <ImageBox image={image} />
        {isBoxVisible && <Puller onClick={() => toggleBoxVisibility()} />}
      </Box>

      <Grid
        container
        spacing={1}
        paddingX={isBoxVisible ? "25px" : "25px"}
        paddingY={isBoxVisible ? "25px" : 1}
        position="relative"
        top={isBoxVisible ? 0 : -515}
        transition="all 0.5s ease-in-out"
        transform={isBoxVisible ? "translateY(0)" : "translateY(-100%)"}
      >
        {resultantObj?.map((data, index) => {
          const chartConfig = chartsObj?.find(
            (chart) => chart.chartId === data.chart_type
          );
          if (chartConfig) {
            if (data) {
              return (

                <Grid item key={data?.graph_id}>
                  <CardComponent
                    key={data?.graph_id}
                    Data={
                      data?.energy_data !== null
                        ? [
                          Object?.assign({}, data?.energy_data[0], {
                            range: data?.meterConfig?.range,
                            gadget_type: data?.chart_type,
                            gadget_name:
                              data?.meterConfig?.gadget
                                ?.charAt(0)
                                ?.toUpperCase() +
                              data?.meterConfig?.gadget?.slice(1),
                          }),
                        ]
                        : [
                          {
                            meter_name: data?.meter_name,
                            range: data?.meterConfig?.range,
                            gadget_type: data?.chart_type,
                            gadget_name:
                              data?.meterConfig?.gadget
                                ?.charAt(0)
                                ?.toUpperCase() +
                              data?.meterConfig?.gadget?.slice(1),
                          },
                        ]
                    }
                    chartConfig={chartConfig}
                    chartTitle={data?.meter_name}
                    removeGadget={handleRemoveGadget}
                    index={data?.key}
                    compData={data}
                  />
                </Grid>


              );
            } else {
              return (

                <Grid item key={data?.graph_id}>

                  <CardComponent
                    key={data?.graph_id}
                    chartData={
                      data?.energy_data !== null
                        ? [
                          Object?.assign({}, data?.energy_data[0], {
                            range: data?.meterConfig?.range,
                            gadget_type: chartType,
                          }),
                        ]
                        : [
                          {
                            meter_name: data?.meter_name,
                            range: data?.meterConfig?.range,
                          },
                        ]
                    }
                    chartTitle={data.meter_name}
                    chartConfig={chartConfig}
                    chartHeight={chartSize[data?.key]?.height}
                    chartWidth={chartSize[data?.key]?.width}
                    removeGadget={handleRemoveGadget}
                    index={data?.key}
                    compData={data}
                  />

                </Grid>
              );
            }
          }
          return null;
        })}
      </Grid>
    </Box>
  );
};

export default ComponentOne;
