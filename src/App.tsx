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
import { geoJSON, GeoJSON as LeafletGeoJSON, Map as LeafletMap } from "leaflet";
import "./App.css";
import DateSlider from "./DateSlider";
import { statesData } from "./state-border-geojson";
import { Eq } from "fp-ts/lib/Eq";

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

const numericalRange = (year: number) => (features: Array<GeoJSON.Feature>) =>
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
    (arr) => [Math.min(...arr), Math.max(...arr)]
  );
function App() {
  const [date, setDate] = useState<number>(1790);

  const va = (statesData.features.find((f) => f.properties.name === "Virginia")
    ?.geometry.coordinates[2][0] as unknown) as Array<[number, number]>;
  const wva = statesData.features.find(
    (f) => f.properties.name === "West Virginia"
  )?.geometry.coordinates[0] as Array<[number, number]>;
  const eqLatLon: Eq<[number, number]> = {
    equals: (x: [number, number], y: [number, number]) =>
      x[0] === y[0] && x[1] === y[1],
  };
  console.log(
    statesData.features.find((f) => f.properties.name === "Virginia")?.geometry
      .coordinates
  );
  console.log(va);
  console.log(wva);
  const uniqva = A.uniq(eqLatLon)([...va, ...wva]);
  console.log(uniqva);
  const getStyle = (feature?: GeoJSON.Feature) => ({
    fillColor: getColor(feature?.properties?.density),
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
    pipe(data.features, numericalRange(year), console.log);
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
                bottom: "-1vh",
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
