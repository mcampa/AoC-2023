const fs = require("fs");

const printDirectionMap = {
  right: ">",
  left: "<",
  up: "^",
  down: "v",
};

function solution() {
  const grid = fs
    .readFileSync(`${__dirname}/input.txt`, "utf8")
    .split("\n")
    .map((line) => line.split(""));

  grid.forEach((line) => console.log(line.join("")));
  console.log("part1", ride(grid, [0, 0], "right"));

  let max = 0;
  for (let i = 0; i < grid[0].length; i++) {
    max = Math.max(
      max,
      ride(grid, [0, i], "down"),
      ride(grid, [grid[0].length - 1, i], "up")
    );
  }
  for (let i = 0; i < grid.length; i++) {
    max = Math.max(
      max,
      ride(grid, [i, 0], "right"),
      ride(grid, [i, grid.length - 1], "left")
    );
  }
  console.log("part2", max);
}

function ride(grid, startPos, startDirection) {
  const gridRresult = grid.map((line) => line.map((char) => "."));
  // console.log("")

  const stack = [[startPos, startDirection]];
  const visited = new Set();
  let count = 0;
  const set = new Set();
  while (stack.length > 0) {
    const [pos, direction] = stack.pop();
    const key = `${pos[0]},${pos[1]},${direction}`;

    if (visited.has(key)) {
      continue;
    }
    if (pos[0] < 0 || pos[0] >= grid.length) {
      continue;
    }
    if (pos[1] < 0 || pos[1] >= grid[0].length) {
      continue;
    }

    count++;

    visited.add(key);

    const currentChar = grid[pos[0]][pos[1]];

    set.add(`${pos[0]},${pos[1]}`);
    gridRresult[pos[0]][pos[1]] = "#"; //printDirectionMap[direction];
    if (currentChar === ".") {
    }

    if (currentChar === ".") {
      stack.push([getNextDirection(pos, direction), direction]);
    }

    if (currentChar === "|") {
      if (["left", "right"].includes(direction)) {
        stack.push([[pos[0] - 1, pos[1]], "up"]);
        stack.push([[pos[0] + 1, pos[1]], "down"]);
      } else {
        stack.push([getNextDirection(pos, direction), direction]);
      }
    }

    if (currentChar === "-") {
      if (["up", "down"].includes(direction)) {
        stack.push([[pos[0], pos[1] - 1], "left"]);
        stack.push([[pos[0], pos[1] + 1], "right"]);
      } else {
        stack.push([getNextDirection(pos, direction), direction]);
      }
    }

    if (currentChar === "/") {
      if (direction === "up") {
        stack.push([[pos[0], pos[1] + 1], "right"]);
      } else if (direction === "right") {
        stack.push([[pos[0] - 1, pos[1]], "up"]);
      } else if (direction === "down") {
        stack.push([[pos[0], pos[1] - 1], "left"]);
      } else if (direction === "left") {
        stack.push([[pos[0] + 1, pos[1]], "down"]);
      }
    }

    if (currentChar === "\\") {
      if (direction === "up") {
        stack.push([[pos[0], pos[1] - 1], "left"]);
      } else if (direction === "right") {
        stack.push([[pos[0] + 1, pos[1]], "down"]);
      } else if (direction === "down") {
        stack.push([[pos[0], pos[1] + 1], "right"]);
      } else if (direction === "left") {
        stack.push([[pos[0] - 1, pos[1]], "up"]);
      }
    }
  }

  // gridRresult.forEach((line) => console.log(line.join('')));

  return set.size;
}

function getNextDirection(pos, direction) {
  const [y, x] = pos;
  const [dy, dx] = {
    right: [0, 1],
    left: [0, -1],
    up: [-1, 0],
    down: [1, 0],
  }[direction];
  return [y + dy, x + dx];
}

solution();
