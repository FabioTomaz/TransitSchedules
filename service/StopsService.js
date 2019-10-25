'use strict';

let gtfs = require('gtfs');

/**
 * Get a specific stop
 * Returns a single stop
 *
 * stopId Long ID of the stop to return
 * returns Stop
 **/
exports.getStopById = function(stopId) {
  return gtfs.getStops({
      stop_id: stopId
  }).then(stops => {
      if(stops.length == 0) {
          return -1;
      }
      return stops[0];
  }).catch(err => {
      throw err;
  });
}


/**
 * Get all stops
 * Returns all stops stored from GTFS's uplouded
 *
 * returns List
 **/
exports.getStops = function(query) {
  return gtfs.getStops(query).then(stops => {
    if(stops.length == 0) {
        return -1;
    }
    return stops;
  }).catch(err => {
      throw err;
  });
}


/**
 * Return all stoptimes for a specific stop
 *
 * returns List
 **/
exports.getStoptimes = function(agencyKey, stopId) {
  return gtfs.getStoptimes({
    agency_key:  agencyKey,
    stop_id: stopId
  }).then(stoptimes => {
    console.log(stoptimes);
    return stoptimes;
  }).catch(err => {
    throw err;
  })
}
