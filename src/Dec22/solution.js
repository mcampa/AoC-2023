const fs = require("fs");

const memo = new Map();

function solution() {
  const bricks = fs
    .readFileSync(`${__dirname}/input.txt`, "utf8")
    .split("\n")
    .map((line) =>
      line
        .split("~")
        .map((b) => [...b.split(",").map(Number)])
        .sort((a, b) => a[2] - b[2])
    )
    .sort((a, b) => b[0][2] - a[0][2]);

  let time = Date.now();
  function fall(bricks, check) {
    let count = 0;
    for (let i = bricks.length - 1; i >= 0; i--) {
      const brick = bricks[i];
      const [[y1, x1, z1], [y2, x2, z2]] = brick;
      let moved = false;

      a: for (let dz = z1 - 1; dz > 0; dz--) {
        const movedBrickSet = getBrickSet([
          [y1, x1, dz],
          [y2, x2, dz + (z2 - z1)],
        ]);
        for (let j = i + 1; j < bricks.length; j++) {
          testBrick = bricks[j];
          if (
            testBrick !== brick &&
            (testBrick[0][2] >= z1 || testBrick[1][2] <= z2) &&
            doBlocksIntersect(movedBrickSet, testBrick)
          ) {
            break a;
          }
        }

        if (check) {
          return 1;
        }
        moved = true;
        brick[0][2] = dz;
        brick[1][2] = dz + (z2 - z1);
      }
      if (moved) {
        count++;
      }
    }

    return count;
  }

  while (fall(bricks) > 0) {}
  console.log("settled in", Date.now() - time);

  let part1 = 0;
  for (let brick of bricks) {
    const testBlocks = bricks.filter((b) => b !== brick);
    if (fall(testBlocks, true) === 0) {
      part1++;
    }
  }

  console.log("part1", part1);

  let part2 = 0;
  for (let brick of bricks) {
    part2 += fall(
      bricks.filter((b) => b !== brick).map((b) => [[...b[0]], [...b[1]]])
    );
  }

  console.log("part2", part2);
}

solution();

function getBrickSet(brick1) {
  const key = JSON.stringify(brick1);

  if (memo.has(key)) {
    return memo.get(key);
  }

  const set1 = new Set();
  for (
    let y = Math.min(brick1[0][0], brick1[1][0]);
    y <= Math.max(brick1[0][0], brick1[1][0]);
    y++
  ) {
    for (
      let x = Math.min(brick1[0][1], brick1[1][1]);
      x <= Math.max(brick1[0][1], brick1[1][1]);
      x++
    ) {
      for (let z = brick1[0][2]; z <= brick1[1][2]; z++) {
        set1.add(`${y},${x},${z}`);
      }
    }
  }
  memo.set(key, set1);

  return set1;
}

function doBlocksIntersect(set1, brick2) {
  for (
    let y = Math.min(brick2[0][0], brick2[1][0]);
    y <= Math.max(brick2[0][0], brick2[1][0]);
    y++
  ) {
    for (
      let x = Math.min(brick2[0][1], brick2[1][1]);
      x <= Math.max(brick2[0][1], brick2[1][1]);
      x++
    ) {
      for (let z = brick2[0][2]; z <= brick2[1][2]; z++) {
        if (set1.has(`${y},${x},${z}`)) {
          return true;
        }
      }
    }
  }

  return false;
}
