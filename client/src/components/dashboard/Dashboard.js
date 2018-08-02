import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../actions/profileActions";
import Spinner from "../common/Spinner";
import ProfileActions from "./ProfileActions";
import Experience from "./Experience";
import Education from "./Education";
import "../../../node_modules/fullcalendar-reactwrapper/dist/css/fullcalendar.min.css";

// import React...

import ReactDOM from "react-dom";

// ... and fullcalendar-reactwrapper.
import FullCalendar from "fullcalendar-reactwrapper";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [
        {
          title: "All Day Event",
          start: "2017-05-01"
        },
        {
          title: "Long Event",
          start: "2017-05-07",
          end: "2017-05-10"
        },
        {
          id: 999,
          title: "Repeating Event",
          start: "2017-05-09T16:00:00"
        },
        {
          id: 999,
          title: "Repeating Event",
          start: "2017-05-16T16:00:00"
        },
        {
          title: "Conference",
          start: "2017-05-11",
          end: "2017-05-13"
        },
        {
          title: "Meeting",
          start: "2017-05-12T10:30:00",
          end: "2017-05-12T12:30:00"
        },
        {
          title: "Birthday Party",
          start: "2018-08-01T07:00:00"
        },
        {
          title: "Click for Google",
          url: "http://google.com/",
          start: "2017-05-28"
        }
      ]
    };
  }
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  onDeleteClick(e) {
    this.props.deleteAccount();
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      // Check if logged in user has profile data
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <p className="lead text-muted">
              Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
            </p>
            <ProfileActions />
            <Experience experience={profile.experience} />
            <Education education={profile.education} />
            <div style={{ marginBottom: "60px" }} />
            <button
              onClick={this.onDeleteClick.bind(this)}
              className="btn btn-danger"
            >
              Delete My Account
            </button>
          </div>
        );
      } else {
        // User is logged in but has no profile
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <p>You have not yet setup a profile, please add some info</p>
            <Link to="/create-profile" className="btn btn-lg blueBG">
              Create Profile
            </Link>
          </div>
        );
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashboardContent}
              <div id="calendar" />
              <div id="example-component">
                <FullCalendar
                  id="your-custom-ID"
                  header={{
                    left: "prev,next today myCustomButton",
                    center: "title",
                    right: "month,basicWeek,basicDay"
                  }}
                  defaultDate={"2017-09-12"}
                  navLinks={true} // can click day/week names to navigate views
                  editable={true}
                  eventLimit={true} // allow "more" link when too many events
                  events={this.state.events}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount }
)(Dashboard);
