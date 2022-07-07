const express = require("express");

const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

//middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

const port = process.env.PORT || 3002;

//connect to DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(port, () => {
      console.log(`connected to DB & listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
