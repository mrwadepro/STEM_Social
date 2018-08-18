import React, { Component } from "react";
import PropTypes from "prop-types";

class UserList extends Component {
  render() {
    return (
      <div>
        {this.props.list.length !== 0 && (
          <ul className="list-group">
            {this.props.list.map((user, i) => {
              return (
                <li key={i} className="list-group-item">
                  <a onClick={() => this.props.callback(this.props.list[i])}>
                    {this.props.list[i].user}
                  </a>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    );
  }
}

UserList.propTypes = {
  list: PropTypes.array
};
export default UserList;
