import React, { useMemo } from "react";

import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";

import API_KEY from "../../apiKey";

const iconPath = "../../public/satellite.png";

const Leaflet = ({ coordinates }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: API_KEY,
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map coordinates={coordinates} />;
};

function Map({ coordinates }) {
  const center = useMemo(() => ({ lat: 44, lng: -80 }), []);
  return (
    <GoogleMap
      zoom={5}
      center={{ lat: coordinates.latitude, lng: coordinates.longitude }}
      mapContainerClassName="map-container"
    >
      <MarkerF
        position={{ lat: coordinates.latitude, lng: coordinates.longitude }}
        title="ISS"
        icon={{ url: iconPath, scale: 7 }}
      />
    </GoogleMap>
  );
}

export default Leaflet;
