const fs = require("fs");

function solution() {
  const galaxy = fs
    .readFileSync(`${__dirname}/input.txt`, "utf8")
    .split("\n")
    .map((s) => s.split(""));

  let y = 0;
  while (y < galaxy.length) {
    if (galaxy[y].every((char) => char === ".")) {
      galaxy.splice(y, 0, [...galaxy[y]]);
      y++;
    }
    y++;
  }

  let x = 0;
  while (x < galaxy[0].length) {
    if (galaxy.every((row) => row[x] === ".")) {
      galaxy.forEach((row) => row.splice(x, 0, "."));
      x++;
    }
    x++;
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

  let number = 0;
  let totalDistances = 0;
  while (galaxyMap.length > 0) {
    const [y, x] = galaxyMap.shift();

    galaxyMap.forEach(([y2, x2]) => {
      totalDistances += Math.abs(y - y2) + Math.abs(x - x2);;
    });

    number++;
  }

  return totalDistances;
}

console.log(solution());
