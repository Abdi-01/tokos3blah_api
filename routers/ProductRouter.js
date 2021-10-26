const express = require("express");
const { ProductController } = require("../controllers");

const routers = express.Router();

routers.get("/get/:id", ProductController.getData);
routers.post("/add-product-warehouse", ProductController.addProductWarehouse);
routers.post("/add-product", ProductController.addProduct);
routers.patch("/edit-product/:id", ProductController.editProduct);
routers.delete("/delete-product/:id", ProductController.deleteProduct);

module.exports = routers;
