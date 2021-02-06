const scrape = async () => {
  const wtf = require("wtf_wikipedia");
  const fetch = require("node-fetch");
  /*
  const doc = await wtf.fetch("1820_United_States_census");
  console.log(
    doc
      .json()
      .sections.find((s) => s.title === "City rankings")
      .tables[0].filter(
        (city) => city.Rank.number <= 10 || city.Population.number >= 100000
      )
      .map((city) => ({
        name: city.City.text,
        state: city.State.text,
        population: city.Population.number,
      }))
  );
  */
  fetch("https://geocode.xyz/Orlando,FL?json=1")
    .then((res) => res.json())
    .then(console.log);
};

scrape();
