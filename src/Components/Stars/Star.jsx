import React from "react";
import './Star.css'

export default function Star(props) {
  return (
    <div
      className={props.isLit ? "star" : "nostar"}
      onMouseOver={props.hover}
      onClick={props.submit}
    />
  );
}
