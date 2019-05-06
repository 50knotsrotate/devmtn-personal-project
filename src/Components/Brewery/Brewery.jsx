import React, { Component } from "react";
import axios from "axios";
import queryString from "query-string";
import "./BreweryPage.css";
import Modal from "../Modal/Modal";
import Stars from "../Stars/Stars";
import CommentModal from "../commentModal/commentModal";
import LoadingModal from "../LoadingModal/LoadingModal";
import beer from '../../assets/review.png'

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
      if (res.data.length < 3) {
        alert(
          "This API decided it does not want to give me data. Sorry folks."
        );
      } else {
        axios.get(`comments/${this.props.match.params.id}`).then(result => {
          this.setState({
            data: [...res.data.data, dataFromLink],
            reviews: result.data
          });
        });
      }
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
    });
  };

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

  onUpvote = (id, user_id, username) => { 
    axios
      .put(`/comments/${id}?brewery_id=${this.props.match.params.id}&user_id=${user_id}&username=${username}`)
      .then(comments => {
        const commentsCopy = [...this.state.reviews];
        const updatedCommentIndex = this.state.reviews.findIndex(
          comment => comment.id == id
        );
        commentsCopy[updatedCommentIndex] = comments.data[0];
        this.setState({
          reviews: commentsCopy
        });
      }).catch(error => { 
        alert(error.request.response)
      })
  }

  toggleCommentModal = () => {
    this.setState({
      showCommentModal: !this.state.showCommentModal
    });
  };

  submitComment = (text, rating) => {
    axios
      .post(`/comments/${this.props.match.params.id}`, {
        content: text,
        brewery_id: this.props.match.params.id,
        rating
      })
      .then(res => {
        this.setState({
          reviews: res.data,
          showCommentModal: false
        });
      });
  };

  render() {
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
            {this.state.showModal && i === this.state.currentModal ? (
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
              <div>
                <h4>{review.username}</h4>
                <Stars rating={review.rating} />
              </div>
              <div className='upvote'>
                <img src={beer} style={{ width: '20px', height: '20px' }} alt='beer' onClick={() => this.onUpvote(review.id, review.user_id, review.username)} />
                <h4>{review.upvotes}</h4>
                </div>
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
      <span className = 'brewery-wrapper'>
        <div className="Brewery-info" onClick={this.removeModal}>
          {this.state.data && (
            <div className="header">
              <h1>{this.state.data[this.state.data.length - 1].name}</h1>
              <h1>{this.state.data[this.state.data.length - 1].address}</h1>
              <h1 style={{ fontSize: "50px" }}>Beer Menu</h1>
            </div>
          )}

          {this.state.data ? (
            <div className="broobroo">{beers}</div>
          ) : (
            <LoadingModal />
          )}
        </div>
        {this.state.showReviews ? (
          <div className="comments">
            <button
              className="comment-button"
              onClick={this.toggleCommentModal}
            >
              + Write a review
            </button>
            {reviews}
            {this.state.showCommentModal && (
              <CommentModal
                post={this.submitComment}
                toggleModal={this.toggleCommentModal}
              />
            )}
          </div>
        ) : null}
      </span>
    );
  }
}
