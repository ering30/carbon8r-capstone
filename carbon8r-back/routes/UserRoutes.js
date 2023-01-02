var express = require('express');
var userController = require('../controllers/userController')
var router = express.Router();

router.get("/all", (req,res) => {
    userController.getAllUsers(req, res)
})

router.get("/one", (req, res) => {
    userController.getOneUser(req,res)
})

router.post("/register", (req, res) => { 
    console.log('router', req)
    
    userController.registerUser(req,res)
})

module.exports = router;