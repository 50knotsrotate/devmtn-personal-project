import React from "react";
import "./NavBar.css";
import { Link } from 'react-router-dom'
import hamburgerIcon from '../../assets/hamburger-icon.jpg'
import NavModal from '../NavModal/NavModal'
import { destroySession } from '../../ducks/sessionReducer';
import { connect } from 'react-redux';

export function NavBar(props) {
  return (
    <div className="nav-bar">
      <NavModal toggle={props.toggleModal} show={props.showModal} logout={props.destroySession} />
      <h1>Belch</h1>
      <div className="nav-items">
        <Link to = '/home'>Home</Link>
        <Link to='/notifications'><li>My activity</li></Link> 
        <Link to = '/profile'> <li>Profile</li> </Link>
        <Link to='/'><button className='logout' onClick={props.destroySession}>Logout</button></Link>
      </div>
      <img src={hamburgerIcon} className='hamburger-icon' alt='nav dropdown menu' onClick={props.toggleModal} />
    </div>
  );
}

const mapStateToProps = reduxState => {
  return {
    user: reduxState.session.user
  };
};

const mapDispatchToProps = {
  destroySession
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
