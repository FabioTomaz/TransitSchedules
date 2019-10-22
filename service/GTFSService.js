'use strict';


/**
 * Uploud new gtfs
 * This can only be done by the logged in user.
 *
 * body Object 
 * no response value expected for this operation
 **/
exports.createUser = function(body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Deletes a gtfs
 *
 * gtfsId Long Gtfs id to delete
 * no response value expected for this operation
 **/
exports.deleteGtfs = function(agencyKey) {
  let promises = [];

  promises.push(
      Agencies.deleteMany(
          { agency_key: agencyKey }, 
          (err) => {
              if (err) return handleError(err);
          }
      )
  );

  promises.push(
      CalendarDates.deleteMany(
          { agency_key: agencyKey }, 
          (err) => {
              if (err) return handleError(err);
          }
      )
  );

  promises.push(
      Calendar.deleteMany(
          { agency_key: agencyKey }, 
          (err) => {
              if (err) return handleError(err);
          }
      )
  );

  promises.push(
      FareAttributes.deleteMany(
          { agency_key: agencyKey }, 
          (err) => {
              if (err) return handleError(err);
          }
      )
  );

  promises.push(
      FareRules.deleteMany(
          { agency_key: agencyKey }, 
          (err) => {
              if (err) return handleError(err);
          }
      )
  );

  promises.push(
      FeedInfos.deleteMany(
          { agency_key: agencyKey }, 
          (err) => {
              if (err) return handleError(err);
          }
      )
  );

  promises.push(
      Frequencies.deleteMany(
          { agency_key: agencyKey }, 
          (err) => {
              if (err) return handleError(err);
          }
      )
  );

  promises.push(
      Routes.deleteMany(
          { agency_key: agencyKey }, 
          (err) => {
              if (err) return handleError(err);
          }
      )
  );

  promises.push(
      Shapes.deleteMany(
          { agency_key: agencyKey }, 
          (err) => {
              if (err) return handleError(err);
          }
      )
  );

  promises.push(
      StopAttributes.deleteMany(
          { agency_key: agencyKey }, 
          (err) => {
              if (err) return handleError(err);
          }
      )
  );

  promises.push(
      Stops.deleteMany(
          { agency_key: agencyKey }, 
          (err) => {
              if (err) return handleError(err);
          }
      )
  );

  promises.push(
      StopTimes.deleteMany(
          { agency_key: agencyKey }, 
          (err) => {
              if (err) return handleError(err);
          }
      )
  );

  promises.push(
      TimeTablePages.deleteMany(
          { agency_key: agencyKey }, 
          (err) => {
              if (err) return handleError(err);
          }
      )
  );

  promises.push(
      TimeTables.deleteMany(
          { agency_key: agencyKey }, 
          (err) => {
              if (err) return handleError(err);
          }
      )
  );

  promises.push(
      TimeTablesStopOrders.deleteMany(
          { agency_key: agencyKey }, 
          (err) => {
              if (err) return handleError(err);
          }
      )
  );

  promises.push(
      Transfers.deleteMany(
          { agency_key: agencyKey }, 
          (err) => {
              if (err) return handleError(err);
          }
      )
  );

  promises.push(
      Trips.deleteMany(
          { agency_key: agencyKey }, 
          (err) => {
              if (err) return handleError(err);
          }
      )
  );

  return Promise.all(promises).then(() => {
    return true;
  }).catch((err) => {
    return false;
  })
}

