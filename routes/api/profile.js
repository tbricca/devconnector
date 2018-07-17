// location, bio, experiences, education, social network links, etc
const express = require("express");
const router = express.Router();

router.get("/test", (req, res) => res.json({ msg: "Profile Works" }));

module.exports = router;
