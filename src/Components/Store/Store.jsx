import React, { Component } from "react";
import Item from "../Items/Item";
import axios from "axios";
import "./Store.css";

export default class Store extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      items: null
    };
  }

  componentDidMount() {
    axios.get("/checkSession").then(user => {
      axios.get("/store").then(items => {
        this.setState({
          user: user.data[0],
          items: items.data
        });
      });
    });
  }

    taskDispatcher = task => { 
        switch (task) { 
            case 'getChucked':
               return alert('get chucked')
            case 'yodaBomb':
               return alert('yodaBomb')
            default:
              return  alert('Something went wrong')
        }
       

        
    }
  render() {
    return this.state.user ? (
      <div className="store">
        <h1>
          Hey {this.state.user.username}! You have {this.state.user.belch_points} points.
        </h1>
        <div className="items" />
        {this.state.items.map(item => {
            return <Item
                item={item}
                task={this.taskDispatcher}
            />;
        })}
      </div>
    ) : (
      <h1>Loading your storeeeee</h1>
    );
  }
}
