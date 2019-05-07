import React, { Component } from "react";
import Axios from "axios";
import './StoreModal.css'

export default class StoreModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      number: ""
    };
    }
    
  componentWillMount = () => { 
    this.setState({
      number: ''
    })
  }

  chuck = number => {
      Axios.post("/chuck", {number, points: 10})
          .then(res => {
              alert('Success! Your victim is about to be very confused.')
              return this.props.hideModal()
      })
          .catch(err => {
              alert(err.request.response)
              return this.props.hideModal()
      });
  };

  numberHandler = number => {
    this.setState({
      number
    });
  };
  render() {
    const chuck = (
      <div>
        <input
          type="number"
          value={this.state.number}
          onChange={e => this.numberHandler(e.target.value)}
        />
        <button onClick={() => this.chuck(this.state.number)}>
          Lets do it!
        </button>
      </div>
      );

    return this.props.show ? (
      <div className="StoreModal">
        {chuck}
      </div>
    ) : null;
  }
}
