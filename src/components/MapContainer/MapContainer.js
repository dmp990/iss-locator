import React, { useMemo, useState, useEffect } from "react";

import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";

import API_KEY from "../../apiKey";

import { getLocation } from "../../api/api";

import icon from "../../assets/satellite.png";

const Leaflet = () => {
  const [coordinates, setCoordinates] = useState({ latitude: 0, longitude: 0 });

  useEffect(() => {
    const fetchObject = async () => {
      const obj = await getLocation();
      setCoordinates(() => {
        console.log(
          "Setting coordinates to: ( ",
          obj.latitude,
          ", ",
          obj.longitude,
          ")"
        );
        return { latitude: +obj.latitude, longitude: +obj.longitude };
      });
    };

    let interval = setInterval(() => {
      fetchObject();
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

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
        icon={{
          url: icon,
          scale: 0.05,
        }}
      />
    </GoogleMap>
  );
}

export default Leaflet;
