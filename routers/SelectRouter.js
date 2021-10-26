const express = require("express");
const { SelectController } = require("../controllers");

const routers = express.Router();

routers.get("/get", SelectController.getData);


module.exports = routers;