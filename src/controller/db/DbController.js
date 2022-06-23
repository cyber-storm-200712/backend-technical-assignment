const _ = require("lodash");
const Promise = require("bluebird");

const createConnection = require("../../model/db");
const fetchStationAndWeather = require("../../utils/fetchDataFromApi");

const Queries = require("../../types/sqls");
const Erros = require("../../types/errors");

const connection = createConnection(process.env.DB_HOST, process.env.USER, process.env.PASSWORD, process.env.DB_NAME);

/**
 * @description connect to DB on the host
 * @return if DB is not exist on the host
 */
connection.connect((err) => {
    if (err && err.code == Erros.ER_BAD_DB_ERROR) {
        console.warn(`DB "${process.env.DB_NAME}" is not exist.`);
        process.exit(1);
    }
})

/**
 * @description create tables if not exist
 */
const createTables = async () => {
    connection.query(Queries.SQL_CREATE_STATIONS_TABLE, (err, res) => {
        if (err) console.warn(err);
        if (res) console.warn(`Table "stations" was created.`);
    })

    connection.query(Queries.SQL_CREATE_WEATHERS_TABLE, (err, res) => {
        if (err) console.warn(err);
        if (res) console.warn(`Table "weathers" was created.`);
    })
}


/**
 * @description convert fetched data object to query format
 * @returns data object which formatted with SET type
 */
const _convertDataToQuerySet = async () => {
    const { indego, weather } = await fetchStationAndWeather();

    const rowIndegoData = indego.data.features;
    const rowWeatherData = weather.data;

    const weatherRow = {
        lon: rowWeatherData.coord.lon,
        lat: rowWeatherData.coord.lat,
        base: rowWeatherData.base,
        temp: rowWeatherData.main.temp,
        feels_like: rowWeatherData.main.feels_like,
        temp_min: rowWeatherData.main.temp_min,
        temp_max: rowWeatherData.main.temp_max,
        pressure: rowWeatherData.main.pressure,
        humidity: rowWeatherData.main.humidity,
        sea_level: rowWeatherData.main.sea_level,
        grnd_level: rowWeatherData.main.grnd_level,
        visibility: rowWeatherData.visibility,
        wind_speed: rowWeatherData.wind.speed,
        wind_deg: rowWeatherData.wind.deg,
        wind_gust: rowWeatherData.wind.gust,
        clouds: rowWeatherData.clouds.all,
        dt: rowWeatherData.dt,
        sunrise: rowWeatherData.sys.sunrise,
        sunset: rowWeatherData.sys.sunset,
        timezone: rowWeatherData.timezone,
        id: rowWeatherData.id,
        name: rowWeatherData.name,
        code: rowWeatherData.cod,
        at: new Date(_.now()).toISOString()
    }

    const indegoRows = rowIndegoData.map(item => {
        return {
            id: item.properties.id,
            name: item.properties.name,
            totalDocks: item.properties.totalDocks,
            docksAvailable: item.properties.docksAvailable,
            bikesAvailable: item.properties.bikesAvailable,
            classicBikesAvailable: item.properties.classicBikesAvailable,
            smartBikesAvailable: item.properties.smartBikesAvailable,
            electricBikesAvailable: item.properties.electricBikesAvailable,
            rewardBikesAvailable: item.properties.rewardBikesAvailable,
            rewardDocksAvailable: item.properties.rewardDocksAvailable,
            kioskStatus: item.properties.kioskStatus,
            kioskPublicStatus: item.properties.kioskPublicStatus,
            kioskConnectionStatus: item.properties.kioskConnectionStatus,
            kioskType: item.properties.kioskType,
            addressStreet: item.properties.addressStreet,
            addressCity: item.properties.addressCity,
            addressState: item.properties.addressState,
            addressZipCode: item.properties.addressZipCode,
            closeTime: item.properties.closeTime,
            eventEnd: item.properties.eventEnd,
            eventStart: item.properties.eventStart,
            isEventBased: item.properties.isEventBased,
            isVirtual: item.properties.isVirtual,
            kioskId: item.properties.kioskId,
            notes: item.properties.notes,
            openTime: item.properties.openTime,
            publicText: item.properties.publicText,
            timeZone: item.properties.timeZone,
            trikesAvailable: item.properties.trikesAvailable,
            latitude: item.properties.latitude,
            longitude: item.properties.longitude,
            at: new Date(_.now()).toISOString()
        }
    })
    return { weatherRow, indegoRows };
}

/**
 * @description add stations data and weather data to table
 */
const addDataToDB = async () => {

    await createTables();

    const { weatherRow, indegoRows } = await _convertDataToQuerySet();

    indegoRows.map(item => {
        connection.query(Queries.SQL_INSERT_STATIONS_DATA, item, (err) => {
            if (err) console.log(err);
        })
    })

    connection.query(Queries.SQL_INSERT_WEATHERS_DATA, weatherRow, (err) => {
        if (err) console.log(err);
    })
}


/**
 * @description get station data by timestamp
 * @param {String} timestamp timestamp value to query Db
 * @returns {Promise} query result
 */
const fetchStationDataFromDBByDateTime = async (timestamp) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM stations WHERE YEAR(at) = ${new Date(timestamp).getFullYear()} AND MONTH(at) = ${new Date(timestamp).getMonth() + 1} AND DAY(at) = ${new Date(timestamp).getDate()} AND HOUR(at) = ${new Date(timestamp).getHours()}`, (err, res) => {
            if (err) return reject(err);
            if (res) return resolve(res);
        })
    })
}


/**
 * @description get station by timestamp and kioskId
 * @param {String} timestamp timestamp value to query Db
 * @param {Number} kioskId id value to query Db
 * @returns {Promise} query result
 */
const fetchStationDataFromDBById = async (timestamp, kioskId) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM stations WHERE YEAR(at) = ${new Date(timestamp).getFullYear()} AND MONTH(at) = ${new Date(timestamp).getMonth() + 1} AND DAY(at) = ${new Date(timestamp).getDate()} AND HOUR(at) = ${new Date(timestamp).getHours()} AND kioskId = ${kioskId}`, (err, res) => {
            if (err) return reject(err);
            if (res) return resolve(res);
        })
    })
}


/**
 * @description get weather data by timestamp
 * @param {String} timestamp timestamp value to query Db
 * @returns {Promise} query result
 */
const fetchWeathersDataFromDBByDateTime = async (timestamp) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM weathers WHERE YEAR(at) = ${new Date(timestamp).getFullYear()} AND MONTH(at) = ${new Date(timestamp).getMonth() + 1} AND DAY(at) = ${new Date(timestamp).getDate()} AND HOUR(at) = ${new Date(timestamp).getHours()}`, (err, res) => {
            if (err) return reject(err);
            if (res) return resolve(res);
        })
    })
}

module.exports = {
    addDataToDB,
    fetchStationDataFromDBByDateTime,
    fetchWeathersDataFromDBByDateTime,
    fetchStationDataFromDBById
};