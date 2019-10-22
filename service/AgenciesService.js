'use strict';


/**
 * Get all transportation agencies
 * Returns all agencies stored frmo GTFS's uplouded
 *
 * returns List
 **/
exports.getAgencies = function(query) {
  return gtfs.getAgencies(query).then(agencies => {
    if(agencies.length == 0) {
        return res.status(404).send([]);
    }
    return res.json(agencies);
  }).catch(err => {
      return res.json(err);
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
      agency_key: req.params.agencyKey
  }).then(agencies => {
      if(agencies.length == 0) {
          return res.status(404).send({});
      }
      return res.json(agencies[0]);
  }).catch(err => {
      return res.json(err);
  });
}

