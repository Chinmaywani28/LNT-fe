import axios from "axios";

export const getWeatherData = async (city) => {
    try {
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=6338868659bd8edd0bcf903faaf3d8a2`
        );
        
        if (response.status === 200) {
            return response.data;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

export const getAirPollutionData = async (lat,lon) => {
    try { 
        // const response = await axios.get(
        //     `http://api.waqi.info/feed/tokyo/?token=73887dffd30bd8a341efe39b43340aa18242261a`,
        // );

        const response = await axios.get(
            `http://api.waqi.info/feed/geo:${lat};${lon}/?token=73887dffd30bd8a341efe39b43340aa18242261a`,
        );
        
        if (response.status === 200) {
            return response.data;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}