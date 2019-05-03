import React, { Component } from "react";
import BreweryTitle from "../BreweryTitle/BreweryTitle";
import axios from "axios";
import LoadingModal from '../LoadingModal/LoadingModal'
import { Link } from 'react-router-dom'


//Could I maybe do this in App and pass the data in?
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
      this.state.breweries.map((brew, i) => { //This is a perfect candidate for a stateless component.
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
      <LoadingModal url = 'https://static1.fjcdn.com/thumbnails/comments/Well+if+you+open+the+gif+with+a+white+background+_b8332784f0e4a278cf2e77c4766d9911.gif' />
    );
  }
}
