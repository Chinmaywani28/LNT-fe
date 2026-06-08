import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;
const token = sessionStorage.getItem("token");

export const getGatewayInfo = async () => {
  try {
    const token = sessionStorage.getItem("token");
    const resp = await axios.get(`${apiUrl}/configuration/getGatewayInfo`, {
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
    // console.error("Error fetching gatewayinfo in service : ", error);
    throw error;
  }
};
