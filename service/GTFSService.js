'use strict';

let gtfs = require('gtfs');
let mongoose = require('mongoose');
var schema = new mongoose.Schema({ name: 'string', size: 'string' });
var Agencies = mongoose.model('agencies', schema);
var CalendarDates = mongoose.model('calendardates', schema);
var Calendar = mongoose.model('calendar', schema);
var FareAttributes = mongoose.model('fareattributes', schema);
var FareRules = mongoose.model('feedrules', schema);
var FeedInfos = mongoose.model('feedinfos', schema);
var Frequencies = mongoose.model('frequencies', schema);
var Routes = mongoose.model('routes', schema);
var Shapes = mongoose.model('shapes', schema);
var StopAttributes = mongoose.model('stopattributes', schema);
var Stops = mongoose.model('stops', schema);
var StopTimes = mongoose.model('stoptimes', schema);
var TimeTablePages = mongoose.model('timetablepages', schema);
var TimeTables = mongoose.model('timetables', schema);
var TimeTablesStopOrders = mongoose.model('timetablestoporders', schema);
var Transfers = mongoose.model('transfers', schema);
var Trips = mongoose.model('trips', schema);

let gtfsImportConfig ={
    "mongoUrl": "mongodb://localhost:27017/gtfs",
    "agencies": [
      {
        "agency_key": "localAgency",
        "path": "/path/to/the/unzipped/gtfs/"
      }
    ],
    "verbose": false,
    "skipDelete": true,
    "outputType": "route"
};

/**
 * Uploud new gtfs
 * This can only be done by the logged in user.
 *
 * body Object 
 * no response value expected for this operation
 **/
exports.createGTFS = function(filePath) {
    console.log(filePath);
    gtfsImportConfig.agencies[0].path = filePath;
    return gtfs.import(gtfsImportConfig).then(() => {
        console.log("Import Successfull");
    }).catch(err => {
        throw err;
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

  return Promise.all(promises).catch((err) => {
    throw err;
  });
}

