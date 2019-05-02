import React, { Component } from "react";
import Auth from "./Components/Auth/Auth";
import Home from "./Components/Home/Home";
import { getSession } from "./ducks/sessionReducer";
import { connect } from "react-redux";
import "./App.css";

class App extends Component {
  
  render() {
    return !!this.props.user ? (
      <Home user={this.props.user} />
    ) : (
      <Auth />
    );
  }
}

const mapStateToProps = reduxState => {
  return {
    user: reduxState.session.user
  };
};

const mapDispatchToProps = {
  getSession
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
