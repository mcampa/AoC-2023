const fs = require("fs");

function solution() {
  const patterns = fs
    .readFileSync(`${__dirname}/input.txt`, "utf8")
    .split("\n\n").map(p => p.split("\n"));

  let total = 0;
  for (let pattern of patterns) {
    let rowCount = findReflectionRow(pattern);
    let columnCount = findReflectionColumn(pattern);
    total += rowCount;
    total += columnCount;
  }

  return total;
}

function findReflectionRow(pattern) {
  let result = 0;
  
  for (let r = 0; r < pattern.length - 1; r++) {
    let differences = 0;
    for (let dr = 0; dr < pattern.length; dr++) {
      const up = r - dr;
      const down = r + 1 + dr;
      if (up >= 0 && down < pattern.length) {
        for (let c = 0; c < pattern[0].length; c++) {
          if (pattern[up][c] !== pattern[down][c]) {
            differences += 1;
          }
        }
      }
    }
    if (differences === 1) {
      result += (r + 1) * 100;
    }
  }

  return result;
}

function findReflectionColumn(pattern) {
  let result = 0;
  for (let c = 0; c < pattern[0].length - 1; c++) {
    let differences = 0;
    for (let dc = 0; dc < pattern[0].length; dc++) {
      const left = c - dc;
      const right = c + 1 + dc;
      if (left >= 0 && right < pattern[0].length) {
        for (let r = 0; r < pattern.length; r++) {
          if (pattern[r][left] !== pattern[r][right]) {
            differences += 1;
          }
        }
      }
    }
    if (differences === 1) {
      result += c + 1;
    }
  }

  return result;
}

console.log(solution());
// 33195