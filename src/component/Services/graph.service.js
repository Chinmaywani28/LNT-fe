import { sankey_monthly } from "./sankey/sankeyConfig";
import axios from "axios";
import { imageConfig } from "../config/imageConfig";
import { sankey_monthly_syd } from "../config/sankeyConfigSydGen";
const apiUrl = process.env.REACT_APP_API_URL;

export const addGraphConfig = async (graphConfig) => {
  try {
    const token = sessionStorage.getItem("token");
    const resp = await axios.post(
      `${apiUrl}/graphservice/addGraphConfig`,
      graphConfig,
      {
        headers: {
          Authorization: token,
        },
      }
    );

    if (resp.status === 200) {
      return resp.data;
    } else {
      return null;
    }
  } catch (error) {
    //console.error("Error inserting graphconfig in service : ", error);
    throw error;
  }
};

export const getCompleteGraphConfig = async (userId, componentMap,floorKey) => {
  try {
    const token = sessionStorage.getItem("token");
    const resp = await axios.get(
      `${apiUrl}/graphservice/getCompleteGraphConfig`,
      {
        headers: {
          Authorization: token,
        },
        params: {
          userId,
          componentMap,
          floorKey
        },
      }
    );

    if (resp.status === 200) {
      return resp.data;
    } else {
      return null;
    }
  } catch (error) {
    //console.error("Error fetching graphconfig in service : ", error);
    throw error;
  }
};

// export const getCompleteGraphConfigUser = async () => {
//   try {
//     const token = sessionStorage.getItem("token");
//     const resp = await axios.get(
//       `${apiUrl}/graphservice/getCompleteGraphConfigUser`,
//       {
//         headers: {
//           Authorization: token,
//         },
//       }
//     );

//     if (resp.status === 200) {
//       return resp.data;
//     } else {
//       return null;
//     }
//   } catch (error) {
//     console.error("Error fetching graphconfig in service : ", error);
//   }
// };

export const deleteGraphConfig = async (graph_id) => {
  try {
    const token = sessionStorage.getItem("token");
    const resp = await axios.delete(
      `${apiUrl}/graphservice/deleteGraphConfig`,
      {
        headers: {
          Authorization: token,
        },
        params: {
          graph_id,
        },
      }
    );

    if (resp.status === 200) {
      return resp.data;
    } else {
      return null;
    }
  } catch (error) {
    //console.error("Error deleting graph config in service:", error.message);
    return null;
  }
};

export const getdataEnergyDynamicindi = async (selectedRange, meterConfig) => {
  try {
    const token = sessionStorage.getItem("token");
    const resp = await axios.get(
      `${apiUrl}/graphDataservice/getEnergyDataDynamicallSpecificTable`,
      {
        headers: {
          Authorization: token,
        },
        params: {
          range: selectedRange,
          meterConfig: meterConfig,
        },
      }
    );
    return resp.data;
  } catch (error) {
    //console.error("Error fetching data:", error);
    throw error; // rethrow the error to handle it in the calling code
  }
};

export const getdata10minSelectedMeter = async (selectedRange, meterConfig) => {
  try {
    const token = sessionStorage.getItem("token");
    const resp = await axios.get(
      `${apiUrl}/graphDataservice/getPowerTrendlineDynamically`,
      {
        headers: {
          Authorization: token,
        },
        params: {
          range: selectedRange,
          meterConfig: meterConfig,
        },
      }
    );
    return resp.data;
  } catch (error) {
    //console.error("Error fetching data:", error);
    throw error;
  }
};

export const getTempInfoIndivisualDeviceCurrent = async (
  selectedRange,
  meterConfig
) => {
  try {
    const token = sessionStorage.getItem("token");
    const resp = await axios.get(
      `${apiUrl}/graphDataservice/getTempInfoIndivisualDeviceCurrent`,
      {
        headers: {
          Authorization: token,
        },
        params: {
          range: selectedRange,
          meterConfig: meterConfig,
        },
      }
    );
    if (resp.status === 200) {
      return resp.data.data;
    } else {
      return null;
    }
  } catch (error) {
    //console.error("Error fetching data:", error);
    throw error;
  }
};

