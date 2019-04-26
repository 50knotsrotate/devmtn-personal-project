import React from 'react';
import markerImage from '../../assets/map-logo2.svg'

export default function Marker(props) { 
    return <div>
        <img style={{width: '50px', height: '50px'}} src={markerImage} alt = 'icon' />
    </div>
}