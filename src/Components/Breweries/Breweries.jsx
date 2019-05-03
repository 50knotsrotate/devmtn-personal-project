import React, { Component } from "react";
import BreweryTitle from "../BreweryTitle/BreweryTitle";
import axios from "axios";
import { Link } from 'react-router-dom'

export default class Breweries extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;

      this.setState({
        location: { lat: latitude, lng: longitude }
      });

      axios
        .post("/test", { latitude, longitude })
        .then(res => {
          this.setState({
            breweries: [
              ...res.data.data
                .filter(brew => brew.brewery)
                .filter(brew => brew.brewery.images)
            ]
          });
        })
        .catch(err => {
          console.log(err);
        });
    });
  }
  render() {
    return this.state.breweries ? (
      this.state.breweries.map((brew, i) => {
          return (
              <Link to={`/breweries/${brew.id}`}>
              <BreweryTitle
                distance={brew.distance}
                description={brew.brewery.description}
                name={brew.brewery.name}
                address={brew.streetAddress}
                key={i}
                image={brew.brewery.images.squareMedium}
                coords={{ lat: brew.latitude, lng: brew.longitude }}
                id={brew.id}
              />
            </Link>
          );
      })
    ) : (
      <h2>Loading LOADING AHHH</h2>
    );
  }
}
