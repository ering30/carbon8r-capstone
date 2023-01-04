const dbJourneyServices = require('../services/dbJourneyServices')

const addJourney = async (req,res)=>{  // works
    console.log("controller here")
    let data = await dbJourneyServices.dbSaveOneJourney(req, res)
    console.log(data)
    res.send(data)
}

const getUserJourneys = async (req,res)=>{  //WORKS
    console.log("controller here")
    let data = await dbJourneyServices.dbGetAllUserJourneys(req, res)
    console.log(data)
    res.send(data)
}

const getAllJourneys = async (req,res)=>{  //WORKS
    console.log("controller here")
    let data = await dbJourneyServices.dbGetAllJourneys(req, res)
    console.log(data)
    res.send(data)
}

const deleteOneJourney = async (req,res)=>{  // works
    console.log("controller here")
    let data = await dbJourneyServices.dbDeleteOneJourney(req, res)
    console.log(data)
    res.send(data)
}

const deleteAllUserJourneys = async (req,res)=>{  // future feature
    console.log("controller here")
    let data = await dbJourneyServices.dbDeleteAllUserJourneys(req, res)
    console.log(data)
    res.send(data)
}

module.exports = {
    addJourney,
    getUserJourneys,
    getAllJourneys,
    deleteOneJourney,
    deleteAllUserJourneys
}