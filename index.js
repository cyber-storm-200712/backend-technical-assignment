require("dotenv").config();

//define express app
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

//router and controller
const Api = require("./src/routes/api/api");
const TestApi = require("./src/routes/api/api.test");
const DbController = require("./src/controller/db/DbController");

/**
 * @description express app middleware setting
 */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//determin app enter mode
if (process.env.NODE_ENV == "DEV") {
    console.warn(`Server is running on ${process.env.NODE_ENV} mode.`)
    app.use('/api/v1/stations', Api);
} else if (process.env.NODE_ENV == "TEST") {
    console.warn(`Server is running on ${process.env.NODE_ENV} mode.`)
    app.use('/api/v1/stations', TestApi);
} else {
    app.use('/api/v1/stations', Api);
    console.warn("Server switched to DEV mode.");
}


const PORT = process.env.PORT || 80;

//run server 
app.listen(PORT, () => {
    setInterval(DbController.addDataToDB, process.env.FETCH_INTERVAL);
    console.log(`API server is running on port ${PORT}`);
})

module.exports = app;