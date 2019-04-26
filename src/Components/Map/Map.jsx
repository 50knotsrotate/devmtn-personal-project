/* global google */
import React from 'react'
import GoogleMapReact from 'google-map-react'
import MapMarker from '../MapMarker/MapMarker'



export default function Map(props) {


    const center = {
        lat: props.center.latitude,
        lng: props.center.longitide
    }
  return (
    <div style={{ width: "600px", height: "600px" }}>
      {console.log(props)}
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyD7oSdpPi7cjxum-43AU_Kmkq8LQG8tASI" }}
        defaultCenter={props.center}
        defaultZoom={10}
      >
        {props.markers.map(marker => { 
          return (
            <MapMarker lat={marker.lat} lng={marker.lng} />
          )
        })}
      </GoogleMapReact>
    </div>
  ); 
 }