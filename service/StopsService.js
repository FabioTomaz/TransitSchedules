'use strict';


/**
 * Get a specific stop
 * Returns a single stop
 *
 * stopId Long ID of the stop to return
 * returns Stop
 **/
exports.getStopById = function(stopId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "agency_key" : "agency_key",
  "stop_lon" : "stop_lon",
  "stop_id" : "stop_id",
  "stop_lat" : "stop_lat",
  "stop_name" : true
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Get all stops
 * Returns all stops stored from GTFS's uplouded
 *
 * returns List
 **/
exports.getStops = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "agency_key" : "agency_key",
  "stop_lon" : "stop_lon",
  "stop_id" : "stop_id",
  "stop_lat" : "stop_lat",
  "stop_name" : true
}, {
  "agency_key" : "agency_key",
  "stop_lon" : "stop_lon",
  "stop_id" : "stop_id",
  "stop_lat" : "stop_lat",
  "stop_name" : true
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

