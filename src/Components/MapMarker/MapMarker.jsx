import React, { Component } from "react";
import markerImage from "../../assets/map-logo2.svg";
import Modal from "../Modal/Modal";

export default class Marker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false
    };
    }
    
    toggleModal = () => { 
        this.setState({
            showModal: !this.state.showModal
        })
    }

  render() {
    return (
        <div onClick={this.toggleModal}>
            {/* {console.log(this.props)} */}
            {this.state.showModal ? (
                <Modal  /*backHome = { this.props.backHome } */ type='map' name={this.props.name} address={this.props.address} id={this.props.id} distance={this.props.distance} />
            ): (
                 <img
          style={{ width: "40px", height: "40px" }}
          src={markerImage}
          alt="icon"
        />
            )}
      </div>
    );
  }
}
