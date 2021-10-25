const express = require("express");
const {AddressController} = require ("../controllers")
const routers = express.Router();

routers.get("/get-address", AddressController.getAddress)
routers.post("/add-address", AddressController.addAddress)
routers.patch("/edit-address", AddressController.editAddress)
routers.post("/delete-address", AddressController.delAddress)

module.exports = routers