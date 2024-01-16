const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require('cors');


if (process.env.NODE_ENV !== "production") {
    require("dotenv").config({ path: ".env" });
  }
  
  const app = express();
  app.use(cors());


  app.use(express.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());


  const currency = require("./routes/currencyRouter");
  app.use("/api/v1", currency);


  module.exports = app;