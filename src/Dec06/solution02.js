const fs = require("fs");


function solution() {
  const document = fs
    .readFileSync(`${__dirname}/input.txt`, "utf8")
    .split("\n");

  let time;
  let distanceRecord;

  for (line of document) {
    if (line.startsWith("Time:")) {
      const [_, timesString] = /Time:\s+(.+)/.exec(line);
      time = Number(timesString.replaceAll(/\s+/g, ''));
    }
    if (line.startsWith("Distance:")) {
      const [_, distancesString] = /Distance:\s+(.+)/.exec(line);
      distanceRecord = Number(distancesString.replaceAll(/\s+/g, ''));
    }
  }

  let posibilities = 0;

  for (let ms = 0; ms < time; ms++) {
    const timeLeft = time - ms;
    const distance = ms * timeLeft;
    if (distance > distanceRecord) {
      posibilities += 1;
    }
  }

  return posibilities;
}


console.log(solution());
