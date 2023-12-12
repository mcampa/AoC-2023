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
    const unfoldedSprings = [1, 2, 3, 4, 5].map(() => springs).join("?");
    const unfoldedPattern = [1, 2, 3, 4, 5].flatMap(() => pattern);
    const count = memoCountCombinations(unfoldedSprings, unfoldedPattern);
    console.log(unfoldedSprings, count);
    solution2 += count;
  }

  return solution2;
}

const memo = {};
function memoCountCombinations(springs, pattern, level = 0) {
  const key = `${springs}-${pattern.join(",")}`;
  if (memo[key] !== undefined) {
    return memo[key];
  }

  const count = countCombinations(springs, pattern, level);
  memo[key] = count;
  return count;
}

function countCombinations(springs, pattern, level = 0) {
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

// 1493340882140
