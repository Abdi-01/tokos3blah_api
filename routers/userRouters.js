const express = require("express");
const { userControllers } = require("../controllers");
const { auth } = require("../helper/authToken");
const routers = express.Router();

routers.post("/login", userControllers.getData);
routers.post("/regis", userControllers.addData);
routers.patch("/verified", auth, userControllers.verification);
routers.post("/keep-login", auth, userControllers.keepLogin);
routers.post("/forgot-pass", userControllers.forgotPass);
routers.post("/change-pass", userControllers.changePass);
routers.get("/getAdmin", userControllers.getAdmin);
routers.post("/addAdmin", userControllers.addAdmin);
routers.patch("/edit-admin", userControllers.editAdmin);
routers.post("/delete-admin", userControllers.delAdmin);

module.exports = routers;
