import React, { useState, useContext } from "react";
import "../../styles/map.scss";
import GoogleMapReact from "google-map-react";
import mark from "../../img/marker_green.webp";

const Marker = () => (
  <div>
    <img src={mark}></img>
  </div>
);

export const MapVallas = () => {
  const location = {
    center: {
      lat: 9.982454420194236,
      lng: -84.15402350153538,
    },
    zoom: 15,
  };

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: "45vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "process.env.GOOGLE_API_KEY" }}
        defaultCenter={location.center}
        defaultZoom={location.zoom}
      >
        <Marker lat={location.center.lat} lng={location.center.lng} text="My Marker" />
      </GoogleMapReact>
    </div>
  );
};
