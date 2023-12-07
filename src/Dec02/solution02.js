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

  for await (const line of rl) {
    const [_, gameIdString, bagsStrings] = line.split(/Game (\d+):/);
    if (!gameIdString) {
      continue
    }

    const gameId = parseInt(gameIdString);
    const maxCubes = {
      red: 0,
      green: 0,
      blue: 0,
    };

    for (bagString of bagsStrings.split(';')) {
      for (cubeString of bagString.split(',')) {
        const [countString, color] = cubeString.trim().split(' ');
        const count = parseInt(countString);
        maxCubes[color] = Math.max(maxCubes[color], count);
      }
    }

    console.log(gameId, maxCubes, maxCubes.red * maxCubes.green * maxCubes.blue);

    sum += maxCubes.red * maxCubes.green * maxCubes.blue;
  }
  console.log(`answer: ${sum}`);
}

solution();