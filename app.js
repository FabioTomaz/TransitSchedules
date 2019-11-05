var gtfsImportConfig ={
    "mongoUrl": "mongodb://mongo:27017/gtfs",
    "agencies": [
      {
        "agency_key": "localAgency",
        "path": "/path/to/the/unzipped/gtfs/"
      }
    ],
    "verbose": false,
    "skipDelete": true,
};

let express = require('express'); 
let multer = require('multer');
let app = express(); 
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(
    'mongodb://mongo:27017/gtfs', 
    {useNewUrlParser: true}
);
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
let gtfs = require('gtfs');
let Graph = require('ngraph.graph');
let path = require('ngraph.path');
let googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyBUCpE_kEKGhSUmdXkRMf2Mn6_ydXpiMz0'
});

var port = 3000;

var stopsGraph = new Graph();

var pathFinder = path.aStar(stopsGraph, {
    oriented: true,
    distance: (fromNode, toNode, link) => {
        // In this case we have coordinates. Lets use them as
        // distance between two nodes:
        return link.data.weight * distance(fromNode.data.lat, fromNode.data.lon, toNode.data.lat, toNode.data.lon);
    },
    heuristic: (fromNode, toNode) => {
        // this is where we "guess" distance between two nodes.
        // In this particular case our guess is the same as our distance
        // function:
        return distance(fromNode.data.lat, fromNode.data.lon, toNode.data.lat, toNode.data.lon);
    }
  });

// Setting up the root route
app.get('/', (req, res) => {
    res.send('Welcome to the express server');
});

// Allows cross-origin domains to access this API
app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin' , 'http://localhost:4200');
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append("Access-Control-Allow-Headers", "Origin, Accept,Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    res.append('Access-Control-Allow-Credentials', true);
    next();
});

// BodyParser middleware
app.use(bodyParser.json());

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '/tmp')
    },
    filename: function (req, file, cb) {
      let filename = file.originalname.split(".")[0] + '-' + Date.now() + ".zip";  
      cb(null, filename)
    }
});

// Multer configuration for single file uploads
let upload = multer({ 
    storage: storage,
    fileFilter: function (req, file, cb) {
        if(file.originalname.endsWith('.zip')) {
            // To accept the file pass `true`, like so:
            cb(null, true)
        }
        // To reject this file pass `false`, like so:
        cb(null, false)
    }
}).single('file');

// Route for file upload
app.post(
    '/gtfs', 
    upload, 
    (req, resp, next) => {
        console.log(req.file.path);
        gtfsImportConfig.agencies[0].path = req.file.path;
        gtfsImportConfig.agencies[0].agency_key = req.file.originalname.split(".")[0];
        gtfs.import(gtfsImportConfig).then(() => {
            return resp.json({"status": "Import Successfull"});
        }).catch(err => {
            return resp.json(err);
        });
    }
);

// Route for getting all the files
app.delete('/gtfs/:agencyKey', (req, res) => {
    let promises = [];

    promises.push(
        Agencies.deleteMany(
            { agency_key: req.params.agencyKey }, 
            (err) => {
                if (err) return handleError(err);
            }
        )
    );

    promises.push(
        CalendarDates.deleteMany(
            { agency_key: req.params.agencyKey }, 
            (err) => {
                if (err) return handleError(err);
            }
        )
    );

    promises.push(
        Calendar.deleteMany(
            { agency_key: req.params.agencyKey }, 
            (err) => {
                if (err) return handleError(err);
            }
        )
    );

    promises.push(
        FareAttributes.deleteMany(
            { agency_key: req.params.agencyKey }, 
            (err) => {
                if (err) return handleError(err);
            }
        )
    );

    promises.push(
        FareRules.deleteMany(
            { agency_key: req.params.agencyKey }, 
            (err) => {
                if (err) return handleError(err);
            }
        )
    );

    promises.push(
        FeedInfos.deleteMany(
            { agency_key: req.params.agencyKey }, 
            (err) => {
                if (err) return handleError(err);
            }
        )
    );

    promises.push(
        Frequencies.deleteMany(
            { agency_key: req.params.agencyKey }, 
            (err) => {
                if (err) return handleError(err);
            }
        )
    );

    promises.push(
        Routes.deleteMany(
            { agency_key: req.params.agencyKey }, 
            (err) => {
                if (err) return handleError(err);
            }
        )
    );

    promises.push(
        Shapes.deleteMany(
            { agency_key: req.params.agencyKey }, 
            (err) => {
                if (err) return handleError(err);
            }
        )
    );

    promises.push(
        StopAttributes.deleteMany(
            { agency_key: req.params.agencyKey }, 
            (err) => {
                if (err) return handleError(err);
            }
        )
    );

    promises.push(
        Stops.deleteMany(
            { agency_key: req.params.agencyKey }, 
            (err) => {
                if (err) return handleError(err);
            }
        )
    );

    promises.push(
        StopTimes.deleteMany(
            { agency_key: req.params.agencyKey }, 
            (err) => {
                if (err) return handleError(err);
            }
        )
    );

    promises.push(
        TimeTablePages.deleteMany(
            { agency_key: req.params.agencyKey }, 
            (err) => {
                if (err) return handleError(err);
            }
        )
    );

    promises.push(
        TimeTables.deleteMany(
            { agency_key: req.params.agencyKey }, 
            (err) => {
                if (err) return handleError(err);
            }
        )
    );

    promises.push(
        TimeTablesStopOrders.deleteMany(
            { agency_key: req.params.agencyKey }, 
            (err) => {
                if (err) return handleError(err);
            }
        )
    );

    promises.push(
        Transfers.deleteMany(
            { agency_key: req.params.agencyKey }, 
            (err) => {
                if (err) return handleError(err);
            }
        )
    );

    promises.push(
        Trips.deleteMany(
            { agency_key: req.params.agencyKey }, 
            (err) => {
                if (err) return handleError(err);
            }
        )
    );

    return Promise.all(promises).then(
        () => {return res.json("Delete Sucessfull")}
    );
});

