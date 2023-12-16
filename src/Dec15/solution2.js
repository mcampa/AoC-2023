const fs = require("fs");

function solution() {
  const input = fs
    .readFileSync(`${__dirname}/input.txt`, "utf8");

  const boxes = new Map(Array(256).fill().map((_, i) => [i, []]));

  for (let string of input.split(',')) {
    const [label, lens] = string.split(/[=-]/);
    const box = boxes.get(hash(label));

    const index = box.findIndex(item => item.startsWith(label));
    if (lens) {
      if (index >= 0) {
        box[index] = `${label} ${lens}`;
      } else {
        box.push(`${label} ${lens}`);
      }
    } else if (index >= 0) {
      box.splice(index, 1);
    }
  }

  let total = 0;
  for (let i = 0; i < 256; i++) {
    const box = boxes.get(i);
    // console.log(`box ${i}`)
    for (let p = 0; p < box.length; p++) {
      const [, lens] = box[p].split(' ');
      const focalLength = parseInt(lens, 10);
      const slot = p + 1;
      // console.log('  ', box[p], { focalLength, slot })
      total += (i + 1) * focalLength * slot;
    }
  }

  return total;
}

console.log(solution());


function hash(string) {
  let currentValue = 0;
  for (let i = 0; i < string.length; i++) {
    currentValue += string.charCodeAt(i);
    currentValue *= 17;
    currentValue %= 256;
  }
  return currentValue;
}
