import React, { Component } from "react";
import axios from "axios";
import NavBar from "../NavBar/NavBar";
import BreweryTitle from "../BreweryTitle/BreweryTitle";
import Map from "../Map/Map";
import { Link } from "react-router-dom";
import routes from "../Routes/homeRoutes";
import Stars from "../Stars/Stars";
import "./Home.css";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      breweries: [],
      location: null,
      show: true,
      showModal: false,
      showMap: false
    };
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
            ] //there was one piece of data that had a different setup... So I had to exterminate it.
          });
        })
        .catch(err => {
          console.log(err);
        });
    });
  }

  toggleShow = bool => {
    if (bool) {
      this.setState({
        show: true
      });
    } else {
      this.setState({
        show: false
      });
    }
  };

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
    const breweries = this.state.breweries.length
      ? this.state.breweries.map((brew, i) => {
          return (
            <Link
              onClick={() => this.toggleShow(false)}
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
      : null; // make a modal component

    return (
      <span>
        <NavBar
          backHome={this.toggleShow}
          user={this.props.user}
          logout={this.props.logout}
          showModal={this.state.showModal}
          toggleModal={this.showModal}
        />
        {this.state.show && this.state.location ? (
          <div className="logged-in-root">
            <button onClick={this.toggleMap}>Toggle Map</button>
            <div className="home-brewery-container">
              {this.state.location && (
                <span className={this.state.showMap ? null : "hide"}>
                  <Map
                    markers={this.state.breweries.map(brew => {
                      return {
                        backHome: this.toggleShow,
                        myLocation: this.state.location,
                        lat: brew.latitude,
                        lng: brew.longitude,
                        name: brew.brewery.name,
                        address: brew.streetAddress,
                        distance: brew.distance,
                        id: brew.id
                      };
                    })}
                    center={this.state.location}
                  />
                </span>
              )}
              <div className={!this.state.showMap ? "Home-breweries" : "hide"}>
                {breweries}
              </div>
            </div>
          </div>
        ) : (
          routes
        )}
      </span>
    );
  }
}
