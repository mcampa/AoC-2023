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
    let isSymmetric = true;
    for (let i = 0; i < pattern.length; i++) {
      const up = r - i;
      const down = r + 1 + i;
      if (up >= 0 && down < pattern.length) {
        if (pattern[up] !== pattern[down]) {
          isSymmetric = false;
        }
      }
    }
    if (isSymmetric) {
      result += (r + 1) * 100;
    }
  }

  return result;
}

function findReflectionColumn(pattern) {
  let result = 0;
  for (let c = 0; c < pattern[0].length - 1; c++) {
    let isSymmetric = true;
    for (let i = 0; i < pattern[0].length; i++) {
      const left = c - i;
      const right = c + 1 + i;
      if (left >= 0 && right < pattern[0].length) {
        if (pattern.some(p => p[left] !== p[right])) {
          isSymmetric = false;
        }
      }
    }
    if (isSymmetric) {
      result += c + 1;
    }
  }

  return result;
}

console.log(solution());
// 33195