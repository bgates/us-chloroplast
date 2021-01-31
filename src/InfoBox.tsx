import { pipe } from "fp-ts/lib/pipeable";
import * as O from "fp-ts/Option";
import tw from "twin.macro";
import { Population, StateFeature } from "./types";
import { capitalize, formatNumber, valueOfInterest } from "./utils";

const InfoBoxContainer = tw.div`rounded p-4 pt-0 bg-gray-50 absolute top-1/2 right-2 w-52 z-1000 text-gray-900`;

const LegendContainer = tw.div`text-xs`;

const CurrentState = tw.div`pt-0`;
const StateName = tw.h2`text-lg p-0 m-0 text-gray-600`;
const StateDatum = tw.div`flex justify-between`;
type StateSummaryProps = {
  state: O.Option<StateFeature["properties"]>;
  population: Population;
  date: number;
};
const StateSummary = ({ state, population, date }: StateSummaryProps) => (
  <CurrentState>
    {pipe(
      state,
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

type InfoBoxProps = {
  max: number;
  year: number;
  total: number;
  state: O.Option<StateFeature["properties"]>;
  population: Population;
};
export const InfoBox = ({
  max,
  year,
  total,
  state,
  population,
}: InfoBoxProps) => (
  <InfoBoxContainer>
    <Legend max={max} year={year} total={total} />
    <StateSummary state={state} population={population} date={year} />
  </InfoBoxContainer>
);
