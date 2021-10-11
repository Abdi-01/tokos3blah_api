const express = require ('express')
const {adminController} = require ('../controllers')
const routers = express.Router()

routers.get('/getadmin', adminController.getData)

module.exports = routers