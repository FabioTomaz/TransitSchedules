var gtfsImportConfig ={
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

let express = require('express'); 
let multer = require('multer');
let app = express(); 
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/gtfs', {useNewUrlParser: true});
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
let Graph = require('node-dijkstra');
const DEFAULT_WALK_VELOCITY = 4.0;

let port = 3000;

let stopsGraph = new Graph();

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
            gtfs(gtfsImportConfig).then(() => {
                return resp.json();
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
        return res.json(routes);
    }).catch(err => {
        return res.json(err);
    });
});

app.get("/agency", (req, res) => {
    gtfs.getAgencies()
      .then(agencies => {
        return res.json(agencies);
    }).catch(err => {
        return res.json(err);
    });
});

app.get("/agency/:agencyKey", (req, res) => {
    gtfs.getAgencies({
        agency_key: req.params.agencyKey
    }).then(agencies => {
        return res.json(agencies);
    }).catch(err => {
        return res.json(err);
    });
});

app.get("/stop", (req, res) => {
    gtfs.getStops().then(stops => {
        return res.json(stops);
    }).catch(err => {
        return res.json(err);
    });
});

app.get("/stop/:stopId", (req, res) => {
    gtfs.getStops({
        stop_id: req.params.stopId
    }).then(stops => {
        return res.json(stops);
    }).catch(err => {
        return res.json(err);
    });
});

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
 
app.listen(port, (req, res) => {
    gtfs.getStops().then((stop) => {
        return gtfs.getStops({
            within: {
                lat: stop.stop_lat,
                lon: stop_lon,
                radius: 2
            }
        }).then((nearStop) => {
            let timeWalkingBetweenStations = distance(stop.stop_lat, stop.stop_lon, nearStop.stop_lat, nearStop.stop_lon, "K")/DEFAULT_WALK_VELOCITY ;
            stopsGraph.addNode(stop.stop_id, { [nearStop.stop_id]: timeWalkingBetweenStations});
            return stop;
        })
    }).then((stop) => {
        // get stops from gtfs connections
    });
    console.log("Transit Schedules API. Server started on port: " + port);
});