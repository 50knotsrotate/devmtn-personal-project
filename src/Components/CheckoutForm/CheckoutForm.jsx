import React, { Component } from "react";
import { CardElement, injectStripe } from "react-stripe-elements";
import './CheckoutForm.css'
import Axios from "axios";

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
      this.submit = this.submit.bind(this);
      
      this.state = {
          complete: false
      }
  }

  async submit(ev) {
      let { token } = await this.props.stripe.createToken({ name: "Name" });
      Axios.post('/charge', {token})
          .then(res => { 
              Axios.put('/updateUser')
                  .then(response => { 
                      this.setState({
                          complete: true
                      })
                       alert(
                         "COngrats! You are now a PREMIUM USER. Whatever that means"
                       );

                  })
          })
    }
    

    render() {
        return (
          !this.state.complete && (
            <div className="checkout">
                    <p>Would you like to complete the purchase?</p>
                    <CardElement
                        style={{ base: {fontSize: '30px'}}}
                    />
              <button onClick={this.submit}>Send</button>
            </div>
          )
        );
  }
}

export default injectStripe(CheckoutForm);
