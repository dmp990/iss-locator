import "./App.css";
import BottomTab from "./components/BottomTab/BottomTab";
import MapContainer from "./components/MapContainer/MapContainer";

function App() {
  return (
    <section className="map-box">
      <MapContainer />
      <BottomTab />
    </section>
  );
}

export default App;
