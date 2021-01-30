import { Layer } from "leaflet";
import { StateFeature } from "./types";

export const capitalize = (s: string) =>
  `${s[0].toLocaleUpperCase()}${s.slice(1)}`;

interface StateLayer {
  feature: StateFeature;
}
export const isStateLayer = (layer: Layer | StateLayer): layer is StateLayer =>
  layer.hasOwnProperty("feature");
