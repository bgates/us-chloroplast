import { City } from "./types";

export const getCityRadius = (size: number) =>
  size > 7000000
    ? 10
    : size > 6000000
    ? 9.5
    : size > 5000000
    ? 9
    : size > 4000000
    ? 8
    : size > 2000000
    ? 7
    : size > 1000000
    ? 6
    : size > 750000
    ? 5
    : size > 500000
    ? 4
    : size > 250000
    ? 3
    : size > 125000
    ? 2.5
    : size > 50000
    ? 2
    : size > 25000
    ? 1.5
    : 1;

export const cities: Record<number, Array<City>> = {
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
  1800: [
    {
      name: "New York",
      state: "New York",
      population: 60515,
      location: [40.71274, -74.005974],
    },
    {
      name: "Philadelphia",
      state: "Pennsylvania",
      population: 41220,
      location: [39.952, -75.164],
    },
    {
      name: "Baltimore",
      state: "Maryland",
      population: 26514,
      location: [39.289444, -76.615278],
    },
    {
      name: "Boston",
      state: "Massachusetts",
      population: 24937,
      location: [42.358056, -71.063611],
    },
    {
      name: "Charleston",
      state: "South Carolina",
      population: 18824,
      location: [32.783333, -79.933333],
    },
    {
      name: "Northern Liberties District",
      state: "Pennsylvania",
      population: 10718,
      location: [39.963056, -75.145],
    },
    {
      name: "Southwark",
      state: "Pennsylvania",
      population: 9621,
      location: [39.937778, -75.147778],
    },
    {
      name: "Salem",
      state: "Massachusetts",
      population: 9457,
      location: [42.519444, -70.897222],
    },
    {
      name: "Providence",
      state: "Rhode Island",
      population: 7614,
      location: [41.823611, -71.422222],
    },
    {
      name: "Norfolk",
      state: "Virginia",
      population: 6926,
      location: [36.916667, -76.2],
    },
  ],
  1810: [
    {
      name: "New York",
      state: "New York",
      population: 96373,
      location: [40.71274, -74.005974],
    },
    {
      name: "Philadelphia",
      state: "Pennsylvania",
      population: 53722,
      location: [39.952, -75.164],
    },
    {
      name: "Baltimore",
      state: "Maryland",
      population: 46555,
      location: [39.289444, -76.615278],
    },
    {
      name: "Boston",
      state: "Massachusetts",
      population: 33787,
      location: [42.358056, -71.063611],
    },
    {
      name: "Charleston",
      state: "South Carolina",
      population: 24711,
      location: [32.783333, -79.933333],
    },
    {
      name: "Northern Liberties District",
      state: "Pennsylvania",
      population: 19874,
      location: [39.963056, -75.145],
    },
    {
      name: "New Orleans",
      state: "Louisiana",
      population: 17242,
      location: [29.95, -90.08],
    },
    {
      name: "Southwark",
      state: "Pennsylvania",
      population: 13707,
      location: [39.937778, -75.147778],
    },
    {
      name: "Salem",
      state: "Massachusetts",
      population: 12613,
      location: [42.519444, -70.897222],
    },
    {
      name: "Albany",
      state: "New York",
      population: 10762,
      location: [42.6525, -73.757222],
    },
  ],
  1820: [
    {
      name: "New York",
      state: "New York",
      population: 123706,
      location: [40.71274, -74.005974],
    },
    {
      name: "Baltimore",
      state: "Maryland",
      population: 78444,
      location: [39.289444, -76.615278],
    },
    {
      name: "Philadelphia",
      state: "Pennsylvania",
      population: 63802,
      location: [39.952, -75.164],
    },
    {
      name: "Boston",
      state: "Massachusetts",
      population: 43298,
      location: [42.358056, -71.063611],
    },
    {
      name: "New Orleans",
      state: "Louisiana",
      population: 27176,
      location: [29.95, -90.08],
    },
    {
      name: "Charleston",
      state: "South Carolina",
      population: 24780,
      location: [32.783333, -79.933333],
    },
    {
      name: "Northern Liberties District",
      state: "Pennsylvania",
      population: 19678,
      location: [39.963056, -75.145],
    },
    {
      name: "Southwark",
      state: "Pennsylvania",
      population: 14713,
      location: [39.937778, -75.147778],
    },
    {
      name: "Washington",
      state: "District of Columbia",
      population: 13247,
      location: [38.9101, -77.0147],
    },
    {
      name: "Salem",
      state: "Massachusetts",
      population: 12731,
      location: [42.519444, -70.897222],
    },
  ],
  1830: [
    {
      name: "New York",
      state: "New York",
      population: 202589,
      location: [40.71274, -74.005974],
    },
    {
      name: "Baltimore",
      state: "Maryland",
      population: 80620,
      location: [39.289444, -76.615278],
    },
    {
      name: "Philadelphia",
      state: "Pennsylvania",
      population: 80462,
      location: [39.952, -75.164],
    },
    {
      name: "Boston",
      state: "Massachusetts",
      population: 61392,
      location: [42.358056, -71.063611],
    },
    {
      name: "New Orleans",
      state: "Louisiana",
      population: 46082,
      location: [29.95, -90.08],
    },
    {
      name: "Charleston",
      state: "South Carolina",
      population: 30289,
      location: [32.783333, -79.933333],
    },
    {
      name: "Northern Liberties District",
      state: "Pennsylvania",
      population: 28872,
      location: [39.963056, -75.145],
    },
    {
      name: "Cincinnati",
      state: "Ohio",
      population: 24831,
      location: [39.1, -84.516667],
    },
    {
      name: "Albany",
      state: "New York",
      population: 24209,
      location: [42.6525, -73.757222],
    },
    {
      name: "Southwark",
      state: "Pennsylvania",
      population: 20581,
      location: [39.937778, -75.147778],
    },
  ],
  1840: [
    {
      name: "New York",
      state: "New York",
      population: 312710,
      location: [40.71274, -74.005974],
    },
    {
      name: "Baltimore",
      state: "Maryland",
      population: 102313,
      location: [39.289444, -76.615278],
    },
    {
      name: "New Orleans",
      state: "Louisiana",
      population: 102913,
      location: [29.95, -90.08],
    },
    {
      name: "Philadelphia",
      state: "Pennsylvania",
      population: 93655,
      location: [39.952, -75.164],
    },
    {
      name: "Boston",
      state: "Massachusetts",
      population: 93383,
      location: [42.358056, -71.063611],
    },
    {
      name: "Cincinnati",
      state: "Ohio",
      population: 46338,
      location: [39.1, -84.516667],
    },
    {
      name: "Brooklyn",
      state: "New York",
      population: 36233,
      location: [40.692778, -73.990278],
    },
    {
      name: "Northern Liberties District",
      state: "Pennsylvania",
      population: 34474,
      location: [39.963056, -75.145],
    },
    {
      name: "Albany",
      state: "New York",
      population: 33721,
      location: [42.6525, -73.757222],
    },
    {
      name: "Charleston",
      state: "South Carolina",
      population: 29261,
      location: [32.783333, -79.933333],
    },
  ],
  1850: [
    {
      name: "New York",
      state: "New York",
      population: 515547,
      location: [40.71274, -74.005974],
    },
    {
      name: "Baltimore",
      state: "Maryland",
      population: 169054,
      location: [39.289444, -76.615278],
    },
    {
      name: "Boston",
      state: "Massachusetts",
      population: 136881,
      location: [42.358056, -71.063611],
    },
    {
      name: "Philadelphia",
      state: "Pennsylvania",
      population: 121376,
      location: [39.952, -75.164],
    },
    {
      name: "New Orleans",
      state: "Louisiana",
      population: 116375,
      location: [29.95, -90.08],
    },
    {
      name: "Cincinnati",
      state: "Ohio",
      population: 115435,
      location: [39.1, -84.516667],
    },
    {
      name: "Brooklyn",
      state: "New York",
      population: 96838,
      location: [40.692778, -73.990278],
    },
    {
      name: "St. Louis",
      state: "Missouri",
      population: 77860,
      location: [38.627222, -90.197778],
    },
    {
      name: "Spring Garden",
      state: "Pennsylvania",
      population: 58894,
      location: [39.962778, -75.161667],
    },
    {
      name: "Albany",
      state: "New York",
      population: 50763,
      location: [42.6525, -73.757222],
    },
  ],
  1860: [
    {
      name: "New York",
      state: "New York",
      population: 813669,
      location: [40.71274, -74.005974],
    },
    {
      name: "Philadelphia",
      state: "Pennsylvania",
      population: 565529,
      location: [39.952, -75.164],
    },
    {
      name: "Brooklyn",
      state: "New York",
      population: 266661,
      location: [40.692778, -73.990278],
    },
    {
      name: "Baltimore",
      state: "Maryland",
      population: 212418,
      location: [39.289444, -76.615278],
    },
    {
      name: "Boston",
      state: "Massachusetts",
      population: 177840,
      location: [42.358056, -71.063611],
    },
    {
      name: "New Orleans",
      state: "Louisiana",
      population: 168675,
      location: [29.95, -90.08],
    },
    {
      name: "Cincinnati",
      state: "Ohio",
      population: 161044,
      location: [39.1, -84.516667],
    },
    {
      name: "St. Louis",
      state: "Missouri",
      population: 160773,
      location: [38.627222, -90.197778],
    },
    {
      name: "Chicago",
      state: "Illinois",
      population: 112172,
      location: [41.881944, -87.627778],
    },
    {
      name: "Buffalo",
      state: "New York",
      population: 81129,
      location: [42.904722, -78.849444],
    },
  ],
  1870: [
    {
      name: "New York",
      state: "New York",
      population: 942292,
      location: [40.71274, -74.005974],
    },
    {
      name: "Philadelphia",
      state: "Pennsylvania",
      population: 674022,
      location: [39.952, -75.164],
    },
    {
      name: "Brooklyn",
      state: "New York",
      population: 396099,
      location: [40.692778, -73.990278],
    },
    {
      name: "St. Louis",
      state: "Missouri",
      population: 310864,
      location: [38.627222, -90.197778],
    },
    {
      name: "Chicago",
      state: "Illinois",
      population: 298977,
      location: [41.881944, -87.627778],
    },
    {
      name: "Baltimore",
      state: "Maryland",
      population: 267354,
      location: [39.289444, -76.615278],
    },
    {
      name: "Boston",
      state: "Massachusetts",
      population: 250526,
      location: [42.358056, -71.063611],
    },
    {
      name: "Cincinnati",
      state: "Ohio",
      population: 216239,
      location: [39.1, -84.516667],
    },
    {
      name: "New Orleans",
      state: "Louisiana",
      population: 191418,
      location: [29.95, -90.08],
    },
    {
      name: "San Francisco",
      state: "California",
      population: 149473,
      location: [37.7775, -122.416389],
    },
  ],
  1880: [
    {
      name: "New York",
      state: "New York",
      population: 1206299,
      location: [40.71274, -74.005974],
    },
    {
      name: "Philadelphia",
      state: "Pennsylvania",
      population: 847170,
      location: [39.952, -75.164],
    },
    {
      name: "Brooklyn",
      state: "New York",
      population: 566663,
      location: [40.692778, -73.990278],
    },
    {
      name: "Chicago",
      state: "Illinois",
      population: 503185,
      location: [41.881944, -87.627778],
    },
    {
      name: "Boston",
      state: "Massachusetts",
      population: 362839,
      location: [42.358056, -71.063611],
    },
    {
      name: "St. Louis",
      state: "Missouri",
      population: 350518,
      location: [38.627222, -90.197778],
    },
    {
      name: "Baltimore",
      state: "Maryland",
      population: 332313,
      location: [39.289444, -76.615278],
    },
    {
      name: "Cincinnati",
      state: "Ohio",
      population: 255139,
      location: [39.1, -84.516667],
    },
    {
      name: "San Francisco",
      state: "California",
      population: 233959,
      location: [37.7775, -122.416389],
    },
    {
      name: "New Orleans",
      state: "Louisiana",
      population: 216090,
      location: [29.95, -90.08],
    },
  ],
  1890: [
    {
      name: "New York",
      state: "New York",
      population: 1515301,
      location: [40.71274, -74.005974],
    },
    {
      name: "Chicago",
      state: "Illinois",
      population: 1099850,
      location: [41.881944, -87.627778],
    },
    {
      name: "Philadelphia",
      state: "Pennsylvania",
      population: 1046964,
      location: [39.952, -75.164],
    },
    {
      name: "Brooklyn",
      state: "New York",
      population: 806343,
      location: [40.692778, -73.990278],
    },
    {
      name: "St. Louis",
      state: "Missouri",
      population: 451770,
      location: [38.627222, -90.197778],
    },
    {
      name: "Boston",
      state: "Massachusetts",
      population: 448477,
      location: [42.358056, -71.063611],
    },
    {
      name: "Baltimore",
      state: "Maryland",
      population: 434439,
      location: [39.289444, -76.615278],
    },
    {
      name: "San Francisco",
      state: "California",
      population: 298997,
      location: [37.7775, -122.416389],
    },
    {
      name: "Cincinnati",
      state: "Ohio",
      population: 296908,
      location: [39.1, -84.516667],
    },
    {
      name: "Cleveland",
      state: "Ohio",
      population: 261353,
      location: [41.482222, -81.669722],
    },
    /*
    {
      name: "New Orleans",
      state: "Louisiana",
      population: 216090,
      location: [29.95, -90.08],
    },
    */
  ],
  1900: [
    {
      name: "New York",
      state: "New York",
      population: 3437202,
      location: [40.71274, -74.005974],
    },
    {
      name: "Chicago",
      state: "Illinois",
      population: 1698575,
      location: [41.881944, -87.627778],
    },
    {
      name: "Philadelphia",
      state: "Pennsylvania",
      population: 1293697,
      location: [39.952, -75.164],
    },
    {
      name: "St. Louis",
      state: "Missouri",
      population: 575238,
      location: [38.627222, -90.197778],
    },
    {
      name: "Boston",
      state: "Massachusetts",
      population: 560892,
      location: [42.358056, -71.063611],
    },
    {
      name: "Baltimore",
      state: "Maryland",
      population: 508957,
      location: [39.289444, -76.615278],
    },
    {
      name: "Cleveland",
      state: "Ohio",
      population: 391768,
      location: [41.482222, -81.669722],
    },
    {
      name: "Buffalo",
      state: "New York",
      population: 352387,
      location: [42.904722, -78.849444],
    },
    {
      name: "San Francisco",
      state: "California",
      population: 342782,
      location: [37.7775, -122.416389],
    },
    {
      name: "Cincinnati",
      state: "Ohio",
      population: 325902,
      location: [39.1, -84.516667],
    },
  ],
  1910: [
    {
      name: "New York",
      state: "New York",
      population: 4766883,
      location: [40.71274, -74.005974],
    },
    {
      name: "Chicago",
      state: "Illinois",
      population: 2185283,
      location: [41.881944, -87.627778],
    },
    {
      name: "Philadelphia",
      state: "Pennsylvania",
      population: 1549008,
      location: [39.952, -75.164],
    },
    {
      name: "St. Louis",
      state: "Missouri",
      population: 687029,
      location: [38.627222, -90.197778],
    },
    {
      name: "Boston",
      state: "Massachusetts",
      population: 670585,
      location: [42.358056, -71.063611],
    },
    {
      name: "Cleveland",
      state: "Ohio",
      population: 560663,
      location: [41.482222, -81.669722],
    },
    {
      name: "Baltimore",
      state: "Maryland",
      population: 558485,
      location: [39.289444, -76.615278],
    },
    {
      name: "Pittsburgh",
      state: "Pennsylvania",
      population: 533905,
      location: [40.439722, -79.976389],
    },
    {
      name: "Detroit",
      state: "Michigan",
      population: 465766,
      location: [42.331389, -83.045833],
    },
    {
      name: "Buffalo",
      state: "New York",
      population: 420715,
      location: [42.904722, -78.849444],
    },
    /*
    {
      name: "San Francisco",
      state: "California",
      population: 342782,
      location: [37.7775, -122.416389],
    },
    {
      name: "Cincinnati",
      state: "Ohio",
      population: 325902,
      location: [39.1, -84.516667],
    },
    */
  ],
  1920: [
    {
      name: "New York",
      state: "New York",
      population: 5620048,
      location: [40.71274, -74.005974],
    },
    {
      name: "Chicago",
      state: "Illinois",
      population: 2701705,
      location: [41.881944, -87.627778],
    },
    {
      name: "Philadelphia",
      state: "Pennsylvania",
      population: 1823779,
      location: [39.952, -75.164],
    },
    {
      name: "Detroit",
      state: "Michigan",
      population: 993078,
      location: [42.331389, -83.045833],
    },
    {
      name: "Cleveland",
      state: "Ohio",
      population: 796841,
      location: [41.482222, -81.669722],
    },
    {
      name: "St. Louis",
      state: "Missouri",
      population: 772897,
      location: [38.627222, -90.197778],
    },
    {
      name: "Boston",
      state: "Massachusetts",
      population: 748060,
      location: [42.358056, -71.063611],
    },
    {
      name: "Baltimore",
      state: "Maryland",
      population: 733826,
      location: [39.289444, -76.615278],
    },
    {
      name: "Pittsburgh",
      state: "Pennsylvania",
      population: 588343,
      location: [40.439722, -79.976389],
    },
    {
      name: "Los Angeles",
      state: "California",
      population: 576673,
      location: [34.05, -118.25],
    },
  ],
  1930: [
    {
      name: "New York",
      state: "New York",
      population: 6930446,
      location: [40.71274, -74.005974],
    },
    {
      name: "Chicago",
      state: "Illinois",
      population: 3376438,
      location: [41.881944, -87.627778],
    },
    {
      name: "Philadelphia",
      state: "Pennsylvania",
      population: 1950961,
      location: [39.952, -75.164],
    },
    {
      name: "Detroit",
      state: "Michigan",
      population: 1568662,
      location: [42.331389, -83.045833],
    },
    {
      name: "Los Angeles",
      state: "California",
      population: 1238048,
      location: [34.05, -118.25],
    },
    {
      name: "Cleveland",
      state: "Ohio",
      population: 900429,
      location: [41.482222, -81.669722],
    },
    {
      name: "St. Louis",
      state: "Missouri",
      population: 821960,
      location: [38.627222, -90.197778],
    },
    {
      name: "Baltimore",
      state: "Maryland",
      population: 804874,
      location: [39.289444, -76.615278],
    },
    {
      name: "Boston",
      state: "Massachusetts",
      population: 781188,
      location: [42.358056, -71.063611],
    },
    {
      name: "Pittsburgh",
      state: "Pennsylvania",
      population: 669817,
      location: [40.439722, -79.976389],
    },
  ],
  1940: [
    {
      name: "New York",
      state: "New York",
      population: 7454995,
      location: [40.71274, -74.005974],
    },
    {
      name: "Chicago",
      state: "Illinois",
      population: 3396808,
      location: [41.881944, -87.627778],
    },
    {
      name: "Philadelphia",
      state: "Pennsylvania",
      population: 1931334,
      location: [39.952, -75.164],
    },
    {
      name: "Detroit",
      state: "Michigan",
      population: 1623452,
      location: [42.331389, -83.045833],
    },
    {
      name: "Los Angeles",
      state: "California",
      population: 1504277,
      location: [34.05, -118.25],
    },
    {
      name: "Cleveland",
      state: "Ohio",
      population: 878336,
      location: [41.482222, -81.669722],
    },
    {
      name: "Baltimore",
      state: "Maryland",
      population: 859100,
      location: [39.289444, -76.615278],
    },
    {
      name: "St. Louis",
      state: "Missouri",
      population: 816048,
      location: [38.627222, -90.197778],
    },
    {
      name: "Boston",
      state: "Massachusetts",
      population: 770816,
      location: [42.358056, -71.063611],
    },
    {
      name: "Pittsburgh",
      state: "Pennsylvania",
      population: 671659,
      location: [40.439722, -79.976389],
    },
  ],
  1950: [
    {
      name: "New York",
      state: "New York",
      population: 7891957,
      location: [40.71274, -74.005974],
    },
    {
      name: "Chicago",
      state: "Illinois",
      population: 3620962,
      location: [41.881944, -87.627778],
    },
    {
      name: "Philadelphia",
      state: "Pennsylvania",
      population: 2071605,
      location: [39.952, -75.164],
    },
    {
      name: "Los Angeles",
      state: "California",
      population: 1970358,
      location: [34.05, -118.25],
    },
    {
      name: "Detroit",
      state: "Michigan",
      population: 1849568,
      location: [42.331389, -83.045833],
    },
    {
      name: "Baltimore",
      state: "Maryland",
      population: 949708,
      location: [39.289444, -76.615278],
    },
    {
      name: "Cleveland",
      state: "Ohio",
      population: 914808,
      location: [41.482222, -81.669722],
    },
    {
      name: "St. Louis",
      state: "Missouri",
      population: 856796,
      location: [38.627222, -90.197778],
    },
    {
      name: "Washington",
      state: "District of Columbia",
      population: 802178,
      location: [38.9101, -77.0147],
    },
    {
      name: "Boston",
      state: "Massachusetts",
      population: 801444,
      location: [42.358056, -71.063611],
    },
  ],
  1960: [
    {
      name: "New York",
      state: "New York",
      population: 7781984,
      location: [40.71274, -74.005974],
    },
    {
      name: "Chicago",
      state: "Illinois",
      population: 3550404,
      location: [41.881944, -87.627778],
    },
    {
      name: "Los Angeles",
      state: "California",
      population: 2479015,
      location: [34.05, -118.25],
    },
    {
      name: "Philadelphia",
      state: "Pennsylvania",
      population: 2002512,
      location: [39.952, -75.164],
    },
    {
      name: "Detroit",
      state: "Michigan",
      population: 1670144,
      location: [42.331389, -83.045833],
    },
    {
      name: "Baltimore",
      state: "Maryland",
      population: 939024,
      location: [39.289444, -76.615278],
    },
    {
      name: "Houston",
      state: "Texas",
      population: 938219,
      location: [29.762778, -95.383056],
    },
    {
      name: "Cleveland",
      state: "Ohio",
      population: 914808,
      location: [41.482222, -81.669722],
    },
    {
      name: "Washington",
      state: "District of Columbia",
      population: 763956,
      location: [38.9101, -77.0147],
    },
    {
      name: "St. Louis",
      state: "Missouri",
      population: 750026,
      location: [38.627222, -90.197778],
    },
  ],
  1970: [
    {
      name: "New York",
      state: "New York",
      population: 7894862,
      location: [40.71274, -74.005974],
    },
    {
      name: "Chicago",
      state: "Illinois",
      population: 3366957,
      location: [41.881944, -87.627778],
    },
    {
      name: "Los Angeles",
      state: "California",
      population: 2816061,
      location: [34.05, -118.25],
    },
    {
      name: "Philadelphia",
      state: "Pennsylvania",
      population: 1948609,
      location: [39.952, -75.164],
    },
    {
      name: "Detroit",
      state: "Michigan",
      population: 1511482,
      location: [42.331389, -83.045833],
    },
    {
      name: "Houston",
      state: "Texas",
      population: 1232802,
      location: [29.762778, -95.383056],
    },
    {
      name: "Baltimore",
      state: "Maryland",
      population: 905759,
      location: [39.289444, -76.615278],
    },
    {
      name: "Dallas",
      state: "Texas",
      population: 844401,
      location: [32.779167, -96.808889],
    },
    {
      name: "Washington",
      state: "District of Columbia",
      population: 756510,
      location: [38.9101, -77.0147],
    },
    {
      name: "Cleveland",
      state: "Ohio",
      population: 750903,
      location: [41.482222, -81.669722],
    },
  ],
  1980: [
    {
      name: "New York",
      state: "New York",
      population: 7071639,
      location: [40.71274, -74.005974],
    },
    {
      name: "Chicago",
      state: "Illinois",
      population: 3005072,
      location: [41.881944, -87.627778],
    },
    {
      name: "Los Angeles",
      state: "California",
      population: 2966850,
      location: [34.05, -118.25],
    },
    {
      name: "Philadelphia",
      state: "Pennsylvania",
      population: 1688210,
      location: [39.952, -75.164],
    },
    {
      name: "Houston",
      state: "Texas",
      population: 1595138,
      location: [29.762778, -95.383056],
    },
    {
      name: "Detroit",
      state: "Michigan",
      population: 1203339,
      location: [42.331389, -83.045833],
    },
    {
      name: "Dallas",
      state: "Texas",
      population: 844401,
      location: [32.779167, -96.808889],
    },
    {
      name: "San Diego",
      state: "California",
      population: 875538,
      location: [32.715, -117.1625],
    },
    {
      name: "Phoenix",
      state: "Arizona",
      population: 789704,
      location: [33.45, -112.066667],
    },
    {
      name: "Baltimore",
      state: "Maryland",
      population: 786775,
      location: [39.289444, -76.615278],
    },
  ],
};
