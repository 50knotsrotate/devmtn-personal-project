import React from "react";
import "./Modal.css";

export default function Modal(props) {
  return (
    <div>
      {props.type ? ( //props.type because I am sharing this modal with another component
        <div className="map">
          <h2>{props.name}</h2>
          <h3>{props.distance} miles</h3>
          <h4>{props.address}</h4>
        </div>
      ) : (
        <div className="modal">
            <h1 style={{color: 'black'}}>{props.name}</h1>
          <h3>{props.text}</h3>
        </div>
      )}
    </div>
  );
}
