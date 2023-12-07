const fs = require('fs');

function solution() {
  const games = fs.readFileSync(`${__dirname}/input.txt`, 'utf8').split('\n');
  const scratchboardCount = {};

  for (game of games)  {
    const [_, cardString, winningNumbersString, myNumbersString] = game.match(/^Card\s+(\d+):\s+(.+)\s+\|\s+(.+)$/);
    const card = parseInt(cardString);
    const winningNumbers = new Set(winningNumbersString.split(/\s+/).map(n => parseInt(n)));
    const myNumbers = myNumbersString.split(/\s+/).map(n => parseInt(n));
    const wins = myNumbers.reduce((result, number) => result + (winningNumbers.has(number) ? 1 : 0), 0);

    scratchboardCount[card] = (scratchboardCount[card] ?? 0) + 1;

    for (let x = 0; x < scratchboardCount[card]; x++) {
      for (let i = card + 1; i <= card + wins; i++) {
        if (i <= games.length) {
          scratchboardCount[i] = (scratchboardCount[i] ?? 0) + 1;
        }
      }
    }
  }

  console.log(scratchboardCount);

  return Object.values(scratchboardCount).reduce((result, count) => result + count, 0);
}

console.log(solution());
