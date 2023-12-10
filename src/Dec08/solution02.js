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
  const nodes = new Map();

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
  console.log(15746133679061 - 184637000000)
  let startNodes = [...nodes.values()].filter((n) => n.value.endsWith('A'));

  // Least Common Multiple
  const gcd = (a, b) => a ? gcd(b % a, a) : b;
  const lcm = (a, b) => a * b / gcd(a, b);

  return startNodes.map((current) => getSteps(current, nodes, pattern)).reduce(lcm);
}

function getSteps(current, nodes, pattern) {
  let end = false;
  let count = 0;
  while (!end)  {
    for (let i = 0; i < pattern.length; i++) {
      if (current.value.endsWith('Z')) {
        end = true;
        break;
      }

      count++;

      const direction = pattern[i];
      nextValue = direction === 'L' ? current.left : current.right;
      // console.log(current.value, direction, nextValue)
      current = nodes.get(nextValue);

      if (!current) {
        throw new Error("What?")
      }
    }
  }

  return count;
}

console.log(solution());

