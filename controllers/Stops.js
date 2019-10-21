'use strict';

var utils = require('../utils/writer.js');
var Stops = require('../service/StopsService');

module.exports.getStopById = function getStopById (req, res, next) {
  var stopId = req.swagger.params['stopId'].value;
  Stops.getStopById(stopId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getStops = function getStops (req, res, next) {
  Stops.getStops()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
