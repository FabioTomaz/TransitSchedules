'use strict';

var utils = require('../utils/writer.js');
var Routes = require('../service/RoutesService');

module.exports.getRouteById = function getRouteById (req, res, next) {
  var routeId = req.swagger.params['routeId'].value;
  Routes.getRouteById(routeId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.routingBetweenStops = function routingBetweenStops (req, res, next) {
  var fromStopId = req.swagger.params['fromStopId'].value;
  var toStopId = req.swagger.params['toStopId'].value;
  var departureDate = req.swagger.params['departureDate'].value;
  var arrivalDate = req.swagger.params['arrivalDate'].value;
  Routes.routingBetweenStops(fromStopId,toStopId,departureDate,arrivalDate)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
