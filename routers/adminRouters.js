const express = require("express");
const { adminController } = require("../controllers");
const routers = express.Router();

routers.get("/getadmin", adminController.getData);
routers.get("/getadmin/:id", adminController.getDataById);
routers.patch("/updateProfile/:iduser", adminController.editProfile);

module.exports = routers;
