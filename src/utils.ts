import { pipe } from "fp-ts/lib/pipeable";
import * as O from "fp-ts/Option";
import * as R from "fp-ts/Record";
import { Layer } from "leaflet";
import { Population, StateFeature } from "./types";

export const capitalize = (s: string) =>
  `${s[0].toLocaleUpperCase()}${s.slice(1)}`;

export const formatNumber = (num: number) =>
  num
    .toString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
    .padStart(11);

interface StateLayer {
  feature: StateFeature;
}
export const isStateLayer = (layer: Layer | StateLayer): layer is StateLayer =>
  layer.hasOwnProperty("feature");

const populationInYear = (census: Record<string, number>, year: number) =>
  pipe(
    census,
    R.lookup(String(year)),
    O.chain(O.fromNullable),
    O.getOrElse(() => 0)
  );

export const valueOfInterest = (properties: GeoJSON.GeoJsonProperties) => (
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
