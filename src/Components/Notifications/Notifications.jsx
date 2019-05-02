import React, { Component } from "react";
import Axios from "axios";
import { Elements, StripeProvider } from "react-stripe-elements";
import { getSession } from "../../ducks/sessionReducer";
import { connect } from "react-redux";
import CheckoutForm from "../CheckoutForm/CheckoutForm";
import "./Notifications.css";

class Notifications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications:null,
      myComments: null,
      showModal: false
    };
  }
  componentWillMount() {
    Axios.get("/notifications").then(res => {
      Axios.get("/session").then(session => {
        this.props.getSession(session.data);
        this.setState({
          notifications: res.data.filter(notif => notif.is_new)
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
      })
      .catch(err => {
        alert(err.request.response);
      });
  }

  toggleModal = () => {
    this.setState({
      showModal: !this.state.showModal
    });
  };

  getComments = () => {
    
  };

  getNewNotifications = () => {
    this.setState({
      notificationsCopy: this.state.notifications.filter(
        notif => notif.is_new
      )
    });
  };
  render() {
    return (
      <div>
        {!this.props.user.is_premium_user && (
          <div className="premium-notification">
            <h3>
              Note: Since you are not a premium user, you cannot claim your
              belch points. Don't worry - you can get them by{" "}
              <span className="pro-signup" onClick={this.toggleModal}>
                signing up for pro
              </span>
            </h3>
          </div>
        )}

        {this.state.showModal && (
          <StripeProvider apiKey="pk_test_fSKwetzBIOPjCUhTS1YnVoQ500UlcmHWzD">
            <Elements>
              <CheckoutForm />
            </Elements>
          </StripeProvider>
        )}
        <button onClick={this.getComments}>My Comments</button>
        <button onClick={this.getNewNotifications}>New</button>
        <div className="notifications">
          {this.state.notifications
            ? this.state.notifications.map(notif => {
                return (
                  <div className="notification">
                    <h2>{notif.content}</h2>
                  </div>
                );
              })
            : null}
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
