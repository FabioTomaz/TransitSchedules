'use strict';

var utils = require('../utils/writer.js');
var GTFS = require('../service/GTFSService');

module.exports.createUser = function createUser (req, res, next) {
  var body = req.swagger.params['body'].value;
  GTFS.createUser(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteGtfs = function deleteGtfs (req, res, next) {
  var gtfsId = req.swagger.params['gtfsId'].value;
  GTFS.deleteGtfs(gtfsId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
