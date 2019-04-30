import React, { Component } from "react";
import axios from "axios";
import queryString from "query-string";
import "./BreweryPage.css";
import Modal from "../Modal/Modal";
import Stars from '../Stars/Stars'
import CommentModal from '../commentModal/commentModal'

export default class Brewery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      reviews: null,
      content: "",
      showModal: false,
      currentModal: null,
      showCommentModal: false,
      showReviews: true
    };
  }

  componentDidMount() {
    const dataFromLink = queryString.parse(this.props.location.search);
    axios.get(`/breweryInfo?id=${this.props.match.params.id}`).then(res => {
      axios.get(`comments/${this.props.match.params.id}`).then(result => {
        this.setState({
          data: [...res.data.data, dataFromLink],
          reviews: result.data
        });
      });
    });

  }

  showDescription = (text, i) => {
    this.setState({
      showModal: true,
      currentModal: i
    });
  };

  toggleReviews = () => {
    this.setState({
      showReviews: !this.state.showReviews
    })
  }

  handleCommentInput = val => {
    this.setState({
      content: val
    });
  };

  removeModal = () => {
    if (this.state.showModal) {
      this.setState({
        showModal: false,
        currentModal: null
      });
    }
  };

  toggleCommentModal = () => { 
    this.setState({
      showCommentModal: !this.state.showCommentModal
    })
  }

  submitComment = (text, rating) => {
    this.toggleCommentModal() 
    axios
      .post(`/comments/${this.props.match.params.id}`, {
        content: text,
        brewery_id: this.props.match.params.id,
        rating
      })
      .then(res => {
        this.setState({
          reviews: [...this.state.reviews, res.data[0]]
        });
      });
  };

  render() {
    console.log(this.props.match.params.id);
    const beers = this.state.data ? (
      this.state.data.map((beer, i) => {
        return (
          <div
            className="beer-container"
            onClick={() =>
              this.showDescription(
                beer.style
                  ? beer.style.description
                  : "No description because this api is wildly inconsistent and annoying, even though I am paying for it",
                i
              )
            }
          >
            {this.state.showModal && i == this.state.currentModal ? (
              <Modal
                name={beer.name}
                text={
                  beer.style
                    ? beer.style.description
                    : "No description because this API is widly inconsistent"
                }
              />
            ) : null}
            <h3>{beer.name}</h3>
            <h3>{beer.abv}%</h3>
          </div>
        );
      })
    ) : (
      <h1>Looks like SOMEONE forgot to put BEERS in their data about BEERS.</h1>
    );

    const reviews = this.state.reviews ? (
      this.state.reviews.map(review => {
        return (
          <div className="reviews">
            <div className="comment-top">
            <Stars rating={review.rating} />
              <h4>{review.user_id}</h4>
            </div>
            <hr />
            <p>{review.content}</p>
          </div>
        );
      })
    ) : (
      <h1>Loading reviews</h1>
    );

    return (
      <span>
        <div className="Brewery-info" onClick={this.removeModal}>
          {this.state.data && (
            <div className="header">
              <h1>{this.state.data[this.state.data.length - 1].name}</h1>
              <h1>{this.state.data[this.state.data.length - 1].address}</h1>
              <h1 style={{ fontSize: "50px" }}>Beer Menu</h1>
            </div>
          )}

          {this.state.data && <div className="broobroo">{beers}</div>}
        </div>
        <div
          className={`toggle-reviews ${
            this.state.showReviews ? "review" : "info"
          }`}
          onClick={this.toggleReviews}
        >
          <h1>{this.state.showReviews ? "More-Info" : "Reviews"}</h1>
        </div>
        {this.state.showReviews ? (
          <div className="comments">
            {reviews}
            <button
              className="comment-button"
              onClick={this.toggleCommentModal}
            >
              Write a review
            </button>
            {this.state.showCommentModal && (
              <CommentModal
                post={this.submitComment}
                toggleModal={this.toggleCommentModal}
              />
            )}
          </div>
        ) : (
          <div className="business-info" />
        )}
      </span>
    );
  }
}
