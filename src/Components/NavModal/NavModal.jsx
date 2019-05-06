import React from "react";
import { Link } from "react-router-dom";
import "./NavModal.css";

export default function NavModal(props) {
  return (
    <div onClick={props.toggle} className={props.show ? "show" : "hide"}>
      <h1>
        <Link to="/home">Home</Link>
      </h1>
      <h1>
        <Link to="/notifications">Notifications</Link>
      </h1>
      <h1>
        <Link to="/store">Store</Link>
      </h1>
    </div>
  );
}
