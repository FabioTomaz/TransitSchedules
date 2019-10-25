var express = require('express');
var router = express.Router();

var GTFSController = require('../controllers/GTFS')

router.post('/gtfs', GTFSController.createUser)
router.delete('/gtfs/:agencyKey', GTFSController.deleteGtfs)

module.exports = router;