import React, { Component } from "react";
import { CardElement, injectStripe } from "react-stripe-elements";
import "./CheckoutForm.css";
import LoadingModal from '../LoadingModal/LoadingModal'
import Axios from "axios";

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);

    this.state = {
      complete: false,
      loading: false
    };
  }

  async submit(ev) {
    let { token } = await this.props.stripe.createToken({ name: "Name" });
    this.setState({
      loading: true
    })
    Axios.post("/charge", { token }).then(res => {
      Axios.put("/user")
        .then(response => {
          this.setState({
            complete: true,
            loading: false
          });
          alert("Congrats! You are now a PREMIUM USER!");
        });
    });
  }

  render() {
    return (
      !this.state.loading ? (
      !this.state.complete && (
        <div className="checkout">
          <p> $99 for the year</p>
          <CardElement style={{ base: { fontSize: "30px" } }} />
          <button onClick={this.submit}>Send</button>
        </div>
      )
       ) :<LoadingModal url = 'https://media.giphy.com/media/tUkpDlOnK3nIk/giphy.gif' />
    );
  }
}

export default injectStripe(CheckoutForm);
