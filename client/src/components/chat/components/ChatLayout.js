import React, { Component } from "react";
import io from "socket.io-client";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getCurrentProfile } from "../../../actions/profileActions";
import { refreshUser } from "../../../actions/authActions";
import "../../../Chat.css";
import UserChat from "./UserChat";
import UserList from "./UserList";

let socket = io.connect();

socket.heartbeatTimeout = 20000;
let chatButton = true;
let userList = [];
class ChatLayout extends Component {
  constructor() {
    super();
    this.createChatWindow = this.createChatWindow.bind(this);
    this.state = {
      user: [],
      users: [],
      userList: []
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.props.getCurrentProfile();
    this.props.refreshUser();
    const { user } = this.props.auth;
    // socket.emit("ADDUSER", user.name);
    this.createUser(user.name, user.id, user.avatar);
  }

  createUser(name, id, avatar) {
    const userObj = {};
    userObj["name"] = name;
    userObj["id"] = id;
    userObj["avatar"] = avatar;

    socket.emit("ADDUSER", userObj);
  }

  handleClick(e) {
    chatButton = !chatButton;
    this.forceUpdate();
  }

  createChatWindow(user, chatid) {
    let duplicate = false;
    for (let i = 0; i < userList.length; i++)
      if (user.id === userList[i].id) {
        duplicate = true;
      }
    if (!duplicate) {
      user["chatid"] = chatid;
      userList.push(user);

      this.setState({ userList: userList });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  render() {
    const { user } = this.props.auth;

    socket.on("update user list", userList => {
      let filteredUser = userList.filter(users => users.id !== user.id);

      this.setState({ users: filteredUser });
      this.forceUpdate();
    });

    return (
      <div className="chat">
        <div className="fixed-bottom">
          <div className="row justify-content-start align-items-end">
            <div className="col-3">
              {chatButton && (
                <button
                  type="button"
                  id="chatbtn"
                  className="btn btn-light "
                  onClick={this.handleClick}
                >
                  chat
                </button>
              )}
              {chatButton === false && (
                <div className="card">
                  <button className="chatcollapse" onClick={this.handleClick}>
                    <div className="card-header" id="chatHeader">
                      Chat
                    </div>
                  </button>
                  <div className="card-body">
                    <UserList
                      list={this.state.users}
                      currentUser={user}
                      callback={this.createChatWindow}
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="col-9">
              <UserChat
                list={this.state.userList}
                currentUser={user}
                socket={socket}
                callback={this.createChatWindow}
              />
            </div>
          </div>
        </div>
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
