const fs = require("fs");

function solution() {
  const springs = fs
    .readFileSync(`${__dirname}/input.txt`, "utf8")
    .split("\n")
    .map((s) => {
      const [_, springs, pattern] = /([\?|\.\#]+)\s(.+)/.exec(s)
      return [springs, pattern];
    });

  
  let totalCombinations = 0;

  for (let item of springs) {
    const [springs, pattern] = item;
    const unknowns = springs.split('').filter(char => char === '?').length;
    const possibleCombinations = Math.pow(2, unknowns);

    for (let bits = 0; bits < possibleCombinations; bits++) {
      let current = springs;
      for (let i = 0; i < unknowns; i++) {
        const bit = (bits >> i) & 1;
        current = current.replace('?', bit === 1 ? '#' : '.');
      }

      if (pattern === getPattern(current)) {
        console.log(current);
        totalCombinations++;
      }
    }
  }

  return totalCombinations;
}

function getPattern(springs) {
  let insertIndex = 0;
  const currentPattern = [];
  for (let c = 0; c < springs.length; c++) {
    if (springs[c] === '#') {
      currentPattern[insertIndex] = (currentPattern[insertIndex] || 0) + 1
    } else if (c > 0 && springs[c - 1] === '#') {
      insertIndex++;
    }
  }
  return currentPattern.filter(n => n > 0).join(',');
}

console.log(solution());