export const getHumidityInfoIndivisualDeviceCurrent = async (
  selectedRange,
  meterConfig
) => {
  try {
    const token = sessionStorage.getItem("token");
    const resp = await axios.get(
      `${apiUrl}/graphDataservice/getHumidityInfoIndivisualDeviceCurrent`,
      {
        headers: {
          Authorization: token,
        },
        params: {
          range: selectedRange,
          meterConfig: meterConfig,
        },
      }
    );
    if (resp.status === 200) {
      return resp.data.data;
    } else {
      return null;
    }
  } catch (error) {
    //console.error("Error fetching data:", error);
    throw error;
  }
};

export const getDeviceInfoIndivisualDeviceCurrent = async (
  selectedRange,
  meterConfig
) => {
  try {
    const token = sessionStorage.getItem("token");
    const resp = await axios.get(
      `${apiUrl}/graphDataservice/getDeviceInfoIndivisualDeviceCurrent`,
      {
        headers: {
          Authorization: token,
        },
        params: {
          range: selectedRange,
          meterConfig: meterConfig,
        },
      }
    );
    if (resp.status === 200) {
      return resp.data.data;
    } else {
      return null;
    }
  } catch (error) {
    //console.error("Error fetching data:", error);
    throw error;
  }
};

export const getDeviceInfoIndivisualDeviceLive = async (
  selectedRange,
  meterConfig
) => {
  try {
    const token = sessionStorage.getItem("token");
    const resp = await axios.get(
      `${apiUrl}/graphDataservice/getDeviceInfoIndivisualDevicelive`,
      {
        headers: {
          Authorization: token,
        },
        params: {
          range: selectedRange,
          meterConfig: meterConfig,
        },
      }
    );
    if (resp.status === 200) {
      return resp.data.data;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const getDeviceCombineIndivisualDeviceCurrent = async (
  selectedRange,
  meterConfig
) => {
  try {
    const token = sessionStorage.getItem("token");
    const resp = await axios.get(
      `${apiUrl}/graphDataservice/getDeviceCombineIndivisualDeviceCurrent`,
      {
        headers: {
          Authorization: token,
        },
        params: {
          range: selectedRange,
          meterConfig: meterConfig,
        },
      }
    );
    if (resp.status === 200) {
      return resp.data.data;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const getEnergyDataCombineDynamicallSpecificTable = async (
  selectedRange,
  meterConfig
) => {
  try {
    const token = sessionStorage.getItem("token");
    const resp = await axios.get(
      `${apiUrl}/graphDataservice/getEnergyDataCombineDynamicallSpecificTable`,
      {
        headers: {
          Authorization: token,
        },
        params: {
          range: selectedRange,
          meterConfig: meterConfig,
        },
      }
    );
    if (resp.status === 200) {
      return resp.data.data;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const getMainMeterdatabybuilding = async () => {
  try {
    const token = sessionStorage.getItem("token");
    const resp = await axios.get(
      `${apiUrl}/energymeter/MainMeterdatabybuildingMonthly`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return resp.data;
  } catch (error) {
    throw error;
  }
};

export const getDgmonthlyProduce = async () => {
  try {
    const token = sessionStorage.getItem("token");
    const resp = await axios.get(`${apiUrl}/energy/getDgMonthlyProduceData`, {
      headers: {
        Authorization: token,
      },
    });
    return resp.data;
  } catch (error) {
   // console.error("Error fetching data:", error);
    throw error; // rethrow the error to handle it in the calling code
  }
};

export const getdgdataevery5min = async () => {
  try {
    const token = sessionStorage.getItem("token");
    const resp = await axios.get(`${apiUrl}/energy/getDgDataEvery5Min`, {
      headers: {
        Authorization: token,
      },
    });
    return resp.data;
  } catch (error) {
    //console.error(error);
    throw error;
  }
};

export const getSolarPowerCombineEnergy = async () => {
  try {
    const token = sessionStorage.getItem("token");
    let selectedRange = "month";
    let meterConfig = sankey_monthly.Solar;
    const resp = await axios.get(
      `${apiUrl}/graphDataservice/getEnergyDataCombineDynamicallSpecificTable`,
      {
        headers: {
          Authorization: token,
        },
        params: {
          range: selectedRange,
          meterConfig: meterConfig,
        },
      }
    );
    if (resp.status === 200) {
      return resp.data.data;
    } else {
      return null;
    }
  } catch (error) {
    //console.error("Error fetching data:", error);
    throw error;
  }
};
export const get1FfloorCombineEnergy = async () => {
  try {
    const token = sessionStorage.getItem("token");
    let selectedRange = "month";
    let meterConfig = sankey_monthly["1F"];
    const resp = await axios.get(
      `${apiUrl}/graphDataservice/getEnergyDataCombineDynamicallSpecificTable`,
      {
        headers: {
          Authorization: token,
        },
        params: {
          range: selectedRange,
          meterConfig: meterConfig,
        },
      }
    );
    if (resp.status === 200) {
      return resp.data.data;
    } else {
      return null;
    }
  } catch (error) {
   //console.error("Error fetching data:", error);
    throw error;
  }
};
export const get2FfloorCombineEnergy = async () => {
  try {
    const token = sessionStorage.getItem("token");
    let selectedRange = "month";
    let meterConfig = sankey_monthly["2F"];
    const resp = await axios.get(
      `${apiUrl}/graphDataservice/getEnergyDataCombineDynamicallSpecificTable`,
      {
        headers: {
          Authorization: token,
        },
        params: {
          range: selectedRange,
          meterConfig: meterConfig,
        },
      }
    );
    if (resp.status === 200) {
      return resp.data.data;
    } else {
      return null;
    }
  } catch (error) {
   //console.error("Error fetching data:", error);
    throw error;
  }
};
export const get3FfloorCombineEnergy = async () => {
  try {
    const token = sessionStorage.getItem("token");
    let selectedRange = "month";
    let meterConfig = sankey_monthly["3F"];
    const resp = await axios.get(
      `${apiUrl}/graphDataservice/getEnergyDataCombineDynamicallSpecificTable`,
      {
        headers: {
          Authorization: token,
        },
        params: {
          range: selectedRange,
          meterConfig: meterConfig,
        },
      }
    );
    if (resp.status === 200) {
      return resp.data.data;
    } else {
      return null;
    }
  } catch (error) {
    //console.error("Error fetching data:", error);
    throw error;
  }
};

export const getEVStationCombineEnergy = async () => {
  try {
    const token = sessionStorage.getItem("token");
    let selectedRange = "month";
    let meterConfig = sankey_monthly["EV Station"];
    const resp = await axios.get(
      `${apiUrl}/graphDataservice/getEnergyDataCombineDynamicallSpecificTable`,
      {
        headers: {
          Authorization: token,
        },
        params: {
          range: selectedRange,
          meterConfig: meterConfig,
        },
      }
    );
    if (resp.status === 200) {
      return resp.data.data;
    } else {
      return null;
    }
  } catch (error) {
   // console.error("Error fetching data:", error);
    throw error;
  }
};
export const getFireHydrantCombineEnergy = async () => {
  try {
    const token = sessionStorage.getItem("token");
    let selectedRange = "month";
    let meterConfig = sankey_monthly["Fire Hydrant"];
    const resp = await axios.get(
      `${apiUrl}/graphDataservice/getEnergyDataCombineDynamicallSpecificTable`,
      {
        headers: {
          Authorization: token,
        },
        params: {
          range: selectedRange,
          meterConfig: meterConfig,
        },
      }
    );
    if (resp.status === 200) {
      return resp.data.data;
    } else {
      return null;
    }
  } catch (error) {
    //console.error("Error fetching data:", error);
    throw error;
  }
};
export const getUPSCombineEnergy = async () => {
  try {
    const token = sessionStorage.getItem("token");
    let selectedRange = "month";
    let meterConfig = sankey_monthly["UPS"];
    const resp = await axios.get(
      `${apiUrl}/graphDataservice/getEnergyDataCombineDynamicallSpecificTable`,
      {
        headers: {
          Authorization: token,
        },
        params: {
          range: selectedRange,
          meterConfig: meterConfig,
        },
      }
    );
    if (resp.status === 200) {
      return resp.data.data;
    } else {
      return null;
    }
  } catch (error) {
   // console.error("Error fetching data:", error);
    throw error;
  }
};
export const getPowerGridCombineEnergy = async () => {
  try {
    const token = sessionStorage.getItem("token");
    let selectedRange = "month";
    let meterConfig = sankey_monthly.PowerGrid;
    const resp = await axios.get(
      `${apiUrl}/graphDataservice/getEnergyDataCombineDynamicallSpecificTable`,
      {
        headers: {
          Authorization: token,
        },
        params: {
          range: selectedRange,
          meterConfig: meterConfig,
        },
      }
    );
    if (resp.status === 200) {
      return resp.data.data;
    } else {
      return null;
    }
  } catch (error) {
   // console.error("Error fetching data:", error);
    throw error;
  }
};

export const getSolarPowerCombineEnergySankey = async () => {
  try {
    const token = sessionStorage.getItem("token");
    let selectedRange = "month";
    let meterConfig = sankey_monthly.Solar;
    const resp = await axios.get(
      `${apiUrl}/graphDataservice/getEnergyDataCombineDynamicallSpecificTable_sankey`,
      {
        headers: {
          Authorization: token,
        },
        params: {
          range: selectedRange,
          meterConfig: meterConfig,
        },
      }
    );
    if (resp.status === 200) {
      return resp.data.data;
    } else {
      return null;
    }
  } catch (error) {
    //console.error("Error fetching data:", error);
    throw error;
  }
};
export const get1FfloorCombineEnergySankey = async () => {
  try {
    const token = sessionStorage.getItem("token");
    let selectedRange = "month";
    let meterConfig = sankey_monthly["1F"];
    const resp = await axios.get(
      `${apiUrl}/graphDataservice/getEnergyDataCombineDynamicallSpecificTable_sankey`,
      {
        headers: {
          Authorization: token,
        },
        params: {
          range: selectedRange,
          meterConfig: meterConfig,
        },
      }
    );
    if (resp.status === 200) {
      return resp.data.data;
    } else {
      return null;
    }
  } catch (error) {
    //console.error("Error fetching data:", error);
    throw error;
  }
};
export const get2FfloorCombineEnergySankey = async () => {
  try {
    const token = sessionStorage.getItem("token");
    let selectedRange = "month";
    let meterConfig = sankey_monthly["2F"];
    const resp = await axios.get(
      `${apiUrl}/graphDataservice/getEnergyDataCombineDynamicallSpecificTable_sankey`,
      {
        headers: {
          Authorization: token,
        },
        params: {
          range: selectedRange,
          meterConfig: meterConfig,
        },
      }
    );
    if (resp.status === 200) {
      return resp.data.data;
    } else {
      return null;
    }
  } catch (error) {
    //console.error("Error fetching data:", error);
    throw error;
  }
};
export const get3FfloorCombineEnergySankey = async () => {
  try {
    const token = sessionStorage.getItem("token");
    let selectedRange = "month";
    let meterConfig = sankey_monthly["3F"];
    const resp = await axios.get(
      `${apiUrl}/graphDataservice/getEnergyDataCombineDynamicallSpecificTable_sankey`,
      {
        headers: {
          Authorization: token,
        },
        params: {
          range: selectedRange,
          meterConfig: meterConfig,
        },
      }
    );
    if (resp.status === 200) {
      return resp.data.data;
    } else {
      return null;
    }
  } catch (error) {
    //console.error("Error fetching data:", error);
    throw error;
  }
};

export const getEVStationCombineEnergySankey = async () => {
  try {
    const token = sessionStorage.getItem("token");
    let selectedRange = "month";
    let meterConfig = sankey_monthly["EV Station"];
    const resp = await axios.get(
      `${apiUrl}/graphDataservice/getEnergyDataCombineDynamicallSpecificTable_sankey`,
      {
        headers: {
          Authorization: token,
        },
        params: {
          range: selectedRange,
          meterConfig: meterConfig,
        },
      }
    );
    if (resp.status === 200) {
      return resp.data.data;
    } else {
      return null;
    }
  } catch (error) {
    //console.error("Error fetching data:", error);
    throw error;
  }
};
export const getFireHydrantCombineEnergySankey = async () => {
  try {
    const token = sessionStorage.getItem("token");
    let selectedRange = "month";
    let meterConfig = sankey_monthly["Fire Hydrant"];
    const resp = await axios.get(
      `${apiUrl}/graphDataservice/getEnergyDataCombineDynamicallSpecificTable_sankey`,
      {
        headers: {
          Authorization: token,
        },
        params: {
          range: selectedRange,
          meterConfig: meterConfig,
        },
      }
    );
    if (resp.status === 200) {
      return resp.data.data;
    } else {
      return null;
    }
  } catch (error) {
    //console.error("Error fetching data:", error);
    throw error;
  }
};
export const getUPSCombineEnergySankey = async () => {
  try {
    const token = sessionStorage.getItem("token");
    let selectedRange = "month";
    let meterConfig = sankey_monthly["UPS"];
    const resp = await axios.get(
      `${apiUrl}/graphDataservice/getEnergyDataCombineDynamicallSpecificTable_sankey`,
      {
        headers: {
          Authorization: token,
        },
        params: {
          range: selectedRange,
          meterConfig: meterConfig,
        },
      }
    );
    if (resp.status === 200) {
      return resp.data.data;
    } else {
      return null;
    }
  } catch (error) {
   // console.error("Error fetching data:", error);
    throw error;
  }
};

export const getPowerGridCombineEnergySankey = async () => {
  try {
    const token = sessionStorage.getItem("token");
    let selectedRange = "month";
    let meterConfig = sankey_monthly.PowerGrid;
    const resp = await axios.get(
      `${apiUrl}/graphDataservice/getEnergyDataCombineDynamicallSpecificTable_sankey`,
      {
        headers: {
          Authorization: token,
        },
        params: {
          range: selectedRange,
          meterConfig: meterConfig,
        },
      }
    );
    if (resp.status === 200) {
      return resp.data.data;
    } else {
      return null;
    }
  } catch (error) {
   // console.error("Error fetching data:", error);
    throw error;
  }
};

export const getPowerGridCombineEnergySankeySYD = async () => {
  try {
    const token = sessionStorage.getItem("token");
    let selectedRange = "month";
    let meterConfig = sankey_monthly_syd.PowerGrid;
    const resp = await axios.get(
      `${apiUrl}/graphDataservice/getEnergyDataCombineDynamicallSpecificTable_sankey`,
      {
        headers: {
          Authorization: token,
        },
        params: {
          range: selectedRange,
          meterConfig: meterConfig,
        },
      }
    );
    if (resp.status === 200) {
      return resp.data.data;
    } else {
      return null;
    }
  } catch (error) {
    //console.error("Error fetching data:", error);
    throw error;
  }
};

export const get1FfloorCombineEnergySankeySYD = async () => {
  try {
    const token = sessionStorage.getItem("token");
    let selectedRange = "month";
    let meterConfig = sankey_monthly_syd["1F"];
    const resp = await axios.get(
      `${apiUrl}/graphDataservice/getEnergyDataCombineDynamicallSpecificTable_sankey`,
      {
        headers: {
          Authorization: token,
        },
        params: {
          range: selectedRange,
          meterConfig: meterConfig,
        },
      }
    );
    if (resp.status === 200) {
      return resp.data.data;
    } else {
      return null;
    }
  } catch (error) {
   // console.error("Error fetching data:", error);
    throw error;
  }
};

export const get3FfloorCombineEnergySankeySYD = async () => {
  try {
    const token = sessionStorage.getItem("token");
    let selectedRange = "month";
    let meterConfig = sankey_monthly_syd["3F"];
    const resp = await axios.get(
      `${apiUrl}/graphDataservice/getEnergyDataCombineDynamicallSpecificTable_sankey`,
      {
        headers: {
          Authorization: token,
        },
        params: {
          range: selectedRange,
          meterConfig: meterConfig,
        },
      }
    );
    if (resp.status === 200) {
      return resp.data.data;
    } else {
      return null;
    }
  } catch (error) {
    //console.error("Error fetching data:", error);
    throw error;
  }
};

export const get4FfloorCombineEnergySankeySYD = async () => {
  try {
    const token = sessionStorage.getItem("token");
    let selectedRange = "month";
    let meterConfig = sankey_monthly_syd["4F"];
    const resp = await axios.get(
      `${apiUrl}/graphDataservice/getEnergyDataCombineDynamicallSpecificTable_sankey`,
      {
        headers: {
          Authorization: token,
        },
        params: {
          range: selectedRange,
          meterConfig: meterConfig,
        },
      }
    );
    if (resp.status === 200) {
      return resp.data.data;
    } else {
      return null;
    }
  } catch (error) {
   // console.error("Error fetching data:", error);
    throw error;
  }
};

export const get5FfloorCombineEnergySankeySYD = async () => {
  try {
    const token = sessionStorage.getItem("token");
    let selectedRange = "month";
    let meterConfig = sankey_monthly_syd["5F"];
    const resp = await axios.get(
      `${apiUrl}/graphDataservice/getEnergyDataCombineDynamicallSpecificTable_sankey`,
      {
        headers: {
          Authorization: token,
        },
        params: {
          range: selectedRange,
          meterConfig: meterConfig,
        },
      }
    );
    if (resp.status === 200) {
      return resp.data.data;
    } else {
      return null;
    }
  } catch (error) {
    //console.error("Error fetching data:", error);
    throw error;
  }
};

export const get6FfloorCombineEnergySankeySYD = async () => {
  try {
    const token = sessionStorage.getItem("token");
    let selectedRange = "month";
    let meterConfig = sankey_monthly_syd["6F"];
    const resp = await axios.get(
      `${apiUrl}/graphDataservice/getEnergyDataCombineDynamicallSpecificTable_sankey`,
      {
        headers: {
          Authorization: token,
        },
        params: {
          range: selectedRange,
          meterConfig: meterConfig,
        },
      }
    );
    if (resp.status === 200) {
      return resp.data.data;
    } else {
      return null;
    }
  } catch (error) {
   // console.error("Error fetching data:", error);
    throw error;
  }
};

export const get7FfloorCombineEnergySankeySYD = async () => {
  try {
    const token = sessionStorage.getItem("token");
    let selectedRange = "month";
    let meterConfig = sankey_monthly_syd["7F"];
    const resp = await axios.get(
      `${apiUrl}/graphDataservice/getEnergyDataCombineDynamicallSpecificTable_sankey`,
      {
        headers: {
          Authorization: token,
        },
        params: {
          range: selectedRange,
          meterConfig: meterConfig,
        },
      }
    );
    if (resp.status === 200) {
      return resp.data.data;
    } else {
      return null;
    }
  } catch (error) {
    //console.error("Error fetching data:", error);
    throw error;
  }
};

export const get8FfloorCombineEnergySankeySYD = async () => {
  try {
    const token = sessionStorage.getItem("token");
    let selectedRange = "month";
    let meterConfig = sankey_monthly_syd["8F"];
    const resp = await axios.get(
      `${apiUrl}/graphDataservice/getEnergyDataCombineDynamicallSpecificTable_sankey`,
      {
        headers: {
          Authorization: token,
        },
        params: {
          range: selectedRange,
          meterConfig: meterConfig,
        },
      }
    );
    if (resp.status === 200) {
      return resp.data.data;
    } else {
      return null;
    }
  } catch (error) {
    //console.error("Error fetching data:", error);
    throw error;
  }
};

export const get9FfloorCombineEnergySankeySYD = async () => {
  try {
    const token = sessionStorage.getItem("token");
    let selectedRange = "month";
    let meterConfig = sankey_monthly_syd["9F"];
    const resp = await axios.get(
      `${apiUrl}/graphDataservice/getEnergyDataCombineDynamicallSpecificTable_sankey`,
      {
        headers: {
          Authorization: token,
        },
        params: {
          range: selectedRange,
          meterConfig: meterConfig,
        },
      }
    );
    if (resp.status === 200) {
      return resp.data.data;
    } else {
      return null;
    }
  } catch (error) {
    //console.error("Error fetching data:", error);
    throw error;
  }
};

export const get10FfloorCombineEnergySankeySYD = async () => {
  try {
    const token = sessionStorage.getItem("token");
    let selectedRange = "month";
    let meterConfig = sankey_monthly_syd["10F"];
    const resp = await axios.get(
      `${apiUrl}/graphDataservice/getEnergyDataCombineDynamicallSpecificTable_sankey`,
      {
        headers: {
          Authorization: token,
        },
        params: {
          range: selectedRange,
          meterConfig: meterConfig,
        },
      }
    );
    if (resp.status === 200) {
      return resp.data.data;
    } else {
      return null;
    }
  } catch (error) {
   // console.error("Error fetching data:", error);
    throw error;
  }
};

export const get11FfloorCombineEnergySankeySYD = async () => {
  try {
    const token = sessionStorage.getItem("token");
    let selectedRange = "month";
    let meterConfig = sankey_monthly_syd["11F"];
    const resp = await axios.get(
      `${apiUrl}/graphDataservice/getEnergyDataCombineDynamicallSpecificTable_sankey`,
      {
        headers: {
          Authorization: token,
        },
        params: {
          range: selectedRange,
          meterConfig: meterConfig,
        },
      }
    );
    if (resp.status === 200) {
      return resp.data.data;
    } else {
      return null;
    }
  } catch (error) {
    //console.error("Error fetching data:", error);
    throw error;
  }
};

export const get12FfloorCombineEnergySankeySYD = async () => {
  try {
    const token = sessionStorage.getItem("token");
    let selectedRange = "month";
    let meterConfig = sankey_monthly_syd["12F"];
    const resp = await axios.get(
      `${apiUrl}/graphDataservice/getEnergyDataCombineDynamicallSpecificTable_sankey`,
      {
        headers: {
          Authorization: token,
        },
        params: {
          range: selectedRange,
          meterConfig: meterConfig,
        },
      }
    );
    if (resp.status === 200) {
      return resp.data.data;
    } else {
      return null;
    }
  } catch (error) {
    //console.error("Error fetching data:", error);
    throw error;
  }
};

export const get13FfloorCombineEnergySankeySYD = async () => {
  try {
    const token = sessionStorage.getItem("token");
    let selectedRange = "month";
    let meterConfig = sankey_monthly_syd["13F"];
    const resp = await axios.get(
      `${apiUrl}/graphDataservice/getEnergyDataCombineDynamicallSpecificTable_sankey`,
      {
        headers: {
          Authorization: token,
        },
        params: {
          range: selectedRange,
          meterConfig: meterConfig,
        },
      }
    );
    if (resp.status === 200) {
      return resp.data.data;
    } else {
      return null;
    }
  } catch (error) {
    //console.error("Error fetching data:", error);
    throw error;
  }
};

export const get14FfloorCombineEnergySankeySYD = async () => {
  try {
    const token = sessionStorage.getItem("token");
    let selectedRange = "month";
    let meterConfig = sankey_monthly_syd["14F"];
    const resp = await axios.get(
      `${apiUrl}/graphDataservice/getEnergyDataCombineDynamicallSpecificTable_sankey`,
      {
        headers: {
          Authorization: token,
        },
        params: {
          range: selectedRange,
          meterConfig: meterConfig,
        },
      }
    );
    if (resp.status === 200) {
      return resp.data.data;
    } else {
      return null;
    }
  } catch (error) {
    //console.error("Error fetching data:", error);
    throw error;
  }
};

export const get15FfloorCombineEnergySankeySYD = async () => {
  try {
    const token = sessionStorage.getItem("token");
    let selectedRange = "month";
    let meterConfig = sankey_monthly_syd["15F"];
    const resp = await axios.get(
      `${apiUrl}/graphDataservice/getEnergyDataCombineDynamicallSpecificTable_sankey`,
      {
        headers: {
          Authorization: token,
        },
        params: {
          range: selectedRange,
          meterConfig: meterConfig,
        },
      }
    );
    if (resp.status === 200) {
      return resp.data.data;
    } else {
      return null;
    }
  } catch (error) {
    //console.error("Error fetching data:", error);
    throw error;
  }
};

export const getB1FfloorCombineEnergySankeySYD = async () => {
  try {
    const token = sessionStorage.getItem("token");
    let selectedRange = "month";
    let meterConfig = sankey_monthly_syd["B1F"];
    const resp = await axios.get(
      `${apiUrl}/graphDataservice/getEnergyDataCombineDynamicallSpecificTable_sankey`,
      {
        headers: {
          Authorization: token,
        },
        params: {
          range: selectedRange,
          meterConfig: meterConfig,
        },
      }
    );
    if (resp.status === 200) {
      return resp.data.data;
    } else {
      return null;
    }
  } catch (error) {
    //onsole.error("Error fetching data:", error);
    throw error;
  }
};

export const getGFfloorCombineEnergySankeySYD = async () => {
  try {
    const token = sessionStorage.getItem("token");
    let selectedRange = "month";
    let meterConfig = sankey_monthly_syd["GF"];
    const resp = await axios.get(
      `${apiUrl}/graphDataservice/getEnergyDataCombineDynamicallSpecificTable_sankey`,
      {
        headers: {
          Authorization: token,
        },
        params: {
          range: selectedRange,
          meterConfig: meterConfig,
        },
      }
    );
    if (resp.status === 200) {
      return resp.data.data;
    } else {
      return null;
    }
  } catch (error) {
   // console.error("Error fetching data:", error);
    throw error;
  }
};

export const getFloorWiseDeviceImage = async (floorId) => {
  try {
    const resp = imageConfig[`${floorId}`];
    if (resp) {
      return resp;
    } else {
      return null;
    }

    // const resp = await axios.get(
    //   `${apiUrl}/image/getImage`,
    //   {
    //     params: {
    //       floorId
    //     },
    //   },
    //   {
    //     headers: {
    //       Authorization: token,
    //     },
    //   }
    // );

    // if (resp.status === 200) {
    //   return resp.data;
    // } else {
    //   return null;
    // }
  } catch (error) {
    //console.error("Error fetching graphconfig in service : ", error);
    throw error
  }
};
