import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Home from '../Home/Home'

export default class SignIn extends Component {
  constructor() {
    super();

    this.state = {
      username: "",
      password: "",
      user: null
    };
  }

  handleUsernameInput(val) {
    this.setState({
      username: val
    });
  }

  handlePasswordInput(val) {
    this.setState({
      password: val
    });
  }



  render() {
    const form = (
      <div className="sign-up">
        <div className="sign-up-form">
          <h1>Sign into Belch</h1>
          <div className="form">
            <input
              type="text"
              placeholder="Choose username"
              className="input-field"
              onChange={e => this.handleUsernameInput(e.target.value)}
            />
            <br />
            <input
              type="text"
              onChange={e => this.handlePasswordInput(e.target.value)}
              placeholder="Password"
              className="input-field"
            />
            <br />
          </div>
          <br />
          <button onClick={() => this.props.signIn(this.state.username, this.state.password)} className="sign-up-button">
            Sign In
          </button>
          <h2 onClick={this.props.signUp}>Need to make an account?</h2>
        </div>
      </div>
    );

      return form
  }
}
