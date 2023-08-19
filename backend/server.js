"use strict";

var express = require("express"),
  app = express(),
  port = process.env.PORT || 5000,
  User = require("./models/userModel.js"),
  bodyParser = require("body-parser"),
  jsonwebtoken = require("jsonwebtoken");

var cors = require("cors");
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
const mongoose = require("mongoose");
// const option = {
//   socketTimeoutMS: 30000,
//   keepAlive: true,
//   reconnectTries: 30000,
// };

// const mongoURI = process.env.MONGODB_URI;
// mongoose.connect("mongodb://127.0.0.1:27017/ecommerce", option).then(
//   function () {
//     //connected successfully
//   },
//   function (err) {
//     //err handle
//   }
// );

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jsonwebtoken.verify(
      req.headers.authorization.split(" ")[1],
      "RESTFULAPIs",
      function (err, decode) {
        if (err) req.user = undefined;
        req.user = decode;
        next();
      }
    );
  } else {
    req.user = undefined;
    next();
  }
});
var routes = require("./route/userRoute.js");
routes(app);

app.use(function (req, res) {
  res.status(404).send({ url: req.originalUrl + " not found" });
});

// console.log(" RESTful API server started on: " + port);
mongoose
  .connect("mongodb://127.0.0.1:27017/ecommerce")
  .then(() => {
    console.log("Database connected!");
    app.listen(5000, () => {
      console.log("Server Started and listening to ${5000}");
    });
  })
  .catch((error) => {
    console.error(error);
  });
module.exports = app;
