import React from "react";
import PropTypes from "prop-types";
import "../../../Chat.css";
import UserCard from "./UserCard";

let chatID = "";
class UserChat extends React.Component {
  componentDidMount() {
    this.props.socket.on("joinroom", (chatid, initUser) => {
      this.props.socket.emit("addtoroom", chatid);
      this.props.callback(initUser, chatid);
    });
  }
  render() {
    return (
      <div className="card-deck">
        {this.props.list[0] !== undefined &&
          this.props.list.map((user, i) => {
            return (
              <UserCard
                key={i}
                user={user}
                chatid={chatID}
                currentUser={this.props.currentUser}
                callback={this.props.callback}
                //This calls createWindow in ChatLayout

                socket={this.props.socket} //This is the logged in users socket
              />
            );
          })}
      </div>
    );
  }
}

UserChat.propTypes = {
  list: PropTypes.array
};

export default UserChat;
