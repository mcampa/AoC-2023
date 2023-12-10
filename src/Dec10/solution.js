const fs = require("fs");
const chalk = require("chalk");

const printCharMap = {
  F: "┏",
  J: "┛",
  L: "┗",
  7: "┓",
  "|": "┃",
  "-": "━",
};

function solution() {
  const grid = fs
    .readFileSync(`${__dirname}/input.txt`, "utf8")
    .split("\n")
    .map((s) => s.split(""));

  let start;
  // Find start
  for (let i = 0; i < grid.length; i++) {
    const line = grid[i];
    for (let j = 0; j < line.length; j++) {
      const char = line[j];
      if (char === "S") {
        start = [i, j];
        break;
      }
    }
  }

  const getPosibleMoves = (coord) => {
    const [y, x] = coord;
    const char = grid[y][x];
    const moves = [];

    if (
      y > 0 &&
      ["|", "J", "L", "S"].includes(char) &&
      ["|", "7", "F", "S"].includes(grid[y - 1][x])
    ) {
      // go up
      moves.push([y - 1, x]);
    }

    if (
      y < grid.length - 1 &&
      ["|", "F", "7", "S"].includes(char) &&
      ["|", "J", "L", "S"].includes(grid[y + 1][x])
    ) {
      // go down
      moves.push([y + 1, x]);
    }

    if (
      x > 0 &&
      ["-", "J", "7", "S"].includes(char) &&
      ["-", "L", "F", "S"].includes(grid[y][x - 1])
    ) {
      // go left
      moves.push([y, x - 1]);
    }

    if (
      x < grid[y].length - 1 &&
      ["-", "L", "F", "S"].includes(char) &&
      ["-", "J", "7", "S"].includes(grid[y][x + 1])
    ) {
      // go right
      moves.push([y, x + 1]);
    }
    return moves;
  };

  const stack = [[start, null, 0, []]];

  let mainLoopSet;
  let result1;

  // Find loop
  while (stack.length > 0) {
    const [coord, prevCoord, level, loopArr] = stack.pop();
    const [y, x] = coord;

    if (prevCoord && y === start[0] && x === start[1]) {
      result1 = level / 2;
      mainLoopSet = new Set(loopArr);
      grid[start[0]][start[1]] = getStartChar(loopArr, start);
      break;
    }

    loopArr.push(`${y},${x}`);

    for (let nextCoors of getPosibleMoves(coord)) {
      if (
        prevCoord &&
        nextCoors[0] === prevCoord[0] &&
        nextCoors[1] === prevCoord[1]
      ) {
        continue;
      }

      stack.push([nextCoors, coord, level + 1, loopArr]);
    }
  }
  
  if (!mainLoopSet) {
    throw new Error("No loop found");
  }

  let result2 = 0;
  // Find tiles in the loop
  for (let y = 0; y < grid.length; y++) {
    const line = grid[y];
    let isInside = false;
    let wallDir = null;

    for (let x = 0; x < line.length; x++) {
      const char = grid[y][x];

      if (mainLoopSet.has(`${y},${x}`)) {
        const color =
          start[0] === y && start[1] === x ? chalk.red : chalk.white;
        process.stdout.write(color(printCharMap[char]));

        // ┃┏━┓┗━┓┏━┛┗━┛
        if (char === "-") {
          continue;
        } else if (char === "|") {
          isInside = !isInside;
        } else if (!wallDir) {
          wallDir = char;
        } else {
          if (wallDir === "F" && char === "J") {
            isInside = !isInside;
          } else if (wallDir === "L" && char === "7") {
            isInside = !isInside;
          }
          wallDir = null;
        }

        continue;
      }

      if (isInside) {
        result2 += 1;
      }

      process.stdout.write(isInside ? chalk.red("♥") : chalk.gray(char));
    }

    process.stdout.write("\n");
  }

  return [result1, result2];
}

console.log(solution());


function getStartChar(loopArr, start) {
  const first = loopArr.at(1).split(",").map(Number);
  const end = loopArr.at(-1).split(",").map(Number);

  const keyStart = `${first[0] - start[0]},${first[1] - start[1]}`
  const keyEnd = `${end[0] - start[0]},${end[1] - start[1]}`;

  const map1 = {
    "-1,0": "up",
    "1,0": "down",
    "0,-1": "left",
    "0,1": "right",
  }

  const map2 = {
    "down-left": "7",
    "down-up": "|",
    "down-right": "F",
    "left-right": "-",
    "left-up": "J",
    "right-up": "L",
  };

  return map2[[map1[keyStart], map1[keyEnd]].sort().join("-")]
}