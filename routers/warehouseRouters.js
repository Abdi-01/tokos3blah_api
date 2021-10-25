const express = require("express");
const { warehouseControllers } = require("../controllers");
const routers = express.Router();


routers.get("/getWarehouse", warehouseControllers.getWarehouse)
routers.post("/addWarehouse", warehouseControllers.addWarehouse)
routers.patch("/editWarehouse", warehouseControllers.editWarehouse)
routers.post("/delete-warehouse/", warehouseControllers.delWarehouse)

module.exports = routers