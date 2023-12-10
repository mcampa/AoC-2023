const fs = require("fs");

const regex = /^([A-Z]{3}) = \(([A-Z]{3}), ([A-Z]{3})\)$/;
class Node {
  constructor(value, left, right) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

function solution() {
  const document = fs
    .readFileSync(`${__dirname}/input.txt`, "utf8")
    .split("\n");

  let pattern = '';
  const nodes = new Map()

  for (line of document) {
    if (!pattern) {
      pattern = line;
    }

    const match = regex.exec(line);

    if (match) {
      const [_, value, left, right] = match;
      const node = new Node(value, left, right);
      nodes.set(value, node);
    }
  }

  let current = nodes.get('AAA');
  let end = false;
  let count = 0;
  while (!end)  {
    for (let i = 0; i < pattern.length; i++) {
      if (current.value === 'ZZZ') {
        end = true;
        break;
      }

      count++;

      const direction = pattern[i];
      nextValue = direction === 'L' ? current.left : current.right;
      // console.log(current.value, direction, nextValue);
      current = nodes.get(nextValue);

      if (!current) {
        throw new Error("What?")
      }
    }
  }

  return count;

}

console.log(solution());
