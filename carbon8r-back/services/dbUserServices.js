const sql = require("../index")
const { result } = require("lodash");

let dbGetUserByUserName = async (req, res)=>{ // WORKS
    console.log("db services here")
    let userName = req.query.username
    return new Promise((resolve, reject) => {
        let sqlQuery = `SELECT * FROM users WHERE username=${userName}`;
        
        sql.query(sqlQuery, (err, result, field) => {
            if(err) return reject(err);
            resolve(Object.values((result)));
        });
        return result;
    });
}

let dbRegisterUser = async (req, res)=>{ // WORKS
    console.log("db services here")
    
    let email = req.body.email
    let password = req.body.user_password
    let username = req.body.username

    return new Promise((resolve, reject) => {
        let sqlQuery = `INSERT INTO users (email, user_password, username) VALUES("${email}", "${password}", "${username}")`
        
        sql.query(sqlQuery, (err, result, field) => {
            if(err) return reject(err);
            resolve(Object.values((result)));
        });
        return `Sucessfully registered ${email}. Please sign in to continue.`
    });
}

let dbGetAllUsers = async (req, res)=>{ // asc by user iD
    console.log("db services here")
    return new Promise((resolve, reject) => {
        let sqlQuery = `SELECT * FROM users ORDER BY user_id ASC`;
        
        sql.query(sqlQuery, (err, result, field) => {
            if(err) return reject(err);
            resolve(Object.values((result)));
        });
        return result;
    });
}



module.exports = {
    dbGetUserByUserName,
    dbRegisterUser,
    dbGetAllUsers
}