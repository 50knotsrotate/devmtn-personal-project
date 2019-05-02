import React, { Component } from "react";
import "./SignUp.css";
import { connect } from 'react-redux';
import { createSession } from '../../ducks/sessionReducer';
import axios from "axios";
import { Link } from "react-router-dom";

class SignUp extends Component {
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

  signUp = (username, password, textNotifications, number) => {
    //create a user object
    axios
      .post("/signup", { username, password, textNotifications, number })
      .then(user => {
        this.props.createSession(user.data); //inserts new user into DB, creates a session, and uses session for props
        
      })
      .catch(err => {
        this.props.history.goBack(); 
        this.errorHandler(err);
      });
  };

    errorHandler = err => {
    switch (err.request.response) {
      case "username_taken":
        return alert("That username is taken");
      case "Invalid Username":
        return alert("That is an invalid username");
      case "Invalid password":
        return alert("Invalid password");
      case "invalid phone":
        return alert("That phone number is invalid");
      default:
        return alert("An unknown error has occured. Sorry..");
    }
  };

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
    });
  };

  toggleText = () => {
    this.setState({
      textNotifications: !this.state.textNotifications
    });
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
            <h4>I would like to recive text notifications</h4>
            <input type="checkbox" onChange={e => this.toggleText(e)} />
            {this.state.textNotifications && (
              <input
                type="text"
                className="text-number"
                placeholder="No spaces of dashes. Dont worry, we encrypt these."
                onChange={e => this.onNumber(e.target.value)}
                value={this.state.number}
              />
            )}
          </div>
          <button
            className="sign-up-button"
            onClick={() =>
              this.signUp(
                this.state.username,
                this.state.password,
                this.state.textNotifications,
                this.state.number
              )
            }
          >
            <Link to="/home">Sign Up</Link>
          </button>
          <Link to="/">
            <h2>Already have an account?</h2>
          </Link>
        </div>
      </div>
    );

    return <div>{form}</div>;
  }
}

const mapStateToProps = reduxState => {
  return {
    user: reduxState.session.user
  };
};

const mapDispatchToProps = {
  createSession
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);


