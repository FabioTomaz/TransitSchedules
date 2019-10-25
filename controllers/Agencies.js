'use strict';

var utils = require('../utils/writer.js');
var Agencies = require('../service/AgenciesService');

module.exports.getAgencies = function getAgencies (req, res, next) {
  Agencies.getAgencies()
    .then(agencies => {
      if(agencies == -1) {
        return res.status(404).send({});
      }
      return res.json(agencies);
    }).catch((err) => {
      return res.json(err);
    });
};

module.exports.getAgencyById = function getAgencyById (req, res, next) {
  var agencyKey = req.params.agencyKey;
  Agencies.getAgencyById(agencyKey)
    .then((agency) => {
      if(agency == -1) {
        return res.status(404).send({});
      }
      return res.json(agency);
    })
    .catch((err) => {
      return res.json(err);
    });
};
