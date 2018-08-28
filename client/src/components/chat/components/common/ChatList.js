import React, { Component } from "react";

import $ from "jquery";
var socket;
class ChatList extends Component {
  constructor(props) {
    super(props);

    socket = this.props.socket;
    socket.on(this.props.user.chatid, msg => {
      $("#" + this.props.user.chatid).append(
        $("<div class= bubble-r><li></div><br />").text(msg)
      );
    });
  }
  componentWillMount() {
    console.log(this.props.user);
  }
  render() {
    return (
      <ul id={this.props.user.chatid} className="float-right">
        <div />
      </ul>
    );
  }
}

export default ChatList;
