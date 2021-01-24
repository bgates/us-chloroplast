import React, { useEffect, useState } from "react";
import { pipe } from "fp-ts/lib/pipeable";
import * as A from "fp-ts/Array";
import { constVoid } from "fp-ts/lib/function";
import { ap } from "fp-ts/lib/Identity";
import * as O from "fp-ts/Option";
import * as R from "fp-ts/Record";
import {
  GeoJSON as LeafletGeoJSON,
  geoJSON,
  Layer,
  LeafletMouseEvent,
  Map as LeafletMap,
} from "leaflet";
import { MapContainer, TileLayer, GeoJSON, LayersControl } from "react-leaflet";
import tw, { styled } from "twin.macro";
import "./App.css";
import DateSlider from "./DateSlider";
import { statesData } from "./state-border-geojson";

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
const valueOfInterest = (properties: GeoJSON.GeoJsonProperties) => (
  population: Population
) => (year: number) =>
  population === "whole"
    ? populationInYear(properties?.census, year)
    : population === "enslaved"
    ? populationInYear(properties?.enslavedCensus, year)
    : pipe(populationInYear(properties?.census, year), (whole) =>
        pipe(
          populationInYear(properties?.enslavedCensus, year),
          (enslaved) => whole - enslaved
        )
      );

const max = (population: Population) => (year: number) => (
  features: Array<GeoJSON.Feature>
) =>
  pipe(
    features,
    A.map((feature) =>
      pipe(valueOfInterest, ap(feature.properties), ap(population), ap(year))
    ),
    (arr) => Math.max(...arr)
  );

function App() {
  const [map, setMap] = useState<LeafletMap>();
  const [date, setDate] = useState<number>(1790);
  const [population, setPopulation] = useState<Population>("whole");
  const [state, setState] = useState<any>(null);

  const CurrentState = tw.div`rounded p-4 bg-gray-50 absolute top-1/2 right-2 z-1000 text-gray-900`;

  const LabelContainer = tw.div`rounded-sm bg-gray-50 absolute bottom-8 right-2 z-1000 `;
  const Label = styled.label(({ active }: { active: boolean }) => [
    tw`block p-1 flex justify-between text-gray-700`,
    active && tw`text-gray-900`,
  ]);
  const getStyle = (max: number) => (year: number) => (
    feature?: GeoJSON.Feature
  ) =>
    feature
      ? {
          fillColor: getColor(max)(
            pipe(
              valueOfInterest,
              ap(feature.properties),
              ap(population),
              ap(year)
            )
          ),
          weight: 2,
          opacity: 1,
          color: "white",
          dashArray: "3",
          fillOpacity: 0.7,
        }
      : {};
  const highlightFeature = (e: LeafletMouseEvent) => {
    var layer = e.target;

    layer.setStyle({
      weight: 3,
      color: "#666",
      dashArray: "",
      fillOpacity: 0.7,
    });

    layer.bringToFront();
    setState(layer.feature.properties);
  };
  const resetHighlight = (e: LeafletMouseEvent) => {
    var layer = e.target;

    layer.setStyle({
      weight: 2,
      opacity: 1,
      color: "white",
      dashArray: "3",
      fillOpacity: 0.7,
    });
    setState(null);
  };
  const onEachFeature = (feature: GeoJSON.Feature, layer: Layer) => {
    layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
    });
  };
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
      geoJSON(data, { style, onEachFeature, attribution: "US Census" }).addTo(
        map
      );
    }
  };

  useEffect(
    () =>
      pipe(
        map,
        O.fromNullable,
        O.fold(constVoid, (map) => handleChange(map)(date))
      ),
    [population, handleChange, map]
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
        <CurrentState>
          <h2>Current State: {state ? state.name : ""}</h2>
          <p>
            {population} Population:{" "}
            {state ? valueOfInterest(state)(population)(date) : ""}
          </p>
        </CurrentState>
        {pipe(
          map,
          O.fromNullable,
          O.fold(
            () => null,
            (map) => (
              <>
                <DateSlider
                  min={1790}
                  max={2010}
                  value={date}
                  onChange={handleChange(map)}
                  onMouseOver={() => map.dragging.disable()}
                  onMouseOut={() => map.dragging.enable()}
                />
                <LabelContainer
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPopulation(e.target.value as Population)
                  }
                >
                  <Label active={population === "whole"}>
                    Whole population
                    <input
                      type="radio"
                      name="population"
                      value="whole"
                      checked={population === "whole"}
                    />
                  </Label>
                  {date < 1870 ? (
                    <>
                      <Label active={population === "free"}>
                        Free population
                        <input
                          type="radio"
                          name="population"
                          value="free"
                          checked={population === "free"}
                        />
                      </Label>
                      <Label active={population === "enslaved"}>
                        Enslaved population
                        <input
                          type="radio"
                          name="population"
                          value="enslaved"
                          checked={population === "enslaved"}
                        />
                      </Label>
                    </>
                  ) : null}
                </LabelContainer>
              </>
            )
          )
        )}
      </MapContainer>
    </div>
  );
}

export default App;
