import React, { Component } from "react";
import Breweries from '../Breweries/Breweries';
import './Homepage.css'

export default class Homepage extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
      return (
        <div className = 'homepages'>
              <div className='homepage-breweries-container'>
                  <h1>Breweries Near You</h1>
                  <div className='homepage-breweries'>
                      <Breweries />
                  </div>
              </div>
        </div>
      );
  }
}
