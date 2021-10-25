const express = require("express");
const cors = require("cors");
const bearerToken = require("express-bearer-token");

const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());
app.use(bearerToken());
app.use(express.static("public"));

const { userRouters } = require("./routers");
const { adminRouters } = require("./routers");

const { warehouseRouters } = require("./routers");
const { ProductRouter } = require("./routers");
const { HomeRouter } = require("./routers");
const { SelectRouter } = require("./routers");

app.use("/users", userRouters);
app.use("/warehouse", warehouseRouters);
app.use("/admin", adminRouters);
app.use("/products", ProductRouter);
app.use("/home", HomeRouter);
app.use("/select", SelectRouter);



app.listen(PORT, () => console.log("Api Running :", PORT));
