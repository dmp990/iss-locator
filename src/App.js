import "./App.css";
import Leaflet from "./components/Leaflet";

import { getLocation } from "./api/api";
import { useEffect, useState } from "react";

function App() {
  const [time, setTime] = useState(new Date());
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
    }, 2000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {}, []);

  return <Leaflet coordinates={coordinates} />;
}

export default App;
