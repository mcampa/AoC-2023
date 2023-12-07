const readline = require('readline');
const fs = require('fs');
const { parse } = require('path');

maxCubes = {
  red: 12,
  green: 13,
  blue: 14,
};

async function solution() {
  const fileStream = fs.createReadStream(`${__dirname}/input.txt`);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  let sum = 0;

  const posibleGames = [];

  for await (const line of rl) {
    const [_, gameIdString, bagsStrings] = line.split(/Game (\d+):/);
    if (!gameIdString) {
      continue
    }

    const gameId = parseInt(gameIdString);

    let isPossible = true;
    loop1: for (bagString of bagsStrings.split(';')) {
      for (cubeString of bagString.split(',')) {
        const [count, color] = cubeString.trim().split(' ');
        if (parseInt(count) > maxCubes[color]) {
          console.log(`\nGame ${gameId} with ${bagsStrings}\nis not possible because there are too many ${color} cubes in the bag. Max: ${maxCubes[color]}, actual: ${count}`);
          isPossible = false;
          break loop1;
        }
      }
    }

    if (isPossible) {
      sum += gameId;
      posibleGames.push(gameId);
    }
  }
  console.log(posibleGames, `answer: ${sum}`);
}

solution();