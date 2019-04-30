import React, { Component } from "react";
import logo from "./logo.svg";
import SignUp from "./Components/SignUp/SignUp";
import SignIn from "./Components/SignIn/SignIn";
import Home from "./Components/Home/Home";
import axios from "axios";
import "./App.css";

class App extends Component {
  constructor() {
    super();

    this.state = {
      hasActiveSession: false,
      signingUp: true
    };
  }

  componentDidMount() {
    this.checkSession();
  }

  signIn = (username, password, textNotifications) => {
    axios
      .post("/signin", { username, password, textNotifications })
      .then(res => {
        this.setState({
          hasActiveSession: res.data
        });
      })
      .catch(err => {
        return alert(err.request.response);
      });
  };

  submit = (username, password, textNotifications, number) => {
    axios
      .post("/signup", { username, password, textNotifications, number })
      .then(res => {
        if (res.data) {
          this.setState({
            hasActiveSession: res.data
          });
        }
      })

      .catch(error => {
        switch (error.request.response) {
          case "username_taken":
            return alert("That username is taken");
          case "Invalid Username":
            return alert('That is an invalid username');
          case "Invalid password":
            return alert('Invalid password');
          case ('invalid phone'):
            return alert('That phone number is invalid')
          default:
            return alert("An unknown error has occured. Sorry..");
        }
      });
  };

  checkSession = () => {
    axios.get("/checkSession").then(res => {
      if (res.data) {
        this.setState({
          hasActiveSession: res.data
        });
      }
    });
  };

  handleChange = () => {
    this.setState({
      signingUp: !this.state.signingUp
    });
  };
  logout = () => {
    axios.get("/logout").then(res => {
      this.setState({
        hasActiveSession: false
      });
    });
  };

  render() {
    return this.state.hasActiveSession ? (
      <Home user={this.state.hasActiveSession} logout={this.logout} />
    ) : this.state.signingUp ? (
      <SignUp submit={this.submit} signIn={this.handleChange} />
    ) : (
      <SignIn signIn={this.signIn} signUp={this.handleChange} />
    );
  }
}

export default App;
