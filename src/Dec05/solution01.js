const fs = require("fs");

const mapOrder = [
  "seed-to-soil",
  "soil-to-fertilizer",
  "fertilizer-to-water",
  "water-to-light",
  "light-to-temperature",
  "temperature-to-humidity",
  "humidity-to-location",
];

function solution() {
  const fileContent = fs
    .readFileSync(`${__dirname}/input.txt`, "utf8")
    .split("\n");
  let seeds = [];
  let currentMapName;
  const allMaps = {};

  for (line of fileContent) {
    if (/seeds: (.+)/.test(line)) {
      seeds = line
        .match(/seeds: (.+)/)[1]
        .split(/\s+/)
        .map((n) => parseInt(n));
      continue;
    }

    if (line === "") {
      continue;
    }

    if (/(.+) map:/.test(line)) {
      currentMapName = line.match(/(.+) map:/)[1];
      allMaps[currentMapName] = [];
      continue;
    }

    const codedMap = line.split(/\s+/).map((n) => parseInt(n));
    allMaps[currentMapName].push(codedMap);
  }

  const list = [];
  let currentSource;
  for (seed of seeds) {
    currentSource = seed;

    console.log("seed", seed);
    for (mapName of mapOrder) {
      const source = currentSource;
      mapping = allMaps[mapName];
      currentSource = decode(mapping, source);
      console.log("\t", source, mapName, currentSource);
    }
    list.push(currentSource);
  }

  console.log(list);
  console.log("Answer", Math.min(...list));
}

function decode(mapping, value) {
  let result = value;

  for (map of mapping) {
    const [dest, source, length] = map;

    if (result >= source && result < source + length) {
      result = dest + result - source;
      break;
    }
  }

  return result;
}

console.log(solution());
