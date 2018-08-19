import React from "react";
import PropTypes from "prop-types";
import "../../../Chat.css";

import ChatField from "./common/ChatField";
import ChatList from "./common/ChatList";

class UserCard extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  render() {
    return (
      <div className="card" id="chatcard">
        <div className="card-body">
          <h5 className="card-title">{this.props.user.user}</h5>
          <div className="card-text">
            <ChatList user={this.props.user} />
          </div>
        </div>
        <div className="card-footer">
          <small className="text-muted">
            <form>
              <ChatField user={this.props.user} />
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
