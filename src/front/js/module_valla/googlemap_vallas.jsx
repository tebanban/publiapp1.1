import React, { useState } from "react";
import "../../styles/map.scss";
import GoogleMapReact from "google-map-react";

import mark from "../../img/marker_green.webp";

const Marker = () => (
  <div>
    <img src={mark}></img>
  </div>
);

export const GoogleMapVallas = (props) => {
  const location = {
    center: {
      lat: props.lat,
      lng: props.lng,
    },
    zoom: 15,
  };

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: "50vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: import.meta.env.VITE_GOOGLE_API_KEY }}
        defaultCenter={{ lat: 9.9338, lng: -84.1014 }}
        center={location.center}
        defaultZoom={location.zoom}
      >
        <Marker lat={props.lat} lng={props.lng} text="My Marker" />
      </GoogleMapReact>
    </div>
  );
};
