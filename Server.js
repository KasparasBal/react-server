const express = require("express");
const coffeeRoutes = require("./Routes/coffee");
const usersRoutes = require("./Routes/user");

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

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

const port = process.env.PORT || 4000;

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

//routes

app.use("/api/coffee", coffeeRoutes);
app.use("/api/users", usersRoutes);
