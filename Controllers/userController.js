const User = require("../Models/userModel");
const mongoose = require("mongoose");
const express = require("express");
const jwt = require("jsonwebtoken");

// Register New User
const registerUser = async (req, res) => {
  const { username, password } = req.body;

  //add doc to db
  try {
    const user = await User.create({
      username,
      password,
    });
    res.status(200).json({ user });
  } catch (err) {
    res.status(400).json({ error: "Username taken" });
  }
};

// Login  User
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({
      username,
      password,
    });
    if (user) {
      const token = jwt.sign(
        {
          username,
          password,
        },
        "slaptasRaktas"
      );

      res.status(200).json({ user, status: "ok", user: token });
    } else {
      res.status(400).json({ error: error, status: "error", user: false });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//GetData
const getData = async (req, res) => {
  const { username, password } = req.body;

  const token = req.header["x-access-token"];

  //add doc to db
  try {
    const decoded = jwt.verify(token, "slaptasRaktas");
    const username = decoded.username;
    const user = await User.findOne({
      username,
    });
    return { status: "ok", user };
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getData,
};
