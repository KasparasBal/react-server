const express = require("express");

const {
  registerUser,
  loginUser,
  getData,
} = require("../Controllers/UserController");

const router = express.Router();

//login user
router.post("/login", loginUser);

//getData
router.get("/coffee", getData);

//register a new User
router.post("/register", registerUser);

module.exports = router;
