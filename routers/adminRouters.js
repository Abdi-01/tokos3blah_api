const express = require("express");
const { adminController } = require("../controllers");
const routers = express.Router();

routers.get("/getadmin", adminController.getData);
routers.patch("/updateProfile/:iduser", adminController.editProfile);

module.exports = routers;
