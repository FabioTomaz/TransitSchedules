'use strict';


/**
 * Get a specific stop
 * Returns a single stop
 *
 * stopId Long ID of the stop to return
 * returns Stop
 **/
exports.getStopById = function(stopId) {
  return gtfs.getStops({
      stop_id: req.params.stopId
  }).then(stops => {
      if(stops.length == 0) {
          return res.status(404).send({});
      }
      return res.json(stops[0]);
  }).catch(err => {
      return res.json(err);
  });
}


/**
 * Get all stops
 * Returns all stops stored from GTFS's uplouded
 *
 * returns List
 **/
exports.getStops = function() {
  return gtfs.getStops(query).then(stops => {
    if(stops.length == 0) {
        return res.status(404).send([]);
    }
    return res.json(stops);
  }).catch(err => {
      return res.json(err);
  });
}