app.get("/route/:routeId", (req, res) => {
    gtfs.getRoutes({
        route_id: req.params.routeId
    }).then(routes => {
        if(routes.length == 0) {
            return res.status(404).send({});
        }
        return res.json(routes[0]);
    }).catch(err => {
        return res.json(err);
    });
});

function randomIntFromInterval(min, max) {  
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function normalizeDate(date) {
    date = date == undefined ? date: new Date();
    date.setFullYear(1970);
    date.setMonth(0);
    date.setDate(1);
    return date.getTime();
}

app.get("/route/:fromStopId/:toStopId", (req, res) => {
    let formatedPath = [];
    let fareTotal = 0.0;
    let departureTime = normalizeDate(req.query.departureTime);
    let arrivalTime = normalizeDate(req.query.arrivalTime);
    let finalDepartureTime = 0.0;
    let finalArrivalTime = 0.0;
    try {
        let pathPiece = [];
        let foundPath = pathFinder.find(
            req.params.fromStopId, 
            req.params.toStopId
        ).reverse();
        for (let i=0; i<foundPath.length; i++) {
            if(i<foundPath.length-1) {
                let nextStop = foundPath[i+1];
                for (let link of foundPath[i].links) {
                    if(link.toId == nextStop.id){
                        foundPath[i]["link"] = link;
                        break;
                    }
                }
            }
            delete foundPath[i]["links"];
            if (foundPath[i].link == undefined || foundPath[i].link.weight > 1) {
                pathPiece.push(foundPath[i]);
                let fare = 3; //randomIntFromInterval(1,8);
                fareTotal += fare;
                formatedPath.push(
                    {
                        path: pathPiece,
                        trip_id: 0,
                        fare: fare,
                        departure_time: 0.0,
                        arrival_time: 0.0
                    }
                );
                pathPiece = [];
            } else {
                pathPiece.push(foundPath[i]);
            }
        }
    } catch(ex) {
        return res.status(400).send({ 
            error: 'Incorrect fromStopId or toStopId provided!' 
        });
    }
    let jsonRes = {
        routes: formatedPath,
        despartureStop: req.params.fromStopId,
        arrivalStop: req.params.toStopId,
        departureTime: finalDepartureTime,
        arrivalTime: finalArrivalTime,
        fareTotal: fareTotal,
        found: formatedPath.length>0 ? true: false,
    };
    return res.json(jsonRes);
});

app.get("/agency", (req, res) => {
    let query = getQuery(req);
    if(query == null) {
        return res.status(400).send({ 
            error: 'Both latitude and longitude must be provided!' 
        });
    }   
    gtfs.getAgencies(query).then(agencies => {
        if(agencies.length == 0) {
            return res.status(404).send([]);
        }
        return res.json(agencies);
    }).catch(err => {
        return res.json(err);
    });
});

app.get("/agency/:agencyKey", (req, res) => {
    gtfs.getAgencies({
        agency_key: req.params.agencyKey
    }).then(agencies => {
        if(agencies.length == 0) {
            return res.status(404).send({});
        }
        return res.json(agencies[0]);
    }).catch(err => {
        return res.json(err);
    });
});

app.get("/stop", (req, res) => {
    let query = getQuery(req);
    if(query == null) {
        return res.status(400).send({ 
            error: 'Both latitude and longitude must be provided!' 
        });
    }
    gtfs.getStops(query).then(stops => {
        if(stops.length == 0) {
            return res.status(404).send([]);
        }
        return res.json(stops);
    }).catch(err => {
        return res.json(err);
    });
});

app.get("/stop/:stopId", (req, res) => {
    gtfs.getStops({
        stop_id: req.params.stopId
    }).then(stops => {
        if(stops.length == 0) {
            return res.status(404).send({});
        }
        return res.json(stops[0]);
    }).catch(err => {
        return res.json(err);
    });
});

app.get("/stoptimes/:stopId", (req, res) => {
    // Get all stoptimes for a specific stop
    gtfs.getStoptimes({
        agency_key: 'localAgency',
        stop_id: req.params.stopId
    }).then(stoptimes => {
        console.log(stoptimes);
        return res.json(stoptimes);
    });
});

function getQuery(req) {
    let lat = req.query.lat;
    let lon = req.query.long;
    if((lat !== undefined && lon === undefined) || (lat === undefined && lon !== undefined)){
        return null;
    }
    let query = {};
    if (lat !== undefined) {
        query = {
            within: {
                lat: lat,
                lon: lon,
                radius: 5
            } 
        };
    }
    return query;
}

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

/*

db.getCollection("stoptimes").aggregate([
    {
        $match:
            {
                'stop_id': '11031005',
            }
    },
    {
        $addFields: {
            convertedDate: {
                $toDate: {
                    $multiply: [
                        "$arrival_timestamp",
                        1000
                    ]
                }
            }
        }
    },
    {
        $match:
            {
                'convertedDate': {$gte: ISODate("1970-01-01T08:28:30.000+0000")},
            }
    },
    {
        $sort: { "convertedDate": 1 }
    }
],
    {
        allowDiskUse: true
    }
).next()
*/

app.listen(port, (req, res) => {
    gtfs.getStops().then((stops) => {
        let promises = [];
        for(let stop of stops) {
            if(stopsGraph.getNode(stop.stop_id)==undefined) {
                stopsGraph.addNode(stop.stop_id, {lat: stop.stop_lat, lon: stop.stop_lon});
            }
            promises.push(
                gtfs.getStops({
                    within: {
                        lat: stop.stop_lat,
                        lon: stop.stop_lon,
                        radius: 0.1
                    }
                }).then((nearStops) => {
                    for(let nearStop of nearStops) {
                        if(nearStop.stop_id == stop.stop_id) {
                            continue;
                        }
                        if(stopsGraph.getNode(nearStop.stop_id)==undefined) {
                            stopsGraph.addNode(nearStop.stop_id, {lat: nearStop.stop_lat, lon: nearStop.stop_lon});
                        }
                        if(stopsGraph.getLink(stop.stop_id, nearStop.stop_id)==null){
                            stopsGraph.addLink(stop.stop_id, nearStop.stop_id, {weight: 5});
                        }
                    }
                }).catch((err) => {
                    console.log(err);
                })
            );
        }

        return Promise.all(promises);
    }).then((stops) => {
        return StopTimes.aggregate([
            {
                $sort : { 
                    'stop_sequence': 1 
                }
            }, 
            {
                $group: {
                    _id: "$trip_id",
                    "records": {
                        $push: "$$ROOT"
                    }
                }
            }
        ]).allowDiskUse(true).exec((err ,res)=> {
            for(let tripStoptimes of res) {
                let previousStoptime = null;
                for(let stoptime of tripStoptimes.records) {
                    if(previousStoptime!=null && stopsGraph.getLink(previousStoptime.stop_id, stoptime.stop_id)==null){
                        stopsGraph.addLink(
                            previousStoptime.stop_id, 
                            stoptime.stop_id, 
                            {
                                weight: 1, 
                                tripId: stoptime.trip_id,
                            }
                        );
                    }
                    previousStoptime = stoptime;
                }
            }

            console.log("Route graph successfully created.");
            console.log("Nodes: " + stopsGraph.getNodesCount());
            console.log("Links: " + stopsGraph.getLinksCount());
        });
    });
    console.log("Transit Schedules API. Server started on port: " + port);
});