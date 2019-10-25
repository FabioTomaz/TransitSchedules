'use strict';

var Routes = require('../service/RoutesService');

module.exports.getRouteById = function getRouteById (req, res, next) {
  var routeId = req.params.routeId;
  Routes.getRouteById(routeId)
    .then((route) => {
      if(route == -1) {
        return res.status(404).send({});
      }
      return res.json(route);
    })
    .catch((err) => {
      return res.json(err);
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
