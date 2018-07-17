const express = require("express");
const mongoose = require("mongoose");

// initalize a variable called app to express
const app = express();

// DB CONFIG
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log("MongoDB has been Connected"))
  .catch(err => console.log(err));

// route to get something up and running
app.get("/", (req, res) => res.send("Hello there"));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log("Server running on port ${port}"));
