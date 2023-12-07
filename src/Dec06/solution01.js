const fs = require("fs");


function solution() {
  const document = fs
    .readFileSync(`${__dirname}/input.txt`, "utf8")
    .split("\n");

  let times = [];
  let distanceRecords = [];

  for (line of document) {
    if (line.startsWith("Time:")) {
      const [_, timesString] = /Time:\s+(.+)/.exec(line);
      times = timesString.split(/\s+/).map(Number);
    }
    if (line.startsWith("Distance:")) {
      const [_, distancesString] = /Distance:\s+(.+)/.exec(line);
      distanceRecords = distancesString.split(/\s+/).map(Number);
    }
  }

  if (times.length !== distanceRecords.length) {
    throw new Error("Times and distances should have the same length");
  }

  const posibilities = []

  for (let i = 0; i < times.length; i++) {
    const time = times[i];
    const record = distanceRecords[i];
    posibilities[i] = 0;
    for (let ms = 0; ms < time; ms++) {
      const timeLeft = time - ms;
      const distance = ms * timeLeft;
      if (distance > record) {
        posibilities[i] += 1;
      }
    }
  }


  console.log({ posibilities });
  return posibilities. length > 0 ? posibilities.reduce((a, b) => a * b, 1) : 0;
}


console.log(solution());
