import React, { useCallback, useEffect, useState } from "react";
import { pipe } from "fp-ts/lib/pipeable";
import * as A from "fp-ts/Array";
import { ap } from "fp-ts/lib/Identity";
import * as O from "fp-ts/Option";
import {
  CircleMarker as LeafletCircleMarker,
  geoJSON,
  Layer,
  LeafletMouseEvent,
  Map as LeafletMap,
} from "leaflet";
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  CircleMarker,
  Popup,
} from "react-leaflet";
import "./App.css";
import { cities } from "./cities";
import DateSlider from "./DateSlider";
import { statesData } from "./state-border-geojson";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "./tailwind.config";
import { FreeVsEnslavedControl } from "./FreeVsEnslavedControl";
import memoize from "fast-memoize";
import { Population, StateFeature } from "./types";
import { InfoBox } from "./InfoBox";
import { valueOfInterest } from "./utils";
import { constVoid } from "fp-ts/lib/function";

const fullConfig = resolveConfig(tailwindConfig);
const { blue } = fullConfig.theme.colors;

const initialData = {
  ...statesData,
  features: statesData.features.filter(
    (f) => f.properties.admitted && f.properties.admitted <= 1790
  ),
};

const colors = [
  blue["map-100"],
  blue["map-200"],
  blue["map-300"],
  blue["map-400"],
  blue["map-500"],
  blue["map-600"],
  blue["map-700"],
  blue["map-800"],
  blue["map-900"],
];

const baseStyle = {
  weight: 2,
  opacity: 1,
  color: "white",
  dashArray: "3",
  fillOpacity: 0.9,
};
const highlightStyle = {
  weight: 3,
  color: "#666",
  dashArray: "",
};

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

const compareToNullable = (
  year1: number | undefined,
  year2: number,
  comparison: (y1: number, y2: number) => boolean,
  defaultValue: boolean = false
) =>
  pipe(
    year1,
    O.fromNullable,
    O.map((y1) => comparison(y1, year2)),
    O.getOrElse(() => defaultValue)
  );
const showState = (year: number) => (feature: typeof statesData.features[0]) =>
  compareToNullable(feature.properties.admitted, year, (y1, y2) => y1 <= y2) &&
  compareToNullable(feature.properties.until, year, (y1, y2) => y1 > y2, true);

const getStatePopulations = (population: Population) => (year: number) => (
  features: Array<GeoJSON.Feature>
) =>
  pipe(
    features,
    A.map((feature) =>
      pipe(valueOfInterest, ap(feature.properties), ap(population), ap(year))
    )
  );

const getStyle = (max: number) => (population: Population) => (
  year: number
) => (feature?: GeoJSON.Feature) =>
  feature
    ? {
        ...baseStyle,
        fillColor: getColor(max)(
          pipe(
            valueOfInterest,
            ap(feature.properties),
            ap(population),
            ap(year)
          )
        ),
      }
    : {};

const statesInYear = memoize((year: number) => ({
  ...statesData,
  features: statesData.features.filter(showState(year)),
}));

const cachedPopulationInYear = memoize((population: Population, year: number) =>
  pipe(
    statesInYear(year).features,
    pipe(getStatePopulations, ap(population), ap(year)),
    (statePopulations) => ({
      max: Math.max(...statePopulations),
      total: pipe(
        statePopulations,
        A.reduce(0, (acc, curr) => acc + curr)
      ),
    })
  )
);

const App = () => {
  const initialLargestStatePopulation = 691937;
  const initialTotalPopulation = 0;
  const [map, setMap] = useState<LeafletMap>();
  const [date, setDate] = useState<number>(1790);
  const [population, setPopulation] = useState<Population>("whole");
  const [largestStatePopulation, setLargestStatePopulation] = useState(
    initialLargestStatePopulation
  );
  const [totalPopulation, setTotalPopulation] = useState(
    initialTotalPopulation
  );
  const [state, setState] = useState<O.Option<StateFeature>>(O.none);

  const highlightFeature = (e: LeafletMouseEvent) => {
    const layer = e.target;
    layer.setStyle(highlightStyle);
    layer.bringToFront();
    setState(layer.feature.properties);
  };
  const resetHighlight = (e: LeafletMouseEvent) => {
    const layer = e.target;
    layer.setStyle(baseStyle);
    setState(O.none);
  };
  const onEachFeature = useCallback(
    (feature: GeoJSON.Feature, layer: Layer) => {
      layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
      });
    },
    []
  );

  const updateMap = useCallback(
    (map: LeafletMap, year: number = date) => {
      map.eachLayer((layer) => {
        if (layer.getAttribution?.() === "US Census") {
          map.removeLayer(layer);
        }
      });
      const data = statesInYear(year);
      const { max, total } = cachedPopulationInYear(population, year);
      setTotalPopulation(total);
      setLargestStatePopulation(max);
      const style = pipe(max, getStyle, ap(population), ap(year));
      geoJSON(data, { style, onEachFeature, attribution: "US Census" }).addTo(
        map
      );
      map.eachLayer((layer) => {
        if (layer instanceof LeafletCircleMarker) {
          layer.bringToFront();
        }
      });
    },
    [date, population, onEachFeature]
  );

  const handleChange = (map: LeafletMap) => (year: number) => {
    setDate(year);
    if (year >= 1870 && date <= 1860 && population === "enslaved") {
      setPopulation("whole");
    } else {
      updateMap(map, year);
    }
  };
  useEffect(() => pipe(map, O.fromNullable, O.fold(constVoid, updateMap)), [
    population,
    updateMap,
    map,
  ]);
  const initializeMap = (newMap: LeafletMap) => {
    setMap(newMap);
    handleChange(newMap)(date);
  };

  return (
    <div className="App">
      <MapContainer
        center={[37.0, -96.5]}
        zoom={4}
        scrollWheelZoom={false}
        whenCreated={initializeMap}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <GeoJSON
          data={initialData}
          style={getStyle(initialLargestStatePopulation)("whole")(1790)}
          attribution="US Census"
        />
        {cities[1790].map((city) => (
          <CircleMarker
            eventHandlers={{ click: () => console.log("huh") }}
            key={city.name}
            center={city.location}
            pathOptions={{ color: "black", fillColor: blue[0] }}
            radius={5}
          >
            <Popup>
              {city.name}, population {city.population}
            </Popup>
          </CircleMarker>
        ))}
        <InfoBox
          max={largestStatePopulation}
          total={totalPopulation}
          year={date}
          state={state}
          population={population}
        />
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
                <FreeVsEnslavedControl
                  handleChange={setPopulation}
                  currentPopulation={population}
                  date={date}
                />
              </>
            )
          )
        )}
      </MapContainer>
    </div>
  );
};

export default App;
