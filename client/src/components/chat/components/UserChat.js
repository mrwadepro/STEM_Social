import React from "react";
import PropTypes from "prop-types";
import "../../../Chat.css";

class UserChat extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  render() {
    const UserItem = ({ users }) => {
      users.map((user, i) => {
        console.log(user.user);
        return (
          <li key={i}>
            <div className="btn-group dropup">
              <button
                type="button"
                className="btn btn-secondary dropdown-toggle"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {user.user}
              </button>

              <div className="dropdown-menu" />
            </div>
          </li>
        );
      });
    };
    return (
      <ul>
        {this.props.list[0] !== undefined && (
          <li>
            <div className="btn-group dropup">
              <button
                type="button"
                className="btn btn-secondary dropdown-toggle"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {this.props.list[0].user}
              </button>

              <div className="dropdown-menu" />
            </div>
          </li>
        )}
      </ul>
    );
  }
}

UserChat.propTypes = {
  list: PropTypes.array
};

export default UserChat;
