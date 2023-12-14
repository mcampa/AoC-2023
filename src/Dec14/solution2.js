const fs = require("fs");

function solution() {
  const dish = fs
    .readFileSync(`${__dirname}/input.txt`, "utf8")
    .split("\n")
    .map((p) => p.split(""));

  const cycleDetection = new Map();

  for (let i = 0; i < 1000000000; i++) {
    cycle(dish);
    const key = dish.map((p) => p.join("")).join("");
    if (cycleDetection.has(key)) {
      console.log("cycle detected at", cycleDetection.get(key), i);
      const cycleLength = i - cycleDetection.get(key);
      const remaining = 1000000000 - i;
      const remainingCycles = Math.floor(remaining / cycleLength);
      i += remainingCycles * cycleLength;
    }

    cycleDetection.set(key, i);

    // dish.forEach((line) => console.log(line.join('')));

    if (i % 10000000 === 0) {
      process.stdout.write(".");
    }
  }

  let total = 0;
  for (let i = 0; i < dish.length; i++) {
    const count = dish[i].filter((p) => p === "O").length;
    total += count * (dish.length - i);
  }

  return total;
}

function rollLine(line) {
  let anchor = line.length;

  for (let i = line.length - 1; i >= 0; i--) {
    if (line[i] === ".") {
      continue;
    }

    if (line[i] === "#") {
      anchor = i;
      continue;
    }

    line[i] = ".";
    line[anchor - 1] = "O";
    anchor = anchor - 1;
  }
}

function cycle(dish) {
  for (let i = 0; i < 4; i++) {
    // dish.forEach((line) => console.log(line.join('')));
    // console.log('rotate')
    rotateClockwise(dish);
    // dish.forEach((line) => console.log(line.join('')));
    // console.log('roll')
    rollDish(dish);
  }
}

function rollDish(dish) {
  for (let i = 0; i < dish.length; i++) {
    rollLine(dish[i]);
  }
}

function rotateClockwise(a) {
  var n = a.length;
  for (var i = 0; i < n / 2; i++) {
    for (var j = i; j < n - i - 1; j++) {
      var tmp = a[i][j];
      a[i][j] = a[n - j - 1][i];
      a[n - j - 1][i] = a[n - i - 1][n - j - 1];
      a[n - i - 1][n - j - 1] = a[j][n - i - 1];
      a[j][n - i - 1] = tmp;
    }
  }
  return a;
}

console.log(solution());
