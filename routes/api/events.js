const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

// Load Input Validation
const validateEventInput = require("../../validation/event");

// Load User model
const User = require("../../models/User");

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateEventInput(req.body);

    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }
    console.log(req.user.id);

    User.findOne({ _id: req.user.id })
      .then(event => {
        console.log(event);
        const newEvent = {
          title: req.body.title,
          start: req.body.start,
          end: req.body.end,
          allday: req.body.allday,
          color: req.body.color,
          textcolor: req.body.textcolor,
          user: req.user.id
        };

        // Add to comments array
        event.events.unshift(newEvent);

        // Save
        event.save().then(event => res.json(event));
      })
      .catch(err => console.log(err));
  }
);

module.exports = router;
