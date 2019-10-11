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
        this.props.history.push('/home');
        
      })
      .catch(err => {
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
          <div className="form">
            <h2 className="title" >Sign Up for Belch</h2>
            <div>
              {/* <h3>Username</h3> */}
              <input
                type="text"
                placeholder="Username"
                value={this.state.username}
                onChange={e => this.handleUsernameInput(e.target.value)}
                className="input-field"
              />
            </div>
            <div>
              {/* <h3>Password</h3> */}
              <input
                type="password"
                onChange={e => this.handlePasswordInput(e.target.value)}
                value={this.state.password}
                placeholder="Password"
                className="input-field"
              />
            </div>
            <div className="text-notifications">
            <h4>I would like to recive text notifications</h4>
            <input className="checkbox" type="checkbox" onChange={e => this.toggleText(e)} />
            {this.state.textNotifications && (
              <input
                type="text"
                className="text-number"
                placeholder="Please enter phone number. No spaces or dashes."
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
              <span>Sign Up</span>
              </button>
            <Link to="/">
              <h4 style={{color:'#FEFF33', textDecoration: 'underline'}} >Already have an account?</h4>
            </Link>
          </div>
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


