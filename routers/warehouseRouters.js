const express = require("express");
const { warehouseControllers } = require("../controllers");
const routers = express.Router();


routers.get("/getWarehouse", warehouseControllers.getWarehouse)
routers.post("/addWarehouse", warehouseControllers.addWarehouse)
routers.patch("/editWarehouse/:id_warehouse", warehouseControllers.editWarehouse)
routers.patch("/deleteWarehouse/:", warehouseControllers.delWarehouse)

module.exports = routers