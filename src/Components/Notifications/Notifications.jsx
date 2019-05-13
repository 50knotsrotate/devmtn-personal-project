import React, { Component } from "react";
import axios from "axios";
import Axios from '../../HOC/Axios';
import { getSession } from "../../ducks/sessionReducer";
import { connect } from "react-redux";
import Comments from "../Comments/Comments";
import "./Notifications.css";

class Notifications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      comments: null
    };
  }

  componentWillUnmount() {
    axios.put("/notifications")
      .then(res => {
        // TODO: just do this is component will mount.
      })
      .catch(err => {
        alert(err.request.response);
      });
  }

  delete = id => {
    axios.delete(`/comments/${id}`)
      .then(response => {
        this.setState({
          comments: response.data
        });
      })
      .catch(err => {
        alert(err.request.reponse);
      });
  };

  getNewNotifications = () => {
    this.setState({
      notifications: this.state.notifications.filter(notif => notif.is_new)
    });
  };
  render() {
    return (
      <div className="wrapper">
        <div className="notifications">
          <div className="notifs-container">
            <h1>NOTIFICATIONS</h1>
            {this.props.data[0] && this.props.data[0].length ? (
              this.props.data[0].map((notif, i) => {
                return (
                  <div className="notification" key={i}>
                    <h2>{notif.content}</h2>
                  </div>
                );
              })
            ) : (
              <h3>You have no new notifications</h3>
            )}
          </div>
          <div className="your-comments">
            <h1>YOUR COMMENTS</h1>
            <Comments comments={this.props.data[2] && this.props.data[2].length ? this.props.data[2] : []} delete={this.delete} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = redux => {
  return {
    user: redux.session.user
  };
};

const mapDispatchToProps = {
  getSession
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Axios(Notifications, ["/notifications", "/session", "/user/comments"]));
