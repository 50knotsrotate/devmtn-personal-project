import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { createSession } from '../../ducks/sessionReducer';
import axios from 'axios';

class SignIn extends Component {
  constructor() {
    super();

    this.state = {
      username: "",
      password: "",
      user: null
    };
  }

  signIn = (username, password, textNotifications) => {
    axios
      .get("/signin", { username, password, textNotifications })
      .then(user => {
        this.props.createSession(user.data);
        // this.props.goBack()
      })
      .catch(err => {
        this.props.history.goBack()
        return alert(err.request.response);
      });
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

  render() {
    const form = (
      <div className="sign-up">
        <div className="sign-up-form">
          <h1>Sign into Belch</h1>
          <div className="form">
            <input
              type="text"
              placeholder="Username"
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
         <button onClick={this.signIn}><Link to = '/home'>Sign In</Link></button>
          <Link to="/signUp">
            <h2>Need to make an account?</h2>
          </Link>
        </div>
      </div>
    );

    return form;
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
)(SignIn);
