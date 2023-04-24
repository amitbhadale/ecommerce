const express = require("express");
const app = new express();
require("dotenv").config({ path: "backend/config/config.env" });
const cookieParser = require("cookie-parser");

//using middlewares
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

//Importing routes
const category = require("./routes/categoryRoutes");
const product = require("./routes/productRoutes");
const user = require("./routes/userRoutes");
const order = require("./routes/orderRoutes");

//using routes
app.use("/api/v1", category);
app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);

module.exports = app;
