import React from "react";
import { Link } from 'react-router-dom'
import "./Modal.css";

export default function Modal(props) {
  return (
      <div>
      {props.type ? (
        <div className='map'>
          <h2>{props.name}</h2>
          <h3>{props.distance} miles</h3>
                  <h4>{props.address}</h4>
                  {/* <Link to={`/breweries/${props.id}?name=${props.name}&address=${props.address}`}><h3 onClick={props.backHome}>Go here!</h3></Link>  */}
        </div>
      ) : (
        <div className = 'modal'>
              <h1>{props.name}</h1>
          <h3>{props.text}</h3>
        </div>
      )}
    </div>
  );
}
