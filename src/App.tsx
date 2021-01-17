import React from "react";
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from "react-leaflet";
import "./App.css";
import { statesData } from "./state-border-geojson";

const colors = [
  "#f7fbff",
  "#deebf7",
  "#c6dbef",
  "#9ecae1",
  "#6baed6",
  "#4292c6",
  "#2171b5",
  "#08519c",
  "#08306b",
]; // https://colorbrewer2.org/#type=sequential&scheme=Blues&n=9

const getColor = (n: number) =>
  n > 1000
    ? colors[8]
    : n > 500
    ? colors[7]
    : n > 200
    ? colors[6]
    : n > 100
    ? colors[5]
    : n > 50
    ? colors[4]
    : n > 20
    ? colors[3]
    : n > 10
    ? colors[2]
    : colors[1];

const getStyle = (feature?: GeoJSON.Feature) => ({
        fillColor: getColor(feature?.properties?.density),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
})

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <MapContainer center={[37.0, -96.5]} zoom={5} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[51.505, -0.09]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
          <GeoJSON data={statesData} style={getStyle} />
        </MapContainer>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
