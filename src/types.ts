export type Population = "whole" | "free" | "enslaved";

export type StateFeature = {
  type: "Feature";
  id?: string | number;
  properties: {
    name: string;
    admitted?: number;
    until?: number;
    census: Record<number, number>;
    enslavedCensus?: Record<number, number>;
  };
  geometry: GeoJSON.GeometryObject;
};
