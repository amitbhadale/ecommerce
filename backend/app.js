const express = require("express");
const app = new express();
require("dotenv").config({ path: "backend/config/config.env" });

//using middlewares
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

//Importing routes
const category = require("./routes/categoryRoutes");
const product = require("./routes/productRoutes");

//using routes
app.use("/api/v1", category);
app.use("/api/v1", product);

module.exports = app;
