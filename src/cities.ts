import { LatLngTuple } from "leaflet";

export const cities: Record<
  number,
  Array<{
    name: string;
    state: string;
    population: number;
    location: LatLngTuple;
  }>
> = {
  1790: [
    {
      name: "New York",
      state: "New York",
      population: 33131,
      location: [40.71274, -74.005974],
    },
    {
      name: "Philadelphia",
      state: "Pennsylvania",
      population: 28522,
      location: [39.952, -75.164],
    },
    {
      name: "Boston",
      state: "Massachusetts",
      population: 18320,
      location: [42.358056, -71.063611],
    },
    {
      name: "Charleston",
      state: "South Carolina",
      population: 16359,
      location: [32.783333, -79.933333],
    },
    {
      name: "Baltimore",
      state: "Maryland",
      population: 13503,
      location: [39.289444, -76.615278],
    },
    {
      name: "Northern Liberties District",
      state: "Pennsylvania",
      population: 9913,
      location: [39.963056, -75.145],
    },
    {
      name: "Salem",
      state: "Massachusetts",
      population: 7921,
      location: [42.519444, -70.897222],
    },
    {
      name: "Newport",
      state: "Rhode Island",
      population: 6716,
      location: [41.49, -71.31],
    },
    {
      name: "Providence",
      state: "Rhode Island",
      population: 6380,
      location: [41.823611, -71.422222],
    },
    {
      name: "Marblehead",
      state: "Massachusetts",
      population: 5661,
      location: [42.5, -70.858333],
    },
    {
      name: "Southwark",
      state: "Pennsylvania",
      population: 5661,
      location: [39.937778, -75.147778],
    },
  ],
};
