import React from "react";
import "./NavBar.css";

export default function NavBar(props) {
  return (
    <div className="nav-bar">
      <h1> Hello {props.user.username}!</h1>
          <div className="nav-items">
              <li><a onClick={props.backHome} href = '/#'>Home</a></li>
              <li><a href = '/#'>My activity</a></li>
              <li><a href = '/#'>Store</a></li>
        <button onClick={props.logout}>Logout</button>
      </div>
    </div>
  );
}
