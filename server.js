const express = require("express");

// initalize a variable called app to express
const app = express();

// route to get something up and running
app.get("/", (req, res) => res.send("Hello there"));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log("Server running on port ${port}"));
