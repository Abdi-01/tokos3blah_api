
const adminController = require ('./adminController')
const userControllers = require ('./userController')
const warehouseControllers = require ('./warehouseController')
const ProductController = require("./ProductController");
const HomeController = require("./HomeController");
const SelectController = require("./SelectController");
const AddressController = require('./AddressController')


module.exports = {
  adminController,
  userControllers,
  warehouseControllers,
  ProductController,
  HomeController,
  SelectController,
  AddressController
};

