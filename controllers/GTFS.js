'use strict';

var GTFS = require('../service/GTFSService');

module.exports.createGtfs = function createGtfs (req, res, next) {
  var filePath = req.file.path;
  GTFS.createGTFS(filePath)
    .then(() => {
      return res.json({"status": "Import Successfull"});
    }).catch(err => {
      return res.json(err);
    });
};

module.exports.deleteGtfs = function deleteGtfs (req, res, next) {
  var agencyKey = req.params.agencyKey;
  GTFS.deleteGtfs(agencyKey)
    .then(() => {
      return res.json({"status": "Delete Successfull"});
    }).catch(err => {
      return res.json(err);
    });
};
