import React, { Component } from "react";
import Star from "./Star";
import "./Star.css";

export default class Stars extends Component {
  constructor() {
    super();

    this.state = {
      num: 0,
      submitted: false,
      starCount: 6
    };
  }

  componentDidMount() {
    if (this.props.starCount) {
      this.setState({
        starCount: this.props.starCount + 1
      });
    }
  }

  hover = num => {
    if (!this.state.submitted) {
      this.setState({
        num
      });
    }
  };

  submitRating = num => {
    this.setState({
      submitted: !this.state.submitted
    });
    this.props.onRate(num);
  };

  render() {
    const stars = [];

    for (let i = 0; i < this.state.starCount-1; i++) {
      stars.push(
        <Star
          isLit={
            this.props.rating ? i <= this.props.rating : this.state.num >= i
          }
          hover={() => this.hover(i)}
          shouldReact={ this.props.rating + 1 ? 0 : 1}
          key={i}
          toggleSubmitted={this.submitRating}
          submit={
            this.props.onRate ? () => this.submitRating(this.state.num) : null
          }
        />
      );
    }

    return <div className="stars">{stars}</div>;
  }
}
