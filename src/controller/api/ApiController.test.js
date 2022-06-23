//lodash utils library
const _ = require("lodash");

//
const TestDbController = require("../db/DbController.test");

/**
 * 
 * @param {Object} req request string
 * @param {Object} res response object
 * @description call _fetchStationAndWeather and send returned response object
 * @returns send response with JSON object
 */
const fetchDataAll = async (req, res) => {

    const timestamp = req.query.at;

    const station = await TestDbController.fetchStationDataFromDBByDateTime(timestamp);
    const weather = await TestDbController.fetchWeathersDataFromDBByDateTime(timestamp);

    if (_.size(station) || _.size(weather)) {
        res.json({
            at: timestamp,
            station: station,
            weather: weather
        });
    } else {
        res.status(404).send('EORROR 404\n There is no result to show.');
    }
}


/**
 * 
 * @param {Object} req request string
 * @param {Object} res response object
 * @description call _fetchStationAndWeather and filter indego data by kioskId
 * @returns send response with JSON object
 */
const fetchDataByKioskId = async (req, res) => {
    const timestamp = req.query.at;
    const kioskId = req.params.id;

    const station = await TestDbController.fetchStationDataFromDBById(timestamp, kioskId);
    const weather = await TestDbController.fetchWeathersDataFromDBByDateTime(timestamp);

    if (_.size(station) || _.size(weather)) {
        res.json({
            at: timestamp,
            station: station,
            weather: weather
        })
    } else {
        res.status(404).send('EORROR 404\n There is no result to show.');
    }

}

module.exports = {
    fetchDataAll,
    fetchDataByKioskId
}