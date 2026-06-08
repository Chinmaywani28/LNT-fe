import axios from "axios";
const predictUrl = process.env.REACT_APP_SOLAR_PREDICT;
const apiURL="http://10.1.1.210:5000"

export const getPredictiondata = async (selectTable,selectedRange) => {
    try {
   
      const resp = await axios.get(`${apiURL}/predictionModel`, {
        params: {
          tablename:selectTable,
          range:selectedRange
          },
      });
      return resp.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };

  
export const getRawdata = async (selectTable,selectedRange) => {
    try {
   
      const resp = await axios.get(`${apiURL}/rawdataweekly`, {
        params: {
          tablename:selectTable,
          range:selectedRange
          },
      });
      
      return resp.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error; 
    }
  };

  export const getpredictdataUp = async (selectTable,selectedRange) => {
    try {
   
      const resp = await axios.get(`${apiURL}/predictionmodelupdate`, {
        params: {
          tablename:selectTable,
          range:selectedRange
          },
      });
      
      return resp.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error; 
    }
  };
  
  export const getSolarRawPredictionData = async () => {
    try {
      const resp = await axios.get(`${predictUrl}/rawdataSolar`);
      return resp.data
    } catch (error) {
      console.error("Error Fetching Solar Prediction : ", error);
    }
  };
  
  export const getSolarPredictionByDate = async (startDate, endDate) => {
    try {
      const resp = await axios.get(`${predictUrl}/predictionModelSolar`, {
        params: {
          start_date: startDate,
          end_date: endDate,
        },
      });
      return resp.data;
    } catch (error) {
      console.error("Error fetching solar Prediction : ", error);
    }
  };