const express = require("express");
const router = express.Router();

const TestApiController = require("../../controller/api/ApiController.test")

//Receive the request with only query
router.get('/', TestApiController.fetchDataAll)

//Receive the request with ID
router.get('/:id', TestApiController.fetchDataByKioskId)

module.exports = router;