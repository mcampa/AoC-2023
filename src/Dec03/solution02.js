const fs = require('fs');

async function solution() {
  const fileContent = fs.readFileSync(`${__dirname}/input.txt`, 'utf8');
  const matrix = fileContent.split('\n').map(line => line.split(''));
  let sum = 0;
  const gearMap = {};

  for (let i = 0; i < matrix.length; i++) {
    const row = matrix[i];
    for (let j = 0; j < row.length; j++) {
      const element = row[j];
      // Find the first digit
      if (/[0-9]/.test(element)) {
        let numberString = element;

        // Find the rest of the digits
        for (let k = j + 1; k < row.length; k++) {
          if (!/[0-9]/.test(row[k])) {
            break;
          }
          numberString += row[k];
        }

        let symbolFound = false;
        // Check the row above and below for symbols
        for (let y = Math.max(0, i - 1); y <= Math.min(matrix.length - 1, i + 1); y++) {
          for (let x = Math.max(0, j - 1); x <= Math.min(matrix[y].length - 1, j + numberString.length); x++) {
            if (/[^0-9.]+/.test(matrix[y][x]) && !symbolFound) {
              sum += parseInt(numberString);
              symbolFound = true;
            }
            if (matrix[y][x] === '*') {
              const gearKey = `${x},${y}`;
              gearMap[gearKey] = [...(gearMap[gearKey] ?? []), parseInt(numberString)];
            }
          }
        }

        // Advance to the end of the number
        j += numberString.length;
      }
    }
  }
  console.log('Answer 1', sum, 'Answer 2',  Object.values(gearMap)
    .filter(values => values.length > 1)
    .reduce((acc, values) => acc + values[0] * values[1], 0));
  // 535078 75312571
}

solution();