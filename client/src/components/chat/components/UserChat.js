import React from "react";
import PropTypes from "prop-types";
import "../../../Chat.css";
import UserCard from "./UserCard";

class UserChat extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  render() {
    return (
      <div className="card-deck">
        {this.props.list[0] !== undefined &&
          this.props.list.map((user, i) => {
            return <UserCard key={i} user={user} />;
          })}
      </div>
    );
  }
}

UserChat.propTypes = {
  list: PropTypes.array
};

export default UserChat;
