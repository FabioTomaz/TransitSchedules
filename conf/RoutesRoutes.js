var express = require('express');
var router = express.Router();

var RoutesController = require('../controllers/Routes')

router.get('/routing/:fromStop/:toStop', RoutesController.routingBetweenStops)
router.get('/route/:routeId', RoutesController.getRouteById)

module.exports = router;