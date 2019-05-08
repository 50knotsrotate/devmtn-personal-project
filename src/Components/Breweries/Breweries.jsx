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
        .post("http://localhost:4940/test", { latitude, longitude })
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
          alert(err.request.response)
        });
    });
  }
  render() {
    return this.state.breweries ? (
      this.state.breweries.map((brew, i) => { //This is a perfect candidate for a stateless component.
        return (
          <Link to={`/breweries/${brew.id}`} key={i}>
            <BreweryTitle
              distance={brew.distance}
              description={brew.brewery.description}
              name={brew.brewery.name}
              address={brew.streetAddress}
              image={brew.brewery.images.squareMedium}
              coords={{ lat: brew.latitude, lng: brew.longitude }}
              id={brew.id}
            />
          </Link>
        );
      })
    ) : (
      <LoadingModal  />
    );
  }
}
