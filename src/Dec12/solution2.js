const fs = require("fs");

function solution() {
  const springs = fs
    .readFileSync(`${__dirname}/input.txt`, "utf8")
    .split("\n")
    .map((s) => {
      const [_, springs, pattern] = /([\?|\.\#]+)\s(.+)/.exec(s);
      return [springs, pattern.split(",").map(Number)];
    });

  let solution2 = 0;

  for (let item of springs) {
    const [springs, pattern] = item;
    const unfoldedSprings = Array(5).fill(springs).join("?");
    const unfoldedPattern = Array(5).fill(pattern).flatMap(p => p);
    const count = memoCountCombinations(unfoldedSprings, unfoldedPattern);
    // console.log(unfoldedSprings, count);
    solution2 += count;
  }

  return solution2;
}

const memo = new Map();
function memoCountCombinations(springs, pattern, level = 0) {
  const key = `${springs}-${pattern.join(",")}`;
  if (memo.has(key)) {
    return memo.get(key);
  }

  const count = countCombinations(springs, pattern, level);
  memo.set(key, count);
  return count;
}

let count = 0;
let maxLevel = 0;
function countCombinations(springs, pattern, level = 0) {
  // console.log(" ".repeat(level), springs, pattern.join(","));
  maxLevel = Math.max(maxLevel, level);
  count++;

  if (springs.length === 0) {
    if (pattern.length === 0) {
      return 1;
    }
    return 0;
  }

  if (pattern.length === 0) {
    for (let i = 0; i < springs.length; i++) {
      if (springs[i] === "#") {
        return 0;
      }
    }
    return 1;
  }

  if (
    springs.length <
    pattern.reduce((a, b) => a + b, 0) + pattern.length - 1
  ) {
    return 0;
  }

  if (springs[0] === "#") {
    for (let i = 1; i < pattern[0]; i++) {
      if (springs[i] === ".") {
        return 0;
      }
    }

    if (springs[pattern[0]] === "#") {
      return 0;
    }

    return memoCountCombinations(
      springs.slice(pattern[0] + 1),
      pattern.slice(1),
      level + 1
    );
  }

  if (springs[0] === ".") {
    return memoCountCombinations(springs.slice(1), pattern, level + 1);
  }

  return (
    // ? case
    memoCountCombinations(`.${springs.slice(1)}`, pattern, level + 1) +
    memoCountCombinations(`#${springs.slice(1)}`, pattern, level + 1)
  );
}

console.log(solution());
console.log({ count, maxLevel, memo: memo.size });

// 1493340882140
