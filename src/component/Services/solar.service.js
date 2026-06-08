import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;


export const getCurrentDate = () => {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate()); 

  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); 
  const day = String(currentDate.getDate()).padStart(2, "0"); 

  return `${year}-${month}-${day}`;
};

export const getSolardataRangewisegenBar = async (
  selectTable,
  selectedRange
) => {
  try {
    const token = sessionStorage.getItem("token");
    const resp = await axios.get(
      `${apiUrl}/solar/solarenergydatarangedaywise`,
      {
        headers: {
          authorization: token,
        },
        params: {
          tablename: selectTable,
          range: selectedRange,
        },
      }
    );

    return resp.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; 
  }
};

export const getSolarEnergydaily = async () => {
  try {
    const token = sessionStorage.getItem("token");
    const rangeDay = getCurrentDate();
    const resp = await axios.get(`${apiUrl}/solar/solarenergydatarange`, {
      headers: {
        authorization: token,
      },
      params: {
        range: rangeDay,
      },
    });

    return resp.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; 
  }
};

export const getsolaralldata = async () => {
  try {
    const token = sessionStorage.getItem("token");
    const rangeDay = getCurrentDate();
    const resp = await axios.get(`${apiUrl}/solar/solaralldata`, {
      headers: {
        authorization: token,
      },
      params: {
        range: rangeDay,
      },
    });

    return resp.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; 
  }
};

export const getSolar5mindata = async () => {
  try {
    const token = sessionStorage.getItem("token");
    const rangeDay = getCurrentDate();
    const resp = await axios.get(`${apiUrl}/solar/solarpowertimlydata`,{
      headers: {
        authorization: token,
      },
    });

    return resp.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; 
  }
};

export const getCurrentsolarpower = async () => {
  try {
    const token = sessionStorage.getItem("token");
    const resp = await axios.get(`${apiUrl}/solar/Currentsolarpower`,{
      headers: {
        authorization: token,
      },
    });

    return resp.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; 
  }
};
export const getdaygenerationEnergy = async () => {
  try {
    const token = sessionStorage.getItem("token");
    const resp = await axios.get(`${apiUrl}/solar/dayEnergyGen`,{
      headers: {
        authorization: token,
      },
    });

    return resp.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; 
  }
};

export const getTotalgenerationSolar = async () => {
  try {
    const token = sessionStorage.getItem("token");
    const resp = await axios.get(`${apiUrl}/solar/TotalgenerationSolar`,{
      headers: {
        authorization: token,
      },
    });

    return resp.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; 
  }
};

export const getenergypowerCurrentdatedata = async () => {
  try {
    const token = sessionStorage.getItem("token");
    const resp = await axios.get(`${apiUrl}/solar/energypowercurrentdate`,{
      headers: {
        authorization: token,
      },
    });

    return resp.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; 
  }
};

export const getenergypowerPastdatedata = async (data) => {
  try {
    const token = sessionStorage.getItem("token");
    const resp = await axios.get(`${apiUrl}/solar/energypowerPastdate`, {
      headers: {
        authorization: token,
      },
      params: {
        date: data,
      },
    });

    return resp.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const getSolarpowerPastdatedata = async (data) => {
  try {
    const token = sessionStorage.getItem("token");
    const resp = await axios.get(`${apiUrl}/solar/solarpowerPastdate`, {
      headers: {
        authorization: token,
      },
      params: {
        date: data,
      },
    });

    return resp.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; 
  }
};

export const getTotalGenbySolarandMeter = async () => {
  try {
    const token = sessionStorage.getItem("token");
    const resp = await axios.get(`${apiUrl}/solar/TotalGenbySolarandMeter`,{
      headers: {
        authorization: token,
      },
    });

    return resp.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; 
  }
};

export const getSolarTotalgenlast5days = async () => {
  try {
    const token = sessionStorage.getItem("token");
    const resp = await axios.get(`${apiUrl}/solar/last5dayEnergyGen`,{
      headers: {
        authorization: token,
      },
    });

    return resp.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const getmonthlyEnergyGen = async () => {
  try {
    const token = sessionStorage.getItem("token");
    const resp = await axios.get(`${apiUrl}/solar/currentMonthGen`,{
      headers: {
        authorization: token,
      },
    });

    return resp.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; 
  }
};

export const getsolarenergydata = async () => {
  try {
    const token = sessionStorage.getItem("token");
    const resp = await axios.get(`${apiUrl}/solar/dailyenergydata`,{
      headers: {
        authorization: token,
      },
    });
    return resp.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; 
  }
};

export const getCurrentSolarPowerGrid = async () => {
  try {
    const token = sessionStorage.getItem("token");
    const resp = await axios.get(`${apiUrl}/solar/currentSolarPowerGrid`,{
      headers: {
        authorization: token,
      },
    });
    return resp.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; 
  }
};

export const getsolarMonthlyGen = async () => {
  try {
    const token = sessionStorage.getItem("token");
    const resp = await axios.get(`${apiUrl}/solar/monthlyenergydata`,{
      headers: {
        authorization: token,
      },
    });
    return resp.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const getSolarGridDistribution = async () => {
  try {
    const token = sessionStorage.getItem("token");
    const resp = await axios.get(`${apiUrl}/solar/getsolargriddistribution`,{
      headers: {
        authorization: token,
      },
    });
    return resp.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const getWeeklyAvgConsumption = async () => {
  try {
    const token = sessionStorage.getItem("token");
    const resp = await axios.get(`${apiUrl}/solar/getweeklyavgconsumption`,{
      headers: {
        authorization: token,
      },
    });
    return resp.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const getMDHitValueSolar = async () => {
  try {
    const token = sessionStorage.getItem("token");
    const resp = await axios.get(`${apiUrl}/solar/getmdhitvalue`,{
      headers: {
        authorization: token,
      },
    });
    return resp.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
