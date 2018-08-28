const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");
var moment = require("moment");
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");
const events = require("./routes/api/events");

const app = express();

//Chat client part
let userList = [];
let activeChats = [];
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
    let duplicate = false;
    if (userList != 0) {
      for (var i = 0; i < userList.length; i++) {
        if (userList[i].id == user.id) {
          duplicate = true;
        }
      }
    }
    if (duplicate == false) {
      user["socket"] = socket.id;

      userList.push(user);
    }
    socket.emit("update user list", userList);
    socket.broadcast.emit("update user list", userList);
  });
  socket.on("createchat", (chatid, addedUser, initUser) => {
    socket.join(chatid);

    io.to(addedUser.socket).emit("joinroom", chatid, initUser);
  });

  socket.on("addtoroom", chatid => {
    socket.join(chatid);
    io.sockets.in(chatid).emit("createwindow");
  });
  socket.on("disconnect", () => {
    const newUsers = userList.filter(users => users.socket != socket.id);
    userList = newUsers;
    socket.emit("update user list", userList);
    socket.broadcast.emit("update user list", userList);
  });

  socket.on("message", (chatid, msg) => {
    console.log(chatid);
    io.sockets.in(chatid).emit(chatid, msg);
  });
});
