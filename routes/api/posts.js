const express = require("express");
const router = express.Router();

// @route           GET REQUEST api/posts/test
// @description     TESTS POST ROUTE
// @access          Public

router.get("/test", (req, res) => res.json({ msg: "Posts Works" }));

module.exports = router;
