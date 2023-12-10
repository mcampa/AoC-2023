const fs = require("fs");

function solution() {
  const document = fs
    .readFileSync(`${__dirname}/input.txt`, "utf8")
    .split("\n");

  let results1 = [];
  let results2 = [];

  for (line of document) {
    const arr = line.split(" ").map(Number);

    const diffs = [arr];

    while (new Set(diffs.at(-1)).size > 1) {
      const current = diffs.at(-1);
      const diff = [];
      for (let i = 1; i < current.length; i++) {
        diff.push(current[i] - current[i - 1]);
      }
      diffs.push(diff);
    }

    let result1 = 0;
    let result2 = 0;

    for (let i = diffs.length - 1; i >= 0; i--) {
      result1 += diffs[i].at(-1);
      result2 = diffs[i].at(0) - result2;
    }

    results1.push(result1);
    results2.push(result2);
  }

  console.log(results1.reduce((acc, val) => acc + val));
  console.log(results2.reduce((acc, val) => acc + val));
}

solution();
