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
      textNotifications: false,
      number: null,
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

  onNumber = number => { 
    this.setState({
      number
    })
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

  toggleText = () => {
    this.setState({
      textNotifications: !this.state.textNotifications
    })
    console.log(this.state.textNotifications)
  }

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
            <h4>I would like to recive text notifications</h4>
            <input type="checkbox" onChange={e => this.toggleText(e)} />
            {this.state.textNotifications && (
              <input type='text' className='text-number' placeholder='No spaces of dashes. Dont worry, we encrypt these.' onChange={e => this.onNumber(e.target.value)} value={this.state.number} />
            )}
          </div>
          {/* <br /> */}
          <button
            className="sign-up-button"
            onClick={() =>
              this.props.submit(this.state.username, this.state.password, this.state.textNotifications, this.state.number)
            }
          >
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
