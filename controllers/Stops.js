'use strict';

var utils = require('../utils/writer.js');
var Stops = require('../service/StopsService');

module.exports.getStopById = function getStopById (req, res, next) {
  var stopId = req.params.stopId;
  Stops.getStopById(stopId)
    .then((stop) => {
      if(stop == -1) {
        return res.status(404).send({});
      }
      return res.json(stop);
    })
    .catch((err) => {
      return res.json(err);
    });
};

module.exports.getStops = function getStops (req, res, next) {
  Stops.getStops()
    .then(stops => {
      if(stops == -1) {
        return res.status(404).send({});
      }
      return res.json(stops);
    }).catch((err) => {
      return res.json(err);
    });
};

module.exports.getStoptimes = function getStoptimes (req, res, next) {
  let agencyKey = req.params.agencyKey;
  let stopId = req.params.stopId;
  Stops.getStoptimes(agencyKey, stopId)
    .then(stoptimes => {
      if(stoptimes == -1) {
        return res.status(404).send({});
      }
      return res.json(stoptimes);
    }).catch((err) => {
      return res.json(err);
    });
};