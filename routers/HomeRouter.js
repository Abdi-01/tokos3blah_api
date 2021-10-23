const express = require("express");
const { HomeController } = require("../controllers");

const routers = express.Router();

routers.get("/get", HomeController.getData);
routers.get("/detail/:productId", HomeController.getDataById);

module.exports = routers;