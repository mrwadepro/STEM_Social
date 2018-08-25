import React, { Component } from "react";

import $ from "jquery";
var socket;
class ChatList extends Component {
  constructor(props) {
    super(props);

    socket = this.props.socket;
    socket.on("privatemessage", (msg, activeChat) => {
      if (
        this.props.currentUser.id ===
        activeChat.messages[activeChat.messages.length - 1].sender.id
      ) {
        $("#messages").append(
          $("<div class=bubble-r><li></div><br />").text(msg)
        );
      } else {
        $("#messages").append(
          $("<div class=bubble><li></div> <br />").text(msg)
        );
      }
    });
  }

  render() {
    return (
      <ul id="messages">
        <div />
      </ul>
    );
  }
}

export default ChatList;
