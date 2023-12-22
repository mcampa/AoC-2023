const fs = require("fs");
const chalk = require("chalk");

const directions = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

function solution() {
  const grid = fs
    .readFileSync(`${__dirname}/input.txt`, "utf8")
    .split("\n")
    .map((line) => line.split(""));

  let start = null;
  for (let c = 0; c < grid.length; c++) {
    for (let r = 0; r < grid[0].length; r++) {
      if (grid[c][r] === "S") {
        start = [c, r];
      }
    }
  }

  const elfs = [start];
  const count = 65;

  for (let c = 1; c <= count; c++) {
    const newElfsSet = new Set();
    while (elfs.length) {
      const [y, x] = elfs.shift();

      directions.forEach(([dy, dx]) => {
        const ny = y + dy;
        const nx = x + dx;
        if (
          ny >= 0 &&
          nx >= 0 &&
          ny < grid.length &&
          nx < grid[ny].length &&
          grid[ny][nx] !== "#"
        ) {
          newElfsSet.add(`${ny},${nx}`);
        }
      });
    }
    elfs.push(...Array.from(newElfsSet).map((s) => s.split(",").map(Number)));
    printGrid(elfs, c)
  }

  function printGrid(elfs, count) {
    const set = new Set(elfs.map(([y, x]) => `${y},${x}`));
    console.log({ count });
    grid.forEach((line, c) => {
      line.forEach((char, r) => {
        if (set.has(`${c},${r}`)) {
          return process.stdout.write(chalk.green("O"));
        }
        process.stdout.write(char === "S" ? chalk.red("S") : char);
      });
      process.stdout.write("\n");
    });
  }

  printGrid(elfs, count);
  console.log("part1", elfs.length);
}

solution();
