// login, authentication, etc
const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');

// Load User model
const User = require('../../models/User');

// Body Parser Middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// @route           GET REQUEST api/users/test
// @description     TESTS USERS ROUTE
// @access          Public

router.get("/test", (req, res) => res.json({ msg: "Users Works" }));

// @route           GET REQUEST api/users/register
// @description     Register User
// @access          Public
router.post("/register", (req, res) => res.json({ 
    //searching for the email that the user is trying to register with
    //to use req.body we need to bring in Body Parser
    User.findOne({ email: req.body.email })
    msg: "New User Added"
});

module.exports = router;
