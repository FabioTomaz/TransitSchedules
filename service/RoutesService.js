'use strict';

let gtfs = require('gtfs');


function distance(lat1, lon1, lat2, lon2, unit) {
	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	} else {
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = lon1-lon2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		if (unit=="K") { dist = dist * 1.609344 }
		if (unit=="N") { dist = dist * 0.8684 }
		return dist;
	}
}

/**
 * Get a specific route
 * Returns a single route from a routeId and a agencyKey
 *
 * routeId Long ID of the route to return
 * returns Route
 **/
exports.getRouteById = function(routeId) {
  return gtfs.getRoutes({
    route_id: routeId
  }).then(routes => {
      if(routes.length == 0) {
          return -1;
      }
      return routes[0];
  }).catch(err => {
      throw err;
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
    examples['application/json'] = {
      "routes" : [ { }, { } ],
      "arrivalStop" : 6,
      "departureStop" : 0,
      "departureTime" : "departureTime",
      "arrivalTime" : "arrivalTime",
      "fareTotal" : 1.4658129805029452
    };
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

