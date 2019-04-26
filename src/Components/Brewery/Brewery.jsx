import React, { Component } from "react";
import axios from "axios";
import queryString from "query-string";
import "./BreweryPage.css";
import { appendFile } from "fs";

export default class Brewery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      reviews: null,
      content: ""
    };
  }

  componentDidMount() {
    const dataFromLink = queryString.parse(this.props.location.search);
    axios.get(`/breweryInfo?id=${this.props.match.params.id}`).then(res => {
      axios.get(`comments/${this.props.match.params.id}`).then(result => {
        this.setState({
          data: [...res.data.data, dataFromLink],
          reviews: result
        });
      });
    });
  }

  handleCommentInput = val => {
    this.setState({
      content: val
    });
  };

  submitComment = () => {
    this.setState({
      reviews: null
    });

    axios
      .post(`/comments/${this.props.location.search}`, {
        content: this.state.content,
        brewery_id: this.props.location.search
      })
      .then(res => {
        this.setState({
          reviews: res.data
        });
      });
  };

  render() {
    const beers = this.state.data ? (
      this.state.data.map(beer => {
        return (
          <div className="beer-container">
            <h1>{beer.name}</h1>
            <h1>{beer.abv}%</h1>
          </div>
        );
      })
    ) : (
      <h1>Looks like SOMEONE forgot to put BEERS in their data about BEERS.</h1>
    );

    const reviews = this.state.reviews ? (
      this.state.reviews.data.map(review => {
        return (
          <div className = 'reviews'>
            <h1>{review.username}</h1>
            <h1>{review.content}</h1>
          </div>
        );
      })
    ) : (
      <h1>Loading reviews</h1>
    );

    return (
      <div className="Brewery-info">
        {this.state.data && (
          <div className="broobroo">
            <h1>{this.state.data[this.state.data.length - 1].name}</h1>
            <h1>{this.state.data[this.state.data.length - 1].address}</h1>
            <h1 style={{ fontSize: "50px" }}>Beer Menu</h1>
            {beers}
          </div>
        )}
        {reviews}
        <input onChange={e => this.handleCommentInput(e.target.value)} />
        <button onClick={this.submitComment}>Submit comment</button>
      </div>
    );
  }
}
