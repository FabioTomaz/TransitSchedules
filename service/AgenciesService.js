'use strict';


/**
 * Get all transportation agencies
 * Returns all agencies stored frmo GTFS's uplouded
 *
 * returns List
 **/
exports.getAgencies = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "agency_timezone" : "agency_timezone",
  "agency_key" : "agency_key",
  "agency_name" : "agency_name",
  "agency_url" : "agency_url",
  "agency_phone" : "agency_phone",
  "agency_id" : 0,
  "agency_lang" : "agency_lang"
}, {
  "agency_timezone" : "agency_timezone",
  "agency_key" : "agency_key",
  "agency_name" : "agency_name",
  "agency_url" : "agency_url",
  "agency_phone" : "agency_phone",
  "agency_id" : 0,
  "agency_lang" : "agency_lang"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
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
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "agency_timezone" : "agency_timezone",
  "agency_key" : "agency_key",
  "agency_name" : "agency_name",
  "agency_url" : "agency_url",
  "agency_phone" : "agency_phone",
  "agency_id" : 0,
  "agency_lang" : "agency_lang"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

