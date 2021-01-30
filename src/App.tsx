import React, { useEffect, useState } from "react";
import { pipe } from "fp-ts/lib/pipeable";
import * as A from "fp-ts/Array";
import { constVoid } from "fp-ts/lib/function";
import { ap } from "fp-ts/lib/Identity";
import * as O from "fp-ts/Option";
import * as R from "fp-ts/Record";
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
import tw from "twin.macro";
import "./App.css";
import { cities } from "./cities";
import DateSlider from "./DateSlider";
import { statesData } from "./state-border-geojson";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "./tailwind.config";
import { FreeVsEnslavedControl } from "./FreeVsEnslavedControl";
import { capitalize, isStateLayer } from "./utils";
import memoize from "fast-memoize";
import { StateFeature } from "./types";

const fullConfig = resolveConfig(tailwindConfig);
const { blue } = fullConfig.theme.colors;

const initialData = {
  ...statesData,
  features: statesData.features.filter(
    (f) => f.properties.admitted && f.properties.admitted <= 1790
  ),
};

type Population = "whole" | "free" | "enslaved";
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
const formatNumber = (num: number) =>
  num
    .toString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
    .padStart(11);

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

const InfoBox = tw.div`rounded p-4 pt-0 bg-gray-50 absolute top-1/2 right-2 w-52 z-1000 text-gray-900`;
const CurrentState = tw.div`pt-0`;
const StateName = tw.h2`text-lg p-0 m-0 text-gray-600`;
const StateDatum = tw.div`flex justify-between`;
type StateSummaryProps = {
  state?: GeoJSON.GeoJsonProperties;
  population: Population;
  date: number;
};
const StateSummary = ({ state, population, date }: StateSummaryProps) => (
  <CurrentState>
    {pipe(
      state,
      O.fromNullable,
      O.fold(
        () => <h2 tw="pt-2">Hover over a state to see its population</h2>,
        (s) => (
          <>
            <StateName>{s.name}</StateName>
            <dl>
              <StateDatum>
                <dt>{capitalize(population)} Population: </dt>
                <dd>{formatNumber(valueOfInterest(s)(population)(date))}</dd>
              </StateDatum>
            </dl>
          </>
        )
      )
    )}
  </CurrentState>
);
const LegendContainer = tw.div`text-xs`;
const Year = StateName;
const TotalPopulation = tw.h3`text-sm p-1 m-0 text-gray-800`;
const ColorValue = ({
  n,
  fraction,
  comparator = String.fromCharCode(62),
}: {
  n: number;
  fraction: number;
  comparator?: string;
}) => (
  <StateDatum>
    <dt tw="font-mono whitespace-pre">
      {comparator} {formatNumber(Math.round(n))}
    </dt>
    {fraction === 0.9 ? (
      <dd tw="bg-blue-map-900 w-8 bg-opacity-70"></dd>
    ) : fraction === 0.5 ? (
      <dd tw="bg-blue-map-800 w-8 bg-opacity-70"></dd>
    ) : fraction === 0.2 ? (
      <dd tw="bg-blue-map-700 w-8 bg-opacity-70"></dd>
    ) : fraction === 0.1 ? (
      <dd tw="bg-blue-map-600 w-8 bg-opacity-70"></dd>
    ) : fraction === 0.05 ? (
      <dd tw="bg-blue-map-500 w-8 bg-opacity-70"></dd>
    ) : fraction === 0.02 ? (
      <dd tw="bg-blue-map-400 w-8 bg-opacity-70"></dd>
    ) : fraction === 0.01 && comparator === "&gt;" ? (
      <dd tw="bg-blue-map-300 w-8 bg-opacity-70"></dd>
    ) : (
      <dd tw="bg-blue-map-200 w-8 bg-opacity-70"></dd>
    )}
  </StateDatum>
);
const Legend = ({
  max,
  year,
  total,
}: {
  max: number;
  year: number;
  total: number;
}) => (
  <LegendContainer>
    <Year>{year}</Year>
    <TotalPopulation>Population {formatNumber(total)}</TotalPopulation>
    <dl>
      <ColorValue n={max * 0.9} fraction={0.9} />
      <ColorValue n={max * 0.5} fraction={0.5} />
      <ColorValue n={max * 0.2} fraction={0.2} />
      <ColorValue n={max * 0.1} fraction={0.1} />
      <ColorValue n={max * 0.05} fraction={0.05} />
      <ColorValue n={max * 0.02} fraction={0.02} />
      <ColorValue n={max * 0.01} fraction={0.01} />
      <ColorValue n={max * 0.01} fraction={0.01} comparator="&lt;" />
    </dl>
  </LegendContainer>
);

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
  const [state, setState] = useState<any>(null);

  const highlightFeature = (e: LeafletMouseEvent) => {
    const layer = e.target;
    layer.setStyle(highlightStyle);
    layer.bringToFront();
    setState(layer.feature.properties);
  };
  const resetHighlight = (e: LeafletMouseEvent) => {
    const layer = e.target;
    layer.setStyle(baseStyle);
    setState(null);
  };
  const onEachFeature = (feature: GeoJSON.Feature, layer: Layer) => {
    layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
    });
  };
  const handleChange = (map: LeafletMap) => (year: number) => {
    if (year >= 1870 && date <= 1860 && population === "enslaved") {
      setDate(year);
      setPopulation("whole");
    } else {
      setDate(year);
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
    }
  };

  const initializeMap = (newMap: LeafletMap) => {
    setMap(newMap);
    handleChange(newMap)(date);
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>Use the slider at the bottom of the map to see changes over time</p>
      </header>
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
        <InfoBox>
          <Legend
            max={largestStatePopulation}
            total={totalPopulation}
            year={date}
          />
          <StateSummary state={state} population={population} date={date} />
        </InfoBox>
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
