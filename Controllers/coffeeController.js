const Coffee = require("../Models/coffeeModel");

const mongoose = require("mongoose");

// Get All Coffee
const getAllCoffee = async (req, res) => {
  const coffees = await Coffee.find({}).sort({ createdAt: -1 });

  res.status(200).json(coffees);
};

// Get Single Coffee
const getCoffee = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No Matching Coffee Found" });
  }

  const coffee = await Coffee.findById(id);

  if (!coffee) {
    return res.status(404).json({ error: "No Matching Coffee Found." });
  }

  res.status(200).json(coffee);
};

// Create New Coffee
const createCoffee = async (req, res) => {
  const { title, type, image, description } = req.body;

  //add doc to db
  try {
    const coffee = await Coffee.create({
      title,
      type,
      image,
      description,
    });
    res.status(200).json({ coffee });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
// Delete A Coffee
const deleteCoffee = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No Matching Coffee Found" });
  }

  const coffee = await Coffee.findOneAndDelete({ _id: id });

  if (!coffee) {
    return res.status(404).json({ error: "No Matching Coffee Found." });
  }

  res.status(200).json({ mssg: "coffee Deleted" });
};

// Update A Coffee
const updateCoffee = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No Matching Coffee Found" });
  }

  const coffee = await Coffee.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!coffee) {
    return res.status(404).json({ coffee });
  }

  res.status(200).json(coffee);
};

module.exports = {
  createCoffee,
  getAllCoffee,
  getCoffee,
  deleteCoffee,
  updateCoffee,
};
