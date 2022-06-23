const axios = require("axios");

/**
 * @description fetch Indego station and Weather data from API 
 * @returns Object indego, Object weather
 */
 const fetchStationAndWeather = async () => {
    const indego = await axios.get(`https://www.rideindego.com/stations/json/`);
    const weather = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${process.env.LAT}&lon=${process.env.LON}&appid=${process.env.OPENWATHER_API_KEY}`);
    return { indego, weather }
}

module.exports = fetchStationAndWeather;