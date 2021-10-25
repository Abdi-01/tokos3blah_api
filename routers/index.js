
const adminRouters = require('./adminRouters')
const userRouters = require('./userRouters')
const warehouseRouters = require ('./warehouseRouters')
const ProductRouter = require("./ProductRouter");
const HomeRouter = require("./HomeRouter");
const SelectRouter = require("./SelectRouter");

module.exports = {
  adminRouters,
  userRouters,

  warehouseRouters ,
  ProductRouter,
  HomeRouter,
  SelectRouter,
};

