const express = require ('express')
const {adminController} = require ('../controllers')
const { getData } = require('../controllers/adminController')
const routers = express.Router()

routers.get('/getadmin',adminController,getData)

module.exports = routers