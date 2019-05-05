import React from "react";
import review from '../../../src/assets/review.png'
import './Star.css'

export default function Star(props) {
  return (
    props.isLit ? (
      <img src={review} className='star' alt='beer' onMouseOver={props.hover} onClick={props.submit} />
    ) : (  <div
      className={"nostar"}
      onMouseOver={props.hover}
      onClick={props.submit}
    />)
  );
}
