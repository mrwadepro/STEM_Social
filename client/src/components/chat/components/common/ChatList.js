import React, { Component } from "react";
import io from "socket.io-client";
import $ from "jquery";
var socket = io();
class ChatList extends Component {
  constructor() {
    super();
    this.state = {
      sent: [],
      received: []
    };
    socket.on("privatemessage", msg => {
      $("#messages").append($("<li>").text(msg));
      socket.emit("privateresponse", this.props.user.socket, msg);
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
