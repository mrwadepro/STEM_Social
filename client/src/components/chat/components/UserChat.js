import React from "react";
import PropTypes from "prop-types";
import "../../../Chat.css";
import UserCard from "./UserCard";

let activeChat = [];

class UserChat extends React.Component {
  constructor(props) {
    super(props);
    this.addChat = this.addChat.bind(this);
    this.state = {
      chats: []
    };
  }
  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }
  addChat(chat, index) {
    chat["serverindex"] = index;

    activeChat.push(chat);
    this.setState({
      chats: activeChat
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
                currentUser={this.props.currentUser}
                socket={this.props.socket}
                callback={this.addChat}
                index={i}
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
