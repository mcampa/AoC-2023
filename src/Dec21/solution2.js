const fs = require("fs");

function solution() {
  const grid = fs
    .readFileSync(`${__dirname}/input.txt`, "utf8")
    .split("\n")
    .map((line) => line.split(""));

  console.log("part1", grid);
}

solution();
