import React from "react";
import "./NavBar.css";
import { Link } from 'react-router-dom'
import hamburgerIcon from '../../assets/hamburger-icon.jpg'
import NavModal from '../NavModal/NavModal'

export default function NavBar(props) {
  return (
    <div className="nav-bar">
      <NavModal toggle={props.toggle} show={props.showModal} />
      <h1> Belch </h1>
          <div className="nav-items">
              <li><a onClick={() => props.backHome(true)} href = '/#'>Home</a></li>
        <Link onClick={() => props.backHome(false)} to = '/notifications'><li><a href = '/#'>My activity</a></li></Link>
        <Link to = '/store' onClick={() => props.backHome(false)}> <li><a href = '/#'>Store</a></li> </Link>
        <button className = 'logout' onClick={props.logout}>Logout</button>
      </div>
      <img src={hamburgerIcon} className='hamburger-icon' alt='nav dropdown menu' onClick={props.toggleModal}/>
    </div>
  );
}
