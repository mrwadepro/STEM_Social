import React from "react";
import PropTypes from "prop-types";
import "../../../Chat.css";

import ChatField from "./common/ChatField";
import ChatList from "./common/ChatList";

class UserCard extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.socket.emit(
      "handshake",
      this.props.currentUser,
      this.props.user,
      this.props.user.socket
    );
    this.props.socket.on("acceptshake", (chat, i) => {
      console.log("HAHAHA");
      this.props.callback(chat, i);
    });
  }

  render() {
    return (
      <div className="card" id="chatcard">
        <div className="card-body">
          <h5 className="card-title">{this.props.user.user}</h5>
          <div className="card-text">
            <ChatList
              user={this.props.user}
              socket={this.props.socket}
              currentUser={this.props.currentUser}
            />
          </div>
        </div>
        <div className="card-footer">
          <small className="text-muted">
            <form>
              <ChatField
                user={this.props.user}
                socket={this.props.socket}
                chatusers={this.props.index}
              />
            </form>
          </small>
        </div>
      </div>
    );
  }
}

UserCard.propTypes = {
  list: PropTypes.array
};

export default UserCard;
