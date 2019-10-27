var express = require('express');
var router = express.Router();

var StopsController = require('../controllers/Stops')

router.get('/stop', StopsController.getStops)
router.get('/stop/:stopId', StopsController.getStopById)
router.get('/stoptimes/:stopId', StopsController.getStoptimes)

module.exports = router;