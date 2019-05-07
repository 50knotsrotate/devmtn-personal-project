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

  signIn = () => {
    const { username, password} = this.state
    axios
      .post("/signin", {username, password})
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
          <div className="form">
          <h2>Sign into Belch</h2>
            <div>
              <h2>Username</h2>
              <input
                type="text"
                placeholder="Username"
                className="input-field"
                onChange={e => this.handleUsernameInput(e.target.value)}
                value={this.state.username}
              />
            </div>
            <div>
              <h2>Password</h2>
              <input
                type="password"
                onChange={e => this.handlePasswordInput(e.target.value)}
                placeholder="Password"
                className="input-field"
                value={this.state.password}
              />
            </div>
            <button onClick={this.signIn} className = 'sign-up-button'>
              <Link to="/home">Sign In</Link>
            </button>
            <Link to="/signUp">
              <h3 style={{color:'white', textDecoration: 'underline'}}>Need to make an account?</h3>
            </Link>
          </div>
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
