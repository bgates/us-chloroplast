import React, { useState } from "react";
import { pipe } from "fp-ts/lib/pipeable";
import * as A from "fp-ts/Array";
import * as O from "fp-ts/Option";
import * as R from "fp-ts/Record";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  GeoJSON,
  MapConsumer,
} from "react-leaflet";
import { geoJSON, Map as LeafletMap } from "leaflet";
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

const getColor = (max: number) => (n: number) =>
  n > 0.9 * max
    ? colors[8]
    : n > 0.5 * max
    ? colors[7]
    : n > 0.2 * max
    ? colors[6]
    : n > 0.1 * max
    ? colors[5]
    : n > 0.05 * max
    ? colors[4]
    : n > 0.02 * max
    ? colors[3]
    : n > 0.01 * max
    ? colors[2]
    : colors[1];

const max = (year: number) => (features: Array<GeoJSON.Feature>) =>
  pipe(
    features,
    A.map((feature) =>
      pipe(
        feature.properties?.census,
        R.lookup(String(year)),
        O.getOrElse(() => 0)
      )
    ),
    A.filter((n) => n > 0),
    (arr) => Math.max(...arr)
  );
function App() {
  const [date, setDate] = useState<number>(1790);

  const getStyle = (max: number) => (year: number) => (
    feature?: GeoJSON.Feature
  ) => ({
    fillColor: getColor(max)(feature?.properties?.census[year]),
    weight: 2,
    opacity: 1,
    color: "white",
    dashArray: "3",
    fillOpacity: 0.7,
  });
  const handleChange = (map: LeafletMap) => (year: number) => {
    setDate(year);
    const data = {
      ...statesData,
      features: statesData.features.filter(
        (feature) =>
          feature.properties.admitted && feature.properties.admitted <= year
      ),
    };
    map.eachLayer((layer) => {
      if (layer.getAttribution?.() === "US Census") {
        map.removeLayer(layer);
      }
    });
    const style = pipe(data.features, max(year), getStyle, (f) => f(year));
    geoJSON(data, { style, attribution: "US Census" }).addTo(map);
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
        <GeoJSON
          data={statesData}
          style={getStyle(691937)(1790)}
          attribution="US Census"
        />
        <MapConsumer>
          {(map) => (
            <div
              style={{
                padding: 10,
                position: "absolute",
                bottom: "-1vh",
                width: "90%",
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
