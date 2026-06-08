import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;
const token = sessionStorage.getItem("token");

export const getTotalEnergydistributionLoad = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const resp = await axios.get(`${apiUrl}/emailService`,
        {
          headers: {
            authorization: token,
          },
        }
      )
      return resp.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };


  export const criticalpowerMail = async (data) => {
    try {
      const token = sessionStorage.getItem("token");
      const resp =  await axios.get(`${apiUrl}/emailService/criticalPower`,{
        headers: {
          authorization: token,
        },
        params : data
      });
      
      return resp.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error; 
    }
  };


  export const OfflineNodesMail = async (data) => {
    try {
      const token = sessionStorage.getItem("token");
      const resp =  await axios.get(`${apiUrl}/emailService/nodes`);
      return resp.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error; 
    }
  };


  export const dgupdateMail = async (data) => {
    try {
      const token = sessionStorage.getItem("token");
      const resp = await axios.post(`${apiUrl}/emailService/dgupdate`,{data})
      return resp.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error; 
    }
  };
