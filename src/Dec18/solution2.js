const fs = require("fs");
const chalk = require("chalk");

function solution() {
  const input = fs
    .readFileSync(`${__dirname}/input.txt`, "utf8");

  const plan = input.split("\n").map((line) => line.split(" "));

  const path = [[0, 0]];
  let perimeter = 0;
  for (let [__, _, color] of plan) {
    const match = color.match(/#([0-9a-f]{5})([0-9a-f]{1})/);
    const count = parseInt(match[1], 16);
    const direction = parseInt(match[2], 16) % 4;

    perimeter += count;
    const from = path[path.length - 1];
    
    if (direction === 0) {
      path.push([from[0], from[1] + count]);
    } else if (direction === 1) {
      path.push([from[0] + count, from[1]]);
    } else if (direction === 2) {
      path.push([from[0], from[1] - count]);
    } else if (direction === 3) {
      path.push([from[0] - count, from[1]]);
    }
  }

  if (path.at(-1)[0] !== 0 && path.at(-1)[1] !== 0) {
    throw new Error('Path does not end at origin');
  }

  // path.pop()
  function shoelaceArea(corners) {
    const x = corners.map(point => point[0]);
    const y = corners.map(point => point[1]);
    const x2 = [...x.slice(1), x[0]];
    const y2 = [...y.slice(1), y[0]];
  
    const area = Math.abs(
      x.reduce((sum, xi, i) => sum + xi * y2[i], 0) -
      x2.reduce((sum, xi, i) => sum + xi * y[i], 0)
    );
  
    return Math.floor(area / 2);
  }

  return shoelaceArea(path) + Math.floor(perimeter / 2) + 1;
}

console.log(solution());
console.log('should be ', 90111113594927)
