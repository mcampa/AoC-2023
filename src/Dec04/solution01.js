const fs = require('fs');

function solution() {
  const fileContent = fs.readFileSync(`${__dirname}/input.txt`, 'utf8');
  const games = fileContent.split('\n').map(line => {
    // console.log('d', line);
    const [_, card, winningNumbers, myNumbers] = line.match(/^Card\s+(\d+)\: (.+) \| (.+)$/);
    return { 
      card,
      winningNumbers: winningNumbers.replaceAll('  ', ' ').trim().split(' ').map(n => parseInt(n.trim())),
      myNumbers: myNumbers.trim().replaceAll('  ', ' ').split(' ').map(n => parseInt(n.trim()))
    }
  });

  // console.log(fileContent);
  
  return games.reduce((result, game) => {
    let points = 0;
    game.myNumbers.forEach(number => {
      if (game.winningNumbers.includes(number)) {
        if (points === 0) {
          points = 1;
        } else {
          points *= 2;
        }
      }
    });
    console.log(game, 'Points', points);
    return result + points;
  }, 0)
}

console.log(solution());