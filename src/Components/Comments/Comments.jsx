import React from 'react';
import { Link } from 'react-router-dom';
import Stars from '../Stars/Stars';
import beer from '../../assets/review.png'
import '../Brewery/BreweryPage.css'

export default function Comments(props) { 
  return (
      <div>
      {props.comments.map(review => { 
        return (
          <div style={{width: '500px'}}className="reviews">
            <div className="comment-top">
              <div>
                <h4>{review.username}</h4>
                <Stars rating={review.rating} />
              </div>
              <div className="upvote">
                <img
                  src={beer}
                  style={{ width: "20px", height: "20px" }}
                  alt="beer"
                  onClick={() =>
                    this.onUpvote(review.id, review.user_id)
                  }
                />
                <h4>{review.upvotes}</h4>
              </div>
            </div>
            <hr />
            <h4>{review.content}</h4>
          </div>
        );
      }) }
      </div>
    );
}