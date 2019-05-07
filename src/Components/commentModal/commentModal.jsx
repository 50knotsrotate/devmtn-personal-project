import React, { Component } from "react";
import Stars from "../Stars/Stars";
import "./CommentModal.css";

export default class CommentModal extends Component {
  constructor() {
    super();

    this.state = {
      text: "",
      rating: null
    };
  }

  handleCommentInput = text => {
    this.setState({
      text
    });
  };

  onRate = rate => {
    console.log(rate);
    this.setState({
      rating: rate
    });
  };

  render() {
    return (
      <div className="comment-modal">
        <h1>Write a review.</h1>
        <Stars onRate={this.onRate} />
        <textarea
          className="comment-text"
          value={this.state.text}
          onChange={e => this.handleCommentInput(e.target.value)}
          placeholder="Be nice."
        />
        <button
          className="comment-submit"
          onClick={() => this.props.post(this.state.text, this.state.rating)}
        >
          Submit
        </button>
      </div>
    );
  }
}
