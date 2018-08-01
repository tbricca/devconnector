// login, authentication, etc
const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

// Load Input Validation
const validateRegisterInput = require("../../validation/register");

// Load User model
const User = require("../../models/User");

// @route           GET REQUEST api/users/test
// @description     TESTS USERS ROUTE
// @access          Public

router.get("/test", (req, res) => res.json({ msg: "Users Works" }));

// @route           GET REQUEST api/users/register
// @description     Register User
// @access          Public

router.post("/register", (req, res) => {
  // req.body includes everything that is sent thhrough this route (email, password, etc.)
  const { errors, isValid } = validateRegisterInput(req.body);

  //Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  //searching for the email that the user is trying to register with
  //to use req.body we need to bring in Body Parser
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", // Size
        r: "pg", // Rating
        d: "mm" // Default
      });

      // when creating a resource w/ mongoose you want to say new andd then the model name and then pass in the data as an object
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
  msg: "New User Added";
});

// @route           GET REQUEST api/users/login
// @description     Login User / Returning Json Web Token (JWT)
// @access          Public

router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // Find User by Email
  User.findOne({ email }).then(user => {
    // Check for user
    if (!user) {
      return res
        .status(404)
        .json({ email: "User not found, go look somewhere else" });
    }

    // Check Passowrd
    // brcypt to compare the hashed password to the proper one
    // pass in the plain text password (password) and then the hashed password (user.password)
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // USer Matched - using json web token

        const payload = { id: user.id, name: user.name, avatar: user.avatar }; // Create JWT Payload

        // Sign Token

        jwt.sign(
          payload,
          keys.secretorKey,
          { expiresIn: 3600 }, //Have it expire after an hour for security
          (err, token) => {
            res.json({
              sucess: true,
              //bearer token
              token: "Bearer" + token
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ password: "Password incorrect, leave please" });
      }
    });
  });
});

module.exports = router;
