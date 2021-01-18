import React, { useState, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  GeoJSON,
  MapConsumer,
} from "react-leaflet";
import { geoJSON, GeoJSON as LeafletGeoJSON, Map as LeafletMap } from "leaflet";
import "./App.css";
import DateSlider from "./DateSlider";
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

function App() {
  const [date, setDate] = useState<number>(1790);

  const getStyle = (feature?: GeoJSON.Feature) => ({
    fillColor: getColor(feature?.properties?.density),
    weight: 2,
    opacity: 1,
    color: "white",
    dashArray: "3",
    fillOpacity: 0.7,
  });
  const handleChange = (map: LeafletMap) => (d: number) => {
    console.log({ d, map });
    setDate(d);
    const data = {
      ...statesData,
      features: statesData.features.filter(
        (feature) =>
          feature.properties.admitted && feature.properties.admitted <= d
      ),
    };
    map.eachLayer((layer) => {
      if (layer.getAttribution?.() === "US Census") {
        map.removeLayer(layer);
      }
    });
    geoJSON(data, { style: getStyle, attribution: "US Census" }).addTo(map);
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
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
        <GeoJSON data={statesData} style={getStyle} attribution="US Census" />
        <MapConsumer>
          {(map) => (
            <div
              style={{
                padding: 10,
                position: "absolute",
                bottom: "-10vh",
                width: "100%",
                background: "black",
              }}
              onMouseOver={() => map.dragging.disable()}
              onMouseOut={() => map.dragging.enable()}
            >
              <DateSlider
                min={1790}
                max={2010}
                value={date}
                onChange={handleChange(map)}
              />
            </div>
          )}
        </MapConsumer>
      </MapContainer>
    </div>
  );
}

export default App;
