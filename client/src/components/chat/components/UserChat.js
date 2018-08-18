import React from "react";
import PropTypes from "prop-types";
import "../../../Chat.css";

class UserChat extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  render() {
    return (
      <ul>
        {this.props.list[0] !== undefined &&
          this.props.list.map((user, i) => {
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
                    {this.props.list[i].user}
                  </button>
                  <div className="dropdown-menu" />
                </div>
              </li>
            );
          })}
      </ul>
    );
  }
}

UserChat.propTypes = {
  list: PropTypes.array
};

export default UserChat;
