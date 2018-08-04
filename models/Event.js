const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const EventSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
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

module.exports = Event = mongoose.model("event", EventSchema);
