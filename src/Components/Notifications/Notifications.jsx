import React, { Component } from "react";
import Axios from "axios";
// import { Elements, StripeProvider } from "react-stripe-elements";
import { getSession } from "../../ducks/sessionReducer";
import { connect } from "react-redux";
// import CheckoutForm from "../CheckoutForm/CheckoutForm";
import Comments from "../Comments/Comments";
import "./Notifications.css";

class Notifications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications: null,
      myComments: [],
      showModal: false
    };
  }
  componentWillMount() {
    Axios.get("/notifications").then(res => {
      Axios.get("/session").then(session => {
        this.props.getSession(session.data);
        Axios.get(`/user/comments`).then(comments => {
          this.setState({
            notifications: res.data.filter(notif => notif.is_new),
            myComments: comments.data
            //need to make it so new comments are filtered out in willMount, not in unMount.
          });
        });
      });
    });
  }

  componentWillUnmount() {
    Axios.put("/notifications")
      .then(res => {
        //This takes all notifications that belong to the user which are NEW(unread), and puts them into OLD.
        //This way, notifications only show up in NEW when they have not been seen yet.
        // See server / controllers / notificationsController
        //This functionality is in the process of being taken away
      })
      .catch(err => {
        alert(err.request.response);
      });
  }

  delete = id => { 
    Axios.delete(`/comments/${id}`)
      .then(response => { 
        this.setState({
          myComments: response.data
        })
      }).catch(err => { 
        alert(err.request.reponse)
      })
  }

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
            {this.state.notifications && this.state.notifications.length ? (
              this.state.notifications.map((notif, i) => {
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
            <Comments comments={this.state.myComments} delete={this.delete} />
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
)(Notifications);
