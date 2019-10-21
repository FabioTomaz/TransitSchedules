'use strict';


/**
 * Get a specific route
 * Returns a single route from a routeId and a agencyKey
 *
 * routeId Long ID of the route to return
 * returns Route
 **/
exports.getRouteById = function(routeId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "agency_key" : "agency_key",
  "route_id" : "route_id",
  "route_name" : true,
  "route_type" : "route_type",
  "route_url" : "route_url"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Route trajectory between stops
 * Returns a trajectory between the stop ids specified. Also returns data like fares, stops in the middle etc.
 *
 * fromStopId Long ID of the stop to departure from
 * toStopId Long ID of the stop to arrive to
 * departureDate Long The number of items to skip before starting to collect the result set (optional)
 * arrivalDate Integer The numbers of items to return (optional)
 * returns List
 **/
exports.routingBetweenStops = function(fromStopId,toStopId,departureDate,arrivalDate) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "departureTime" : "departureTime",
  "routes" : [ { }, { } ],
  "arrivalStop" : 6,
  "departureStop" : 0,
  "arrivalTime" : "arrivalTime",
  "fareTotal" : 1.4658129805029452
}, {
  "departureTime" : "departureTime",
  "routes" : [ { }, { } ],
  "arrivalStop" : 6,
  "departureStop" : 0,
  "arrivalTime" : "arrivalTime",
  "fareTotal" : 1.4658129805029452
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

