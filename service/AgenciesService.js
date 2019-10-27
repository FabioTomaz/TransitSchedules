'use strict';

let gtfs = require('gtfs');

/**
 * Get all transportation agencies
 * Returns all agencies stored frmo GTFS's uplouded
 *
 * returns List
 **/
exports.getAgencies = function(query) {
  return gtfs.getAgencies(query).then(agencies => {
    if(agencies.length == 0) {
      return -1;
    }
    return agencies;
  }).catch(err => {
    throw err;
  });
}


/**
 * Get a specific transportation agency
 * Returns a single agency from agencyKey
 *
 * agencyKey String ID of the route to return
 * returns Agency
 **/
exports.getAgencyById = function(agencyKey) {
  return gtfs.getAgencies({
      agency_key: agencyKey
  }).then(agencies => {
      if(agencies.length == 0) {
          return -1;
      }
      return agencies[0];
  }).catch(err => {
      throw err;
  });
}

