const fs = require("fs");

const grid = fs
  .readFileSync(`${__dirname}/input.txt`, "utf8")
  .split("\n")
  .map((line) => line.split(""));

  
function solution() {
  const seen = new Set();
  const pq = [[0, 0, 0, 0, 0, 0]];

  while (pq.length > 0) {
    const [hl, r, c, dr, dc, n] = dequeue(pq);

    if (r === grid.length - 1 && c === grid[0].length - 1 && n >= 4) {
      return hl;
    }

    if (seen.has(`${r},${c},${dr},${dc},${n}`)) {
      continue;
    }

    seen.add(`${r},${c},${dr},${dc},${n}`);

    if (n < 10 && (dr !== 0 || dc !== 0)) {
      const nr = r + dr;
      const nc = c + dc;

      if (nr >= 0 && nr < grid.length && nc >= 0 && nc < grid[0].length) {
        pq.push([hl + Number(grid[nr][nc]), nr, nc, dr, dc, n + 1]);
      }
    }

    if (n < 4 && (dr !== 0 || dc !== 0)) {
      continue;
    }

    const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];

    for (const [ndr, ndc] of directions) {
      if ((ndr !== dr || ndc !== dc) && (ndr !== -dr || ndc !== -dc)) {
        const nr = r + ndr;
        const nc = c + ndc;

        if (nr >= 0 && nr < grid.length && nc >= 0 && nc < grid[0].length) {
          pq.push([hl + Number(grid[nr][nc]), nr, nc, ndr, ndc, 1]);
        }
      }
    }
  }
}

function dequeue(queue) {
  let minHeat = Infinity;
  let minHeatIndex = 0;
  for (let i = 0; i < queue.length; i++) {
    if (queue[i][0] < minHeat) {
      minHeat = queue[i][0];
      minHeatIndex = i;
    }
  }
  return queue.splice(minHeatIndex, 1)[0];
}


console.log(solution());
