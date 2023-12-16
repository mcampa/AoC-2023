const fs = require("fs");

function solution() {
  const grid = fs
    .readFileSync(`${__dirname}/input.txt`, "utf8")
    .split("\n")
    .map((line) => line.split(""));

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
  const [startY, startX] = startPos;
  const stack = [[startY, startX, startDirection]];
  const visited = new Set();
  const set = new Set();

  while (stack.length > 0) {
    const [y, x, direction] = stack.pop();

    const key = `${y},${x},${direction}`;

    if (visited.has(key)) {
      continue;
    }
    if (y < 0 || y >= grid.length) {
      continue;
    }
    if (x < 0 || x >= grid[0].length) {
      continue;
    }

    visited.add(key);
    set.add(`${y},${x}`);

    const currentChar = grid[y][x];

    if (currentChar === ".") {
      stack.push(getNextDirection(y, x, direction));
    }

    if (currentChar === "|") {
      if (["left", "right"].includes(direction)) {
        stack.push([y - 1, x, "up"]);
        stack.push([y + 1, x, "down"]);
      } else {
        stack.push(getNextDirection(y, x, direction));
      }
    }

    if (currentChar === "-") {
      if (["up", "down"].includes(direction)) {
        stack.push([y, x - 1, "left"]);
        stack.push([y, x + 1, "right"]);
      } else {
        stack.push(getNextDirection(y, x, direction));
      }
    }

    if (currentChar === "/") {
      if (direction === "up") {
        stack.push([y, x + 1, "right"]);
      } else if (direction === "right") {
        stack.push([y - 1, x, "up"]);
      } else if (direction === "down") {
        stack.push([y, x - 1, "left"]);
      } else if (direction === "left") {
        stack.push([y + 1, x, "down"]);
      }
    }

    if (currentChar === "\\") {
      if (direction === "up") {
        stack.push([y, x - 1, "left"]);
      } else if (direction === "right") {
        stack.push([y + 1, x, "down"]);
      } else if (direction === "down") {
        stack.push([y, x + 1, "right"]);
      } else if (direction === "left") {
        stack.push([y - 1, x, "up"]);
      }
    }
  }

  return set.size;
}

function getNextDirection(y, x, direction) {
  const [dy, dx] = {
    right: [0, 1],
    left: [0, -1],
    up: [-1, 0],
    down: [1, 0],
  }[direction];
  return [y + dy, x + dx, direction];
}

solution();
