import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL ;
const apiConfigUrl =
  process.env.REACT_APPCONFIG_API_URL;

export const getNodeInfo = async () => {
  try {
    const token = sessionStorage.getItem("token");
    const resp = await axios.get(`${apiUrl}/configuration/getNodeInfo`, {
      headers: {
        authorization: token,
      },
    });
    if (resp.status === 200) {
      return resp.data;
    } else {
      return null;
    }
  } catch (error) {
    //console.error("Error fetching nodeinfo in service : ", error);
    throw error;
  }
};

export const getNodeParameter = async (node_mac) => {
  try {
    const token = sessionStorage.getItem("token");
    const resp = await axios.get(`${apiUrl}/configuration/getNodeParameter`, {
      headers: {
        authorization: token,
      },
      params: {
        node_mac: node_mac,
      },
    });

    if (resp.status === 200) {
      return resp.data;
    } else {
      return null;
    }
  } catch (error) {
    //console.error("Error fetching nodeinfo in service : ", error);
    throw error;
  }
};

export const getAllMeters = async () => {
  try {
    const token = sessionStorage.getItem("token");
    const resp = await axios.get(`${apiUrl}/configuration/getAllMeters`, {
      headers: {
        authorization: token,
      },
    });

    if (resp.status === 200) {
      return resp.data;
    } else {
      return null;
    }
  } catch (error) {
    //console.error("Error fetching nodeinfo in service : ", error);
    throw error;
  }
};

export const getAllFloors = async () => {
  try {
    const token = sessionStorage.getItem("token");
    const resp = await axios.get(`${apiUrl}/configuration/getAllFloors`, {
      headers: {
        authorization: token,
      },
    });

    if (resp.status === 200) {
      return resp.data;
    } else {
      return null;
    }
  } catch (error) {
    //console.error("Error fetching nodeinfo in service : ", error);
    throw error;
  }
};

export const updateNodeMeterRangeInfo = async (updatedInfo) => {
  try {  
    const token = sessionStorage.getItem("token");
    const resp = await axios.post(
      `${apiConfigUrl}/config/updateNodeMeterRangeInfo`,
      updatedInfo,
      {
        headers: {
          authorization: token,
        },
      }
    );

    if (resp.status === 201) {
      return resp.data;
    } else {
      return null;
    }
  } catch (error) {
   // console.error("Error fetching nodeinfo in service : ", error);
    throw error;
  }
};
