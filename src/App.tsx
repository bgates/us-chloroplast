import React, { useEffect, useState } from "react";
import { pipe } from "fp-ts/lib/pipeable";
import * as A from "fp-ts/Array";
import { ap } from "fp-ts/lib/Identity";
import * as O from "fp-ts/Option";
import * as R from "fp-ts/Record";
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from "react-leaflet";
import { geoJSON, Map as LeafletMap } from "leaflet";
import "./App.css";
import DateSlider from "./DateSlider";
import { statesData } from "./state-border-geojson";
import { constVoid } from "fp-ts/lib/function";

type Population = "whole" | "free" | "enslaved";
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

const populationInYear = (census: Record<string, number>, year: number) =>
  pipe(
    census,
    R.lookup(String(year)),
    O.chain(O.fromNullable),
    O.getOrElse(() => 0)
  );
const valueOfInterest = (feature: GeoJSON.Feature) => (
  population: Population
) => (year: number) =>
  population === "whole"
    ? populationInYear(feature.properties?.census, year)
    : population === "enslaved"
    ? populationInYear(feature.properties?.enslavedCensus, year)
    : pipe(populationInYear(feature.properties?.census, year), (whole) =>
        pipe(
          populationInYear(feature.properties?.enslavedCensus, year),
          (enslaved) => whole - enslaved
        )
      );

const max = (population: Population) => (year: number) => (
  features: Array<GeoJSON.Feature>
) =>
  pipe(
    features,
    A.map((feature) =>
      pipe(valueOfInterest, ap(feature), ap(population), ap(year))
    ),
    (arr) => Math.max(...arr)
  );
function App() {
  const [map, setMap] = useState<LeafletMap>();
  const [date, setDate] = useState<number>(1790);
  const [population, setPopulation] = useState<Population>("whole");

  const getStyle = (max: number) => (year: number) => (
    feature?: GeoJSON.Feature
  ) =>
    feature
      ? {
          fillColor: getColor(max)(
            pipe(valueOfInterest, ap(feature), ap(population), ap(year))
          ),
          weight: 2,
          opacity: 1,
          color: "white",
          dashArray: "3",
          fillOpacity: 0.7,
        }
      : {};
  const handleChange = (map: LeafletMap) => (year: number) => {
    if (year === 1870 && date === 1860 && population === "enslaved") {
      setDate(year);
      setPopulation("whole");
    } else {
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
      const style = pipe(
        data.features,
        pipe(max, ap(population), ap(year)),
        getStyle,
        ap(year)
      );
      geoJSON(data, { style, attribution: "US Census" }).addTo(map);
    }
  };

  useEffect(
    () =>
      pipe(
        map,
        O.fromNullable,
        O.fold(constVoid, (map) => handleChange(map)(date))
      ),
    [population]
  );
  const initialData = {
    ...statesData,
    features: statesData.features.filter(
      (f) => f.properties.admitted && f.properties.admitted <= 1790
    ),
  };
  return (
    <div className="App">
      <header className="App-header">
        <p>Use the slider at the bottom of the map to see changes over time</p>
      </header>
      <MapContainer
        center={[37.0, -96.5]}
        zoom={5}
        scrollWheelZoom={false}
        whenCreated={setMap}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <GeoJSON
          data={initialData}
          style={getStyle(691937)(1790)}
          attribution="US Census"
        />
        {pipe(
          map,
          O.fromNullable,
          O.fold(
            () => null,
            (map) => (
              <>
                <div
                  style={{
                    padding: "10px 30px",
                    position: "absolute",
                    bottom: "0",
                    width: "70%",
                    zIndex: 1000,
                    background: "#ccc",
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
                <div
                  style={{
                    position: "absolute",
                    bottom: "10vh",
                    right: 16,
                    background: "#ccc",
                    zIndex: 1000,
                  }}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPopulation(e.target.value as Population)
                  }
                >
                  <label>
                    Whole population
                    <input
                      type="radio"
                      name="population"
                      value="whole"
                      defaultChecked
                    />
                  </label>
                  {date < 1870 ? (
                    <>
                      <label>
                        Free population
                        <input type="radio" name="population" value="free" />
                      </label>
                      <label>
                        Enslaved population
                        <input
                          type="radio"
                          name="population"
                          value="enslaved"
                        />
                      </label>
                    </>
                  ) : null}
                  {population}
                </div>
              </>
            )
          )
        )}
      </MapContainer>
    </div>
  );
}

export default App;
