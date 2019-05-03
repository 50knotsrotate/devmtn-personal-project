import React from 'react'

const style = {
    width: '100vw',
    height: '100vh'
}

export default function LoadingModal(props) { 
    console.log(props.url)
    return <img style={{ height: '70vh', width: '80vw' }} src={props.url ? props.url : 'https://i2.wp.com/media.boingboing.net/wp-content/uploads/2015/10/tumblr_nlohpxGdBi1tlivlxo1_12801.gif?zoom=2&w=970'} alt = 'loading'/>
}