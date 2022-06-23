/*------------------DEV ENV-----------------------*/
const SQL_CREATE_STATIONS_TABLE = "CREATE TABLE if not exists stations (id INT(11), name VARCHAR(100), totalDocks INT(5), docksAvailable INT(5), bikesAvailable INT(5), classicBikesAvailable INT(5), smartBikesAvailable INT(5), electricBikesAvailable INT(5), rewardBikesAvailable INT(5), rewardDocksAvailable INT(5), kioskStatus VARCHAR(100), kioskPublicStatus VARCHAR(10), kioskConnectionStatus VARCHAR(10), kioskType TINYINT(1), addressStreet VARCHAR(100), addressCity VARCHAR(100), addressState VARCHAR(10), addressZipCode VARCHAR(10), closeTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP, eventEnd TIMESTAMP DEFAULT CURRENT_TIMESTAMP, eventStart TIMESTAMP DEFAULT CURRENT_TIMESTAMP, isEventBased BOOLEAN, isVirtual BOOLEAN, kioskId INT(11), notes VARCHAR(255), openTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP, publicText LONGTEXT, timeZone INT(11), trikesAvailable INT(5), latitude FLOAT(6), longitude FLOAT(6), at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)";

const SQL_CREATE_WEATHERS_TABLE = "CREATE TABLE if not exists weathers (lon FLOAT, lat FLOAT, base VARCHAR(100), temp FLOAT, feels_like FLOAT, temp_min FLOAT, temp_max FLOAT, pressure INT(5), humidity INT(5), sea_level INT(5), grnd_level INT(5), visibility INT(5), wind_speed FLOAT, wind_deg INT, wind_gust FLOAT, clouds INT(5), dt INT(11), sunrise INT, sunset INT, timezone INT(5), id INT(5), name VARCHAR(100), code INT(3), at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)";

const SQL_INSERT_STATIONS_DATA = `INSERT INTO stations SET ?`;
const SQL_INSERT_WEATHERS_DATA = `INSERT INTO weathers SET ?`;

/*------------------TEST ENV-----------------------*/
const SQL_CREATE_STATIONS_TABLE_TEST = "CREATE TABLE if not exists stations_test (id INT(11), name VARCHAR(100), totalDocks INT(5), docksAvailable INT(5), bikesAvailable INT(5), classicBikesAvailable INT(5), smartBikesAvailable INT(5), electricBikesAvailable INT(5), rewardBikesAvailable INT(5), rewardDocksAvailable INT(5), kioskStatus VARCHAR(100), kioskPublicStatus VARCHAR(10), kioskConnectionStatus VARCHAR(10), kioskType TINYINT(1), addressStreet VARCHAR(100), addressCity VARCHAR(100), addressState VARCHAR(10), addressZipCode VARCHAR(10), closeTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP, eventEnd TIMESTAMP DEFAULT CURRENT_TIMESTAMP, eventStart TIMESTAMP DEFAULT CURRENT_TIMESTAMP, isEventBased BOOLEAN, isVirtual BOOLEAN, kioskId INT(11), notes VARCHAR(255), openTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP, publicText LONGTEXT, timeZone INT(11), trikesAvailable INT(5), latitude FLOAT(6), longitude FLOAT(6), at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)";

const SQL_CREATE_WEATHERS_TABLE_TEST = "CREATE TABLE if not exists weathers_test (lon FLOAT, lat FLOAT, base VARCHAR(100), temp FLOAT, feels_like FLOAT, temp_min FLOAT, temp_max FLOAT, pressure INT(5), humidity INT(5), sea_level INT(5), grnd_level INT(5), visibility INT(5), wind_speed FLOAT, wind_deg INT, wind_gust FLOAT, clouds INT(5), dt INT(11), sunrise INT, sunset INT, timezone INT(5), id INT(5), name VARCHAR(100), code INT(3), at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)";

const SQL_INSERT_STATIONS_DATA_TEST = `INSERT INTO stations_test SET ?`;
const SQL_INSERT_WEATHERS_DATA_TEST = `INSERT INTO weathers_test SET ?`;

const SQL_CLEAR_STATIONS_DATA = "TRUNCATE  TABLE stations_test";
const SQL_CLEAR_WEATHERS_DATA = "TRUNCATE  TABLE weathers_test";

module.exports ={
    SQL_CREATE_STATIONS_TABLE,
    SQL_CREATE_WEATHERS_TABLE,
    SQL_INSERT_STATIONS_DATA,
    SQL_INSERT_WEATHERS_DATA,
    SQL_CREATE_STATIONS_TABLE_TEST,
    SQL_CREATE_WEATHERS_TABLE_TEST,
    SQL_INSERT_STATIONS_DATA_TEST,
    SQL_INSERT_WEATHERS_DATA_TEST,
    SQL_CLEAR_STATIONS_DATA,
    SQL_CLEAR_WEATHERS_DATA
}