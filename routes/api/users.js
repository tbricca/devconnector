// login, authentication, etc
const express = require("express");
const router = express.Router();

// @route           GET REQUEST api/users/test
// @description     TESTS USERS ROUTE
// @access          Public

router.get("/test", (req, res) => res.json({ msg: "Users Works" }));

module.exports = router;
