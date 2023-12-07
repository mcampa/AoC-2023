const readline = require('readline');
const fs = require('fs');

const words = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

async function solution() {
  const fileStream = fs.createReadStream(`${__dirname}/input.txt`);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  let sum = 0;

  for await (const line of rl) {
    let n = 0;
    loop1: for (let i = 0; i < line.length; i++) {
      const string = line.substring(i);
      for (let j = 0; j < words.length; j++) {
        if (string.startsWith(words[j]) || string.startsWith(`${j}`)) {
          n = j * 10;
          break loop1;
        }
      }
    }

    loop2: for (let i = line.length; i > 0; i--) {
      const string = line.substring(0, i);
      for (let j = 0; j < words.length; j++) {
        if (string.endsWith(words[j]) || string.endsWith(`${j}`)) {
          n += j;
          break loop2;
        }
      }
    }
    
    
    sum += n;
    console.log(`${line} -> ${n}`);
  }
  console.log(`TOTAL: ${sum}`);
}

solution();