const fs = require("fs");
const chalk = require("chalk");

function solution() {
  const input = fs
    .readFileSync(`${__dirname}/input.txt`, "utf8");

  const plan = input.split("\n").map((line) => line.split(" "));

  // console.log(plan)

  const path = [[0, 0]];
  for (let [direction, count, color] of plan) {
    const from = path[path.length - 1];
    if (direction === 'R') {
      path.push([from[0], from[1] + parseInt(count)]);
    } else if (direction === 'L') {
      path.push([from[0], from[1] - parseInt(count)]);
    } else if (direction === 'U') {
      path.push([from[0] - parseInt(count), from[1]]);
    } else if (direction === 'D') {
      path.push([from[0] + parseInt(count), from[1]]);
    }
  }

  if (path.at(-1)[0] !== 0 && path.at(-1)[1] !== 0) {
    throw new Error('Path does not end at origin');
  }

  let minLeft = 0;
  let minRight = 0;
  let minUp = 0;
  let minDown = 0;

  for (let [y, x] of path) {
    minLeft = Math.min(minLeft, x);
    minRight = Math.max(minRight, x);
    minUp = Math.min(minUp, y);
    minDown = Math.max(minDown, y);
  }

  // console.log(minLeft,minRight,minUp,minDown)

  const pathSet = new Set();
  for (let i = 1; i < path.length; i++) {
    const from = path[i - 1];
    const to = path[i];
    for (let c = Math.min(from[0], to[0]); c <= Math.max(from[0], to[0]); c++) {
      pathSet.add(`${c},${from[1]}`);
    }
    for (let c = Math.min(from[1], to[1]); c <= Math.max(from[1], to[1]); c++) {
      pathSet.add(`${from[0]},${c}`);
    }
  }

  // console.log(minLeft, minRight, minUp, minDown);
  const grid = [];
  for (let i = 0; i < minDown - minUp + 1; i++) {
    const row = [];
    for (let j = 0; j < minRight - minLeft + 1; j++) {
      row.push(pathSet.has(`${i + minUp},${j + minLeft}`) ? '#' : '.');
    }
    grid.push(row);
  }

  let area = 0;
  for (let y = 0; y < grid.length; y++) {
    let wallStartDir = null;
    let inside = false;
    for (let x = 0; x < grid[0].length; x++) {
      const prevChar = grid[y][x - 1];
      const char = grid[y][x];

      // if (char === '#') process.stdout.write('#');

      if (prevChar === '#' && char === '#') {
        continue;
      }
      
      if (char === '#' && !wallStartDir) {
        if (grid[y - 1]?.[x] === '#' && grid[y + 1]?.[x] === '#') {
          inside = !inside;
          continue;
        }

        wallStartDir = grid[y - 1]?.[x] === '#' ? 'up' : 'down';
        continue;
      }
      
      if (char === '.') {
        if (wallStartDir) {
          const wallDir = grid[y - 1]?.[x - 1] === '#' ? 'up' : 'down';
          if (wallDir !== wallStartDir) {
            inside = !inside;
          }
          wallStartDir = null;
        }
        // process.stdout.write(inside ? chalk.green('.') : '.');
        if (inside) {
          area++;
        }
      }
    }
    // process.stdout.write('\n');
  }

  return area + pathSet.size;
}

console.log(solution());

