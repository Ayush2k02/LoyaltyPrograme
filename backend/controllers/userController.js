"use strict";

var mongoose = require("mongoose"),
  jwt = require("jsonwebtoken"),
  bcrypt = require("bcrypt"),
  User = mongoose.model("User");

exports.register = async function (req, res) {
  var newUser = await new User(req.body);
  newUser.hash_password = bcrypt.hashSync(req.body.password, 10);
  await newUser.save();
  res.send({ newUser });
};

exports.sign_in = async function (req, res) {
  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return res
      .status(400)
      .send(`Account with email ${req.body.email} does not exists`);

  const check = await user.comparePassword(req.body.password);
  if (!check) return res.status(400).send(`Please check your details`);

  const token = jwt.sign(
    {
      email: user.email,
      password: user.password,
    },
    "JWT_KEY"
  );
  // res.cookie(customerToken, token);
  return res.status(200).send({ success: true, token });
  // User.findOne(
  //   {
  //     email: req.body.email,
  //   },
  //   function (err, user) {
  //     if (err) throw err;
  //    if (!user || !user.comparePassword(req.body.password)) {
  //       return res.status(401).json({
  //         message: "Authentication failed. Invalid user or password.",
  //       });
  //     }
  //     return res.json({
  //       token: jwt.sign(
  //         { email: user.email, fullName: user.fullName, _id: user._id },
  //         "RESTFULAPIs"
  //       ),
  //     });
  //   }
  // );
};

exports.loginRequired = function (req, res, next) {
  if (req.user) {
    next();
  } else {
    return res.status(401).json({ message: "Unauthorized user!!" });
  }
};
exports.profile = function (req, res, next) {
  if (req.user) {
    res.send(req.user);
    next();
  } else {
    return res.status(401).json({ message: "Invalid token" });
  }
};
