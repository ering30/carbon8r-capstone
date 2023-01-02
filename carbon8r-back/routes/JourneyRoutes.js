var express = require('express');
// var flightController = require('../controllers/flightController')
// var vehicleController = require('../controllers/flightController')
var journeyController = require('../controllers/journeyController')
var router = express.Router();

router.post("/addJourney", (req,res) => { // WORKS
    console.log("router here")
    journeyController.addJourney(req, res)
})

router.get("/allUserJourneys/:userID", (req,res) => { // works
    console.log("router here")
    journeyController.getUserJourneys(req, res)
})

router.get("/allJourneys", (req,res) => { //works -- for admins??
    console.log("router here")
    journeyController.getAllJourneys(req, res)
})

router.delete('/deleteOneJourney/:journey_id', (req,res) => { // works
    journeyController.deleteOneJourney(req, res)
})

router.delete('/deleteAllUserJourneys', (req,res) => { // to be tested
    journeyController.deleteAllUserJourneys(req, res)
})

module.exports = router;