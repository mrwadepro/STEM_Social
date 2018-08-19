import React, { Component } from "react";
import io from "socket.io-client";
import classnames from "classnames";
import $ from "jquery";
var socket = io();
class ChatField extends Component {
  constructor() {
    super();
    this.state = {
      message: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  onEnterPress = e => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault();
      this.onSubmit(e);
    }
  };

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    socket.emit("privatemessage", this.props.user.socket, this.state.message);
    this.setState({ message: "" });
  }
  render() {
    return (
      <div className="form-group">
        <textarea
          className={classnames("form-control form-control-sm")}
          placeholder={this.props.user.user}
          value={this.state.message}
          onChange={this.onChange}
          name="message"
          onKeyDown={this.onEnterPress}
          autoComplete="off"
          type="submit"
        />
      </div>
    );
  }
}

export default ChatField;
