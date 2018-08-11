const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");
const events = require("./routes/api/events");

const app = express();

//Chat client part
let userList = [];
const port = process.env.PORT || 5000;
var server = app.listen(port, () =>
  console.log(`Server running on port ${port}`)
);
var io = (module.exports.io = require("socket.io").listen(server));

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require("./config/passport")(passport);

//Socket for chat client

// Use Routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);
app.use("/api/events", events);

// Server static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

//Chat socket actions
io.on("connection", function(socket) {
  socket.on("ADDUSER", function(user) {
    userList.push(user);
    console.log(userList);
    io.emit("ADD_USER_TO_LIST", userList);
  });
  socket.on("chat message", function(msg) {
    io.emit("chat message", msg);
  });
});
