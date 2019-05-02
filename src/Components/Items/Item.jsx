import React from 'react';
import './Item.css';

export default function Item(props) { 
    return (
      <span className="item-container">
        <img src={props.item.image} alt = 'chuck norris' className="picture" />
            <div className='info'>
          <h1>{props.item.name}</h1>
          <h3>{props.item.description}</h3>
          <h3>Price: {props.item.price} belch points</h3>
            </div>
            <button className='purchase' onClick={() => props.task(props.item.handler)}>Buy this</button>
      </span>
    );
}