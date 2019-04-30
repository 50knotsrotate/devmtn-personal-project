import React, { Component } from "react";
import "./SignUp.css";
//import authRoutes from '../../Components/Routes/AuthRoutes'
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import Home from "../Home/Home";

export default class SignUp extends Component {
  constructor(props) {
    super(props);

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


  componentDidMount() {
    // console.log('ayy')
  }

  logout = () => {
    axios.get("/logout").then(res => { 
      this.setState({
        user: null
      })
    })
  };

  render() {
    const form = (
      <div className="sign-up">
        <div className="sign-up-form">
          <h1>Belch</h1>
          <div className="form">
            <input
              type="text"
              value={this.state.username}
              onChange={e => this.handleUsernameInput(e.target.value)}
              placeholder="Choose username"
              className="input-field"
            />
            <br />
            <input
              type="text"
              onChange={e => this.handlePasswordInput(e.target.value)}
              value={this.state.password}
              placeholder="Password"
              className="input-field"
            />
            <br />
          </div>
          <br />
          <button className="sign-up-button" onClick={() => this.props.submit(this.state.username, this.state.password)}>
            Sign Up
          </button>
          <h2 onClick={this.props.signIn}>Already have an account?</h2>
        </div>
      </div>
    );

    return (
      <div>
        {form}
      </div>
    );
  }
}
