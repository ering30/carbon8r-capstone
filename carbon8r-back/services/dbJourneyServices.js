const { result } = require("lodash");
const sql = require("../index")

let dbGetAllUserJourneys = async (req, res)=>{ // works
    console.log("db services here")
    let userID = req.params.userID // path param

    return new Promise((resolve, reject) => {
        let sqlQuery = `SELECT * FROM journeys WHERE user_id=${userID} ORDER BY nickname ASC`;
        sql.query(sqlQuery, (err, result, field) => {
            if(err) return reject(err);
            resolve(Object.values((result)));
        });
        return result;
    });
}

let dbGetAllJourneys = async (req, res)=>{ // works
    console.log("db services here")

    return new Promise((resolve, reject) => {
        let sqlQuery = `SELECT * FROM journeys ORDER BY user_id ASC`;
        
        sql.query(sqlQuery, (err, result, field) => {
            if(err) return reject(err);
            resolve(Object.values((result)));
        });
        return result;
    });
}

let dbGetOneJourney = async (req, res)=>{ // not used, potential future feature
    console.log("db services here")

    return new Promise((resolve, reject) => {
        let sqlQuery = `SELECT * FROM journeys WHERE user_id=${userID} AND nickname=${journeyNickname}`;
        
        sql.query(sqlQuery, (err, result, field) => {
            if(err) return reject(err);
            resolve(Object.values((result)));
        });
        return result;
    });
}

// not working yet
let dbSaveOneJourney = async (req, res)=>{ // works. future: update db and remove adding to origin & destination columns (not used)
    console.log("db services here")
    console.log(req.body);

    let userID = req.body.userID
    let nickname = req.body.nickname
    let origin = req.body.origin
    let origin_name = req.body.origin_name
    let destination = req.body.destination
    let destination_name = req.body.destination_name
    let emissions = req.body.g_CO2
    let distance = req.body.distance
    let vehicle_type = req.body.vehicle_type

    return new Promise((resolve, reject) => {
        let sqlQuery = `INSERT INTO journeys (nickname, user_id, origin, origin_name, destination, destination_name, g_co2, tot_distance, vehicle_type)
        VALUES ("${nickname}", ${userID}, "${origin}", "${origin_name}", "${destination}", "${destination_name}", ${emissions}, ${distance}, "${vehicle_type}");`
        
        sql.query(sqlQuery, (err, result, field) => {
            if(err) return reject(err);
            resolve(Object.values((result)))
        });
        return result;
    });
}

let dbUpdateOneJourney = async (req, res)=>{ 
    console.log("db services here")
    let newName = req.params.newName
    let journey_id = req.params.journey_id

    return new Promise((resolve, reject) => {
        let sqlQuery = `UPDATE journeys SET nickname = ${newName} WHERE journey_id = ${journey_id}`;
        
        sql.query(sqlQuery, (err, result, field) => {
            if(err) return reject(err);
            resolve(Object.values((result)));
        });
        return `Updated journey name to ${newName}.`;
    });
}

let dbDeleteOneJourney = async (req, res)=>{  // to be tested
    console.log("db services here")
    let journey_id = req.params.journey_id

    return new Promise((resolve, reject) => {
        let sqlQuery = `DELETE FROM journeys WHERE journey_id = ${journey_id}`;
        
        sql.query(sqlQuery, (err, result, field) => {
            if(err) return reject(err);
            resolve(Object.values((result)));
        });
        return result;
    });
}

let dbDeleteAllUserJourneys = async (req, res)=>{  // to be tested
    console.log("db services here")
    let user_id = req.params.user_id

    return new Promise((resolve, reject) => {
        let sqlQuery = `DELETE FROM journeys WHERE user_id = ${user_id}`;
        
        sql.query(sqlQuery, (err, result, field) => {
            if(err) return reject(err);
            resolve(Object.values((result)));
        });
        return `Deleted all journeys`;
    });
}

// journey_id INT AUTO_INCREMENT, 
//   nickname VARCHAR(50) DEFAULT 'My Trip',
//   user_id INT NOT NULL, 
//   origin VARCHAR(50) NOT NULL,
//   origin_name VARCHAR(200), 
//   destination VARCHAR(50) NOT NULL,
//   destination_name VARCHAR(200),
//   g_CO2 INT NOT NULL, 
//   tot_distance INT, 
//   vehicle_type VARCHAR(20) NOT NULL, 
//   PRIMARY KEY (journey_id),
//   FOREIGN KEY (user_id) REFERENCES users(user_id)

module.exports = {
    dbGetAllUserJourneys,
    dbGetAllJourneys,
    dbGetOneJourney,
    dbSaveOneJourney,
    dbUpdateOneJourney,
    dbDeleteOneJourney,
    dbDeleteAllUserJourneys
}