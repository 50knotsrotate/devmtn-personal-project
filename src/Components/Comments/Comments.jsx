import React from 'react';
import Stars from '../Stars/Stars';
import beer from '../../assets/review.png'
 import '../Brewery/BreweryPage.css'
import './Comments.css' //you need to combine these into one css file

export default function Comments(props) { 
  return (
      <div>
      {props.comments.map((review, i) => { 
        return (
          <div className="comment-container" key={i}>
            <div className="comment-top">
              <div>
                <h4>{review.username}</h4>
                <Stars rating={review.rating}/>
              </div>
              <div className="upvote">
                {/* <button className = 'delete-comment' onClick={() => props.delete(review.id)}>X</button> will add this back in later */}
                <img
                  src={beer}
                  style={{ width: "20px", height: "20px" }}
                  alt="beer"
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