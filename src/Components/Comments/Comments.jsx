import React from 'react';
import { Link } from 'react-router-dom';

export default function Comments(props) { 
  return (
      <div>
      {props.comments.map(comment => { 
        return(
          <h1>{comment.content}</h1>
        )
      }) }
      </div>
    );
}