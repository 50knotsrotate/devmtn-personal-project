import React, { Component } from "react";
import "./Brewery.css";

export default class Brewery extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

    render() {
        const shortenedDescription =this.props.description && ( this.props.description.split('').length > 250 ? this.props.description.slice(0,250) + '...' : this.props.description )
    return (
      <div className="brewery-container">
        <div className="container-left">
          <img
            src={this.props.image}
            alt="logo"
            className="brewery-title-image"
          />
        </div>
        <div className="container-right">
          <div className="top">
            <h3>{this.props.name}</h3>
            <h4>{this.props.distance} mi.</h4>
          </div>
          <div className="bottom">
                    <h5>{this.props.address}</h5>
                    <hr />
                    <br />
                    {shortenedDescription ? <h6>{shortenedDescription}</h6> : <h5>We dont need to put a description because that's not what we are about, because people dont come for the beer. They just dont come at all.</h5>}
          </div>
        </div>
      </div>
    );
  }
}
