
import React from 'react'
import { Link } from 'react-router-dom';
import './NavModal.css'

export default function NavModal(props) { 
    return (
        <div className={props.show ? 'show' : 'hide'} >
        <h1>Home</h1>
        <h1>Notifications</h1>
        <h1>Store</h1>
     
        </div>

    )

}