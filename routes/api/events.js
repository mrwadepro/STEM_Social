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
const Event = require("../../models/Event");
var moment = require("moment");
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

    const newEvent = new Event({
      user: req.user.id,
      events: [
        {
          title: req.body.title,
          start: moment.utc(req.body.start),
          end: moment.utc(req.body.end),
          allday: req.body.allday,
          color: req.body.color,
          textcolor: req.body.textcolor
        }
      ]
    });
    newEvent.save().then(event => res.json(event));
  }
);
// @route   GET api/events/userevents
// @desc    Get current users events
// @access  Private
router.get(
  "/userevents",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Event.find({ user: req.user.id })
      .populate("events")
      .then(events => {
        if (!events) {
          errors.noevents = "There is no events for this user";
          return res.status(404).json(errors);
        }
        res.json(events);
      })
      .catch(err => {
        res.status(404).json(err);
      });
  }
);

module.exports = router;
