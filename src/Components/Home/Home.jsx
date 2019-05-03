import React, { Component } from "react";
import NavBar from "../NavBar/NavBar";
import routes from "../Routes/homeRoutes";
import "./Home.css";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      showMap: false
    };
  }

  //could I maybe put these function inside of the components I'm passing the functions to?
  //Could I just put all of this in App.js and get rid of Home all together?
  toggleMap = () => {
    this.setState({
      showMap: !this.state.showMap
    });
  };

  showModal = () => {
    this.setState({
      showModal: !this.state.showModal
    });
  };

  render() {
    return (
      <span>
        <NavBar
          backHome={this.toggleShow}
          user={this.props.user}
          showModal={this.state.showModal}
          toggleModal={this.showModal}
        />
        {routes}
      </span>
    );
  }
}
