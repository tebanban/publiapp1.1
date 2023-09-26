import React, { useContext } from "react";
import "../../styles/map.scss";
import GoogleMapReact from "google-map-react";
import { Context } from "../store/appContext";
import mark from "../../img/marker_green.webp";
import { useEffect } from "react";

const Marker = () => (
  <div>
    <img src={mark}></img>
  </div>
);

export const GoogleMapVallas = () => {
  const { store } = useContext(Context);
  const { singleValla } = store;

  const location = {
    center: {
      lat: singleValla.lat || 9.9338,
      lng: singleValla.lng || -84.1014,
    },

    zoom: 15,
  };

  useEffect(() => {
    console.log("Google map render");
  }, [singleValla]);

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: "50vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: import.meta.env.VITE_GOOGLE_API_KEY }}
        defaultCenter={{ lat: 9.9338, lng: -84.1014 }}
        center={location.center}
        defaultZoom={location.zoom}
      >
        <Marker lat={singleValla.lat} lng={singleValla.lng} text="My Marker" />
      </GoogleMapReact>
    </div>
  );
};
