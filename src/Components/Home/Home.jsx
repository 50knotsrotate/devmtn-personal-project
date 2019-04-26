import React, { Component } from "react";
import axios from "axios";
import NavBar from "../NavBar/NavBar";
import BreweryTitle from "../BreweryTitle/BreweryTitle";
import Map from "../Map/Map";
import { Link } from "react-router-dom";
import routes from "../Routes/homeRoutes";
import "./Home.css";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      breweries: [],
      location: null,
      show: true
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      this.setState({
        location: { lat: latitude, lng: longitude }
      });
      axios.post("/test", { latitude, longitude }).then(res => {
        this.setState({
          breweries: [
            ...res.data.data
              .filter(brew => brew.brewery)
              .filter(brew => brew.brewery.images)
          ] //there was one piece of data that had a different setup... So I had to exterminate it.
        });
      }).catch(err => { 
        console.log(err)
      })
    });
  }

  toggleShow = () => {
    this.setState({
      show: !this.state.show
    });
  };

  render() {
    const breweries = this.state.breweries.length ? (
      this.state.breweries.map((brew, i) => {
        return (
          <Link
            onClick={this.toggleShow}
            to={`/breweries/${brew.id}?name=${brew.brewery.name}&address=${
              brew.streetAddress
            }`}
          >
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
      <h1>LOADING AHHHH WAIT</h1>
    ); // make a modal component

    return (
      <span>
        <NavBar
          backHome={this.toggleShow}
          user={this.props.user}
          logout={this.props.logout}
        />
        {this.state.show ? (
          <div className="logged-in-root">
            <h1 style={{ color: "white", textAlign: "center" }}>
              IN YOUR AREA!!!
            </h1>
            <div className="home-brewery-container">
              <div className="Home-breweries">{breweries}</div>
              {this.state.location && this.state.breweries.length ? (
                <Map
                  markers={this.state.breweries.map(brew => {
                    return {
                      lat: brew.latitude,
                      lng: brew.longitude
                    };
                  })}
                  center={this.state.location}
                />
              ) : null}
            </div>
          </div>
        ) : (
          routes
        )}
      </span>
    );
  }
}
