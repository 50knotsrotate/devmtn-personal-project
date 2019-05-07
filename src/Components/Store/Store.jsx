import React, { Component } from "react";
import Item from "../Items/Item";
import StoreModal from "../StoreModal/StoreModal";
import LoadingModal from "../../Components/LoadingModal/LoadingModal";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

import "./Store.css";

import { getSession } from "../../ducks/sessionReducer";
import { connect } from "react-redux";
class Store extends Component {
  constructor() {
    super();
    this.state = {
      items: null,
      showCheckOutModal: false,
      modalType: null,
      showPremiumModal: null
    };
  }

  componentDidMount() {
    axios.get("/session").then(user => {
      this.props.getSession(user.data);
      axios.get("/store").then(items => {
        this.setState({
          items: items.data,
          showPremiumModal: !this.props.user.is_premium_user
        });
      });
    });
  }

  toggleModal = () => {
    this.setState({
      showCheckOutModal: !this.state.showCheckOutModal
    });
  };

  togglePremiumModal = () => {
    this.setState({
      showModal: !this.state.showModal
    });
  };

  onToken = token => {
    axios
      .post("/charge", {
        stripeToken: token.id
      })
      .then(response => {
        this.setState({
          showPremiumModal: false,
          showModal: false
        });
        alert("You have subscribed to pro, go you!");
      })
      .catch(err => {
        alert("Oh no, something went wrong.");
      });
  };

  submit = () => {
    axios.get("/session").then(user => {
      //For updating belch_points on page after a purchase was made
      // I made getSession in redux to keep the front end user props in sync with the back end.
      this.props.getSession(user.data);
      this.setState({
        showCheckOutModal: false,
        modalType: null
      });
    });
  };

  taskDispatcher = task => {
    this.setState({
      showCheckOutModal: !this.state.showCheckOutModal,
      modalType: task
    });
  };
  render() {
    const { REACT_APP_STRIPE_KEY } = process.env;
    return this.state.items ? (
      <div className="store">
        {this.state.showPremiumModal && (
          <div className="premium-notification">
            <h5>
              Note: Since you are not a premium user, you cannot claim your
              belch points. Don't worry - you can get them by{" "}
              <span className="pro-signup" onClick={this.togglePremiumModal}>
                signing up for pro
              </span>
            </h5>
          </div>
        )}
        <StoreModal
          type={this.state.modalType}
          show={this.state.showCheckOutModal}
          hideModal={this.submit}
        />
        <h1>
          Hey {this.props.user.username}! You have{" "}
          {this.props.user.belch_points} points.
        </h1>
        <div className="items" />
        {this.state.items.map((item, i) => {
          return <Item item={item} key={i} task={this.taskDispatcher} />;
        })}
        {this.state.showModal && (
          <StripeCheckout
            token={this.onToken}
            stripeKey={REACT_APP_STRIPE_KEY}
          />
        )}
      </div>
    ) : (
      <LoadingModal url="https://quickfever.com/wp-content/uploads/2019/01/bird-gif.gif" />
    );
  }
}

const mapStateToProps = reduxState => {
  return {
    user: reduxState.session.user
  };
};

const mapDispatchToProps = {
  getSession
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Store);
