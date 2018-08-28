import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../../../actions/profileActions";
import classnames from "classnames";
let socket;
class ChatField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    socket = this.props.socket;
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

    socket.emit("message", this.props.user.chatid, this.state.message);

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
ChatField.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(ChatField);
