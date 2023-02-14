const axios = require("axios");

/**
 * @description fetch Indego station and Weather data from API 
 * @returns Object indego, Object weather
 */
 const fetchStationAndWeather = async () => {
    const indego = await axios.get(`http://example.com`);
    const weather = await axios.get(`http://example.com`);
    return { indego, weather }
}

module.exports = fetchStationAndWeather;
