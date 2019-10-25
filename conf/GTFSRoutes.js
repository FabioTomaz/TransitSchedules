var express = require('express');
var multer = require('multer');
var router = express.Router();

var GTFSController = require('../controllers/GTFS')


let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../tmp')
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

router.post('/gtfs', upload, GTFSController.createGtfs)
router.delete('/gtfs/:agencyKey', GTFSController.deleteGtfs)

module.exports = router;