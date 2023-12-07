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
  let seedsRanges = [];
  let currentMapName;
  const allMaps = {};

  for (line of fileContent) {
    if (/seeds: (.+)/.test(line)) {
      seedsRanges = line
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

  let minDestination = Infinity;
  
  for (let i = 0; i < seedsRanges.length; i += 2) {
    const startSeed = seedsRanges[i];
    const lastSeed = seedsRanges[i] + seedsRanges[i + 1] - 1;
    console.log(`first seed ${startSeed} last ${lastSeed}...`);
    for (let seed = startSeed; seed <= lastSeed; seed++) {
      let currentSource = seed;
      for (mapName of mapOrder) {
        currentSource = decode(allMaps[mapName], currentSource);
      }
      minDestination = Math.min(minDestination, currentSource);
    }
  }

  console.log("Answer", minDestination);
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
