import React, { Component } from "react";
import Item from "../Items/Item";
import StoreModal from "../StoreModal/StoreModal";
import LoadingModal from '../../Components/LoadingModal/LoadingModal'
import axios from "axios";

import "./Store.css";

import { getSession } from "../../ducks/sessionReducer";
import { connect } from "react-redux";
class Store extends Component {
  constructor() {
    super();
    this.state = {
      items: null,
      showCheckOutModal: false,
      modalType: null
    };
  }

  componentDidMount() {
    axios.get("/session").then(user => {
      this.props.getSession(user.data);

      axios.get("/store").then(items => {
        this.setState({
          items: items.data
        });
      });
    });
  }

  toggleModal = () => {
    this.setState({
      showCheckOutModal: !this.state.showCheckOutModal
    });
  };

  submit = () => {
    axios.get("/session").then(user => {
      //For updating belch_points on page after a purchase was made
      // I made getSession in redux to keep the front end user props in sync with the back end.
      this.props.getSession(user.data)
      this.setState({
        showCheckOutModal: false,
        modalType: null
      });
    });
  };

  taskDispatcher = task => {
    this.setState({
      showCheckOutModal: !this.state.showCheckOutModal,
      modalType: task
    });
  };
  render() {
    return this.state.items ? (
      <div className="store">
        <StoreModal
          type={this.state.modalType}
          show={this.state.showCheckOutModal}
          hideModal={this.submit}
        />
        <h1>
          Hey {this.props.user.username}! You have{" "}
          {this.props.user.belch_points} points.
        </h1>
        <div className="items" />
        {this.state.items.map(item => {
          return <Item item={item} task={this.taskDispatcher} />;
        })}
      </div>
    ) : (
      <LoadingModal url="https://quickfever.com/wp-content/uploads/2019/01/bird-gif.gif" />
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
)(Store);
