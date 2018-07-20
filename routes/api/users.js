// login, authentication, etc
const express = require("express");
const router = express.Router();

// Load User model
const User = require('../../models/User');

// @route           GET REQUEST api/users/test
// @description     TESTS USERS ROUTE
// @access          Public

router.get("/test", (req, res) => res.json({ msg: "Users Works" }));

// @route           GET REQUEST api/users/register
// @description     Register User
// @access          Public
router.post("/register", (req, res) => res.json({ 
    
    msg: "New User Added"
});

module.exports = router;
