import React from 'react'

const style = {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,.5)'
}

export default function LoadingModal(props) { 
    return (
        <div style={style}>
            <img style={{width: '40vw', height: '40vh'}} src={props.url ? props.url : 'https://i2.wp.com/media.boingboing.net/wp-content/uploads/2015/10/tumblr_nlohpxGdBi1tlivlxo1_12801.gif?zoom=2&w=970'} alt = 'loading'/>
        </div>
    )
}