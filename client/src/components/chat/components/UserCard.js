import React from "react";
import PropTypes from "prop-types";
import "../../../Chat.css";
import $ from "jquery";
import io from "socket.io-client";
var socket = io();
class UserCard extends React.Component {
  constructor() {
    super();
    this.state = {
      message: "",
      received: ""
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
    $("#messages").append($("<li>").text(this.state.message));
    this.setState({ message: "" });
  }

  render() {
    return (
      <div className="card" id="chatcard">
        <div className="card-body">
          <h5 className="card-title">{this.props.user.user}</h5>
          <div className="card-text">
            <ul id="messages">
              <div />
            </ul>
          </div>
        </div>
        <div className="card-footer">
          <small className="text-muted">
            <form>
              <textarea
                name="message"
                placeholder="Enter your message here"
                autoComplete="off"
                type="submit"
                onKeyDown={this.onEnterPress}
                value={this.state.message}
                onChange={this.onChange}
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
