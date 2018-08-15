import React, { Component } from "react";
import io from "socket.io-client";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getCurrentProfile } from "../../../actions/profileActions";
import { refreshUser } from "../../../actions/authActions";
import "../../../Chat.css";
import $ from "jquery";
const uuidv4 = require("uuid/v4");

var socket = io();
socket.heartbeatTimeout = 20000;
var userList = [];
class ChatLayout extends Component {
  constructor() {
    super();
    this.state = {
      message: "",
      user: [],
      users: []
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    socket.on("chat message", msg => {
      $("#messages").append($("<li>").text(msg));
      this.setState({ message: "" });
    });

    socket.on("update user list", userList => {
      this.setState({ users: userList });
      this.forceUpdate();
    });
  }

  componentDidMount() {
    this.props.getCurrentProfile();
    this.props.refreshUser();
    const { user } = this.props.auth;
    // socket.emit("ADDUSER", user.name);
    this.createUser(user.name, user.id);
  }

  onSubmit(e) {
    e.preventDefault();
    socket.emit("chat message", this.state.message);
  }

  createUser(name, id) {
    const userObj = {};
    userObj["user"] = name;
    userObj["userid"] = id;
    socket.emit("ADDUSER", userObj);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onEnterPress = e => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault();
      this.onSubmit(e);
    }
  };
  UserDisplay(users) {
    let Users;
    if (users.length !== 0) {
      Users = users.map((user, i) => {
        return (
          <a className="dropdown-item" key={i} href="">
            {user.user}
          </a>
        );
      });
    }
    return (
      <div className="dropdown-menu" id="users">
        <a className="dropdown-item" href="">
          Online Users
        </a>
        <div className="dropdown-divider" />
        {Users}
      </div>
    );
  }
  render() {
    return (
      <div className="chat navbar fixed-bottom">
        <div className="btn-group dropup">
          <button
            type="button"
            className="btn btn-secondary dropdown-toggle"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Chat
          </button>
          {this.UserDisplay(this.state.users)}
        </div>
        <ul id="messages">
          <div />
        </ul>
        <form onSubmit={this.onSubmit}>
          <textarea
            name="message"
            placeholder="Enter your message here"
            autoComplete="off"
            type="submit"
            onKeyDown={this.onEnterPress}
            value={this.state.message}
            onChange={this.onChange}
          />
          <input type="submit" className="btn btn-info btn-block mt-4" />
        </form>
      </div>
    );
  }
}

ChatLayout.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, refreshUser }
)(ChatLayout);
