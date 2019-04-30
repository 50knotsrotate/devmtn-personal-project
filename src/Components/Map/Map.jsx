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
    <div style={{ width: "400px", height: "400px" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyD7oSdpPi7cjxum-43AU_Kmkq8LQG8tASI" }}
        defaultCenter={props.center}
        defaultZoom={9.5}
      >
        {props.markers.map(marker => { 
          // console.log(marker)
          return (
            <MapMarker /*backHome = { props.backHome }*/ lat={marker.lat} lng={marker.lng} name={marker.name} address={marker.address} id={marker.id} distance={marker.distance} />
          )
        })}
      </GoogleMapReact>
    </div>
  ); 
 }