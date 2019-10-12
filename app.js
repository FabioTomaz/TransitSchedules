var gtfsImportConfig ={
    "mongoUrl": "mongodb://localhost:27017/gtfs",
    "agencies": [
      {
        "agency_key": "localAgency",
        "path": "/path/to/the/unzipped/gtfs/"
      }
    ],
    "verbose": false,
    "skipDelete": true
};
let express = require('express'); 
let app = express(); 
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/gtfs', {useNewUrlParser: true});
//mongoose.connect(gtfsImportConfig.mongoUrl, {useNewUrlParser: true});
let conn = mongoose.connection;
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

let multer = require('multer');
const gtfs = require('gtfs');
let port = 3000;

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
        gtfs.import(gtfsImportConfig).then(() => {
            return resp.json('Import Successful');
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

app.listen(port, (req, res) => {
    console.log("Server started on port: " + port);
});