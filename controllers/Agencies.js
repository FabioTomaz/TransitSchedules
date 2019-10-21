'use strict';

var utils = require('../utils/writer.js');
var Agencies = require('../service/AgenciesService');

module.exports.getAgencies = function getAgencies (req, res, next) {
  Agencies.getAgencies()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getAgencyById = function getAgencyById (req, res, next) {
  var agencyKey = req.swagger.params['agencyKey'].value;
  Agencies.getAgencyById(agencyKey)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
