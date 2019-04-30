import React, { Component } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import { Elements, StripeProvider } from "react-stripe-elements";
import CheckoutForm from "../CheckoutForm/CheckoutForm";
import "./Notifications.css";

export default class Notifications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications: null,
      notificationsCopy: null,
      isPremiumUser: true,
      showModal: false
    };
  }
  componentWillMount() {
    Axios.get("/getNotifications").then(res => {
      Axios.get("/checkSession").then(session => {
        this.setState({
          notifications: res.data,
          notificationsCopy: res.data.filter(notif => notif.is_new == "true"),
          isPremiumUser: session.data.is_premium_user == "true"
        });
      });
    });
    console.log(this.state.isPremiumUser);
  }

  componentWillUnmount() {
    Axios.put("/updateNotifications")
      .then(res => {})
      .catch(err => {
        alert(err.request.response);
      });
  }

  toggleModal = () => {
    this.setState({
      showModal: !this.state.showModal
    });
  };

  getOldNotifications = () => {
    this.setState({
      notificationsCopy: this.state.notifications.filter(
        notif => notif.is_new == "false"
      )
    });
  };

  getNewNotifications = () => {
    this.setState({
      notificationsCopy: this.state.notifications.filter(
        notif => notif.is_new == "true"
      )
    });
  };
  render() {
    return (
      <div>
        {!this.state.isPremiumUser && (
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
        <button onClick={this.getOldNotifications}>Old</button>
        <button onClick={this.getNewNotifications}>New</button>
        <div className="notifications">
          {this.state.notifications
            ? this.state.notificationsCopy.map(notif => {
                return (
                  <div className="notification">
                    <h1>{notif.content}</h1>
                  </div>
                );
              })
            : null}
        </div>
      </div>
    );
  }
}
