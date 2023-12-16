const fs = require("fs");

function solution() {
  const input = fs
    .readFileSync(`${__dirname}/input.txt`, "utf8");

  let total = 0;

  console.log(input.split(',').length)

  for (let string of input.split(',')) {
    currentValue = 0;
    for (let i = 0; i < string.length; i++) {
      currentValue += string.charCodeAt(i);
      currentValue *= 17;
      currentValue %= 256;
    }
    console.log(string, currentValue);
    total += currentValue;
  }

  return total;
}

console.log(solution());

