const express = require("express");
const { ProductController } = require("../controllers");

const routers = express.Router();

routers.get("/get", ProductController.getData);
routers.get("/getWarehouse", ProductController.getDataWarehouse);
routers.post("/add-product", ProductController.addProduct);
routers.patch("/edit-product/:id", ProductController.editProduct);
routers.delete("/delete-product/:id", ProductController.deleteProduct);

module.exports = routers