const fs = require("fs");

function solution() {
  const dish = fs
    .readFileSync(`${__dirname}/input.txt`, "utf8")
    .split("\n")
    .map((p) => p.split(""));

  for (let r = 1; r < dish.length; r++) {
    for (let c = 0; c < dish[r].length; c++) {
      if (dish[r][c] !== "O") {
        continue;
      }

      let upPos = null;
      for (let up = r - 1; up >= 0; up--) {
        if (dish[up][c] !== ".") {
          break;
        }
        upPos = up;
      }

      if (upPos !== null) {
        dish[upPos][c] = "O";
        dish[r][c] = ".";
      }
    }
  }

  let total = 0;
  for (let i = 0; i < dish.length; i++) {
    const count = dish[i].filter((p) => p === "O").length;
    total += count * (dish.length - i);
  }

  return total;
}

console.log(solution());
