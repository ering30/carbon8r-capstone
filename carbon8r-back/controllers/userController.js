const dbUserServices = require('../services/dbUserServices')

const getAllUsers = async (req,res)=>{  // works
    console.log("controller here")
    let data = await dbUserServices.dbGetAllUsers(req, res)
    console.log(data)
    res.send(data)
}

const getOneUser = async (req,res)=>{  // works
    console.log("controller here")
    let data = await dbUserServices.dbGetUserByUserName(req, res)
    console.log(data)
    res.send(data)
}

const registerUser = async (req,res)=>{  //works
    console.log("controller here")
    let data = await dbUserServices.dbRegisterUser(req, res)
    res.send(data)
}

const deleteOneUser = async (req,res)=>{  // works
    console.log("controller here")
    let data = await dbUserServices.dbDeleteUser(req, res)
    res.send(data)
}


module.exports = {
    getAllUsers,
    getOneUser,
    registerUser,
    deleteOneUser,
}