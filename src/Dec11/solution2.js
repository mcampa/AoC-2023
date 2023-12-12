const fs = require("fs");

function solution() {
  const galaxy = fs
    .readFileSync(`${__dirname}/input.txt`, "utf8")
    .split("\n")
    .map((s) => s.split(""));

  const expandedRows = new Set();
  const expandedCols = new Set();

  for (let y = 0; y < galaxy.length; y++) {
    if (galaxy[y].every((char) => char === ".")) {
      expandedRows.add(y);
    }
  }

  for (let x = 0; x < galaxy[0].length; x++) {
    if (galaxy.every((row) => row[x] === ".")) {
      expandedCols.add(x);
    }
  }
  const galaxyMap = [];

  for (let y = 0; y < galaxy.length; y++) {
    for (let x = 0; x < galaxy[0].length; x++) {
      const char = galaxy[y][x];
      if (char === "#") {
        galaxyMap.push([y, x]);
      }
    }
  }

  let totalDistances = 0;
  while (galaxyMap.length > 0) {
    const [y, x] = galaxyMap.shift();

    galaxyMap.forEach(([y2, x2]) => {
      const distance = Math.abs(y - y2) + Math.abs(x - x2);

      let expansion = 0;
      for (let t = Math.min(y, y2); t <= Math.max(y, y2); t++) {
        if (expandedRows.has(t)) {
          expansion++;
        }
      }
      for (let t = Math.min(x, x2); t <= Math.max(x, x2); t++) {
        if (expandedCols.has(t)) {
          expansion++;
        }
      }

      totalDistances += distance + expansion * 999999;
    });
  }

  return totalDistances;
}

console.log(solution());
