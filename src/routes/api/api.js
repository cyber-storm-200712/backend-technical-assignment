const express = require("express");
const router = express.Router();

const ApiController = require("../../controller/api/ApiController")

//Receive the request with only query
router.get('/', ApiController.fetchDataAll)

//Receive the request with ID
router.get('/:id', ApiController.fetchDataByKioskId)

module.exports = router;