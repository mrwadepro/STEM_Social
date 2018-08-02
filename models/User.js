const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  events: [
    {
      title: { type: String, required: true },
      start: { type: String, required: true },
      end: { type: String, required: true },
      allday: { type: Boolean },
      color: { type: String, required: true },
      textcolor: { type: String }
    }
  ]
});

module.exports = User = mongoose.model("users", UserSchema);
