const express = require("express");

const {
  createCoffee,
  getAllCoffee,
  getCoffee,
  deleteCoffee,
  updateCoffee,
} = require("../Controllers/CoffeeController");

const router = express.Router();

//Get All Coffee
router.get("/", getAllCoffee);

//Get single Coffee
router.get("/:id", getCoffee);

//POST a new Coffee
router.post("/", createCoffee);

//DELETE a Coffee
router.delete("/:id", deleteCoffee);

//Update a Coffee
router.patch("/:id", updateCoffee);

module.exports = router;
