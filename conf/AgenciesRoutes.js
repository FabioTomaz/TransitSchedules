var express = require('express');
var router = express.Router();

var AgenciesController = require('../controllers/Agencies')

router.get('/agency', AgenciesController.getAgencies)
router.get('/agency/:agencyKey', AgenciesController.getAgencyById)

module.exports = router;