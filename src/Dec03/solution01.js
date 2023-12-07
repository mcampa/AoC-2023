const fs = require('fs');

async function solution() {
  const fileContent = fs.readFileSync(`${__dirname}/input.txt`, 'utf8');
  const matrix = fileContent.split('\n').map(line => line.split(''));
  let sum = 0;

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

        // Check the row above and below for symbols
        for (let k = j - 1; k < j + numberString.length + 1; k++) {
          const testString = (matrix[i - 1]?.[k] || '.') + (matrix[i]?.[k] || '.') + (matrix[i + 1]?.[k] || '.');
          if (/[^0-9.]+/.test(testString)) {
            sum += parseInt(numberString);
            break;
          }
        }

        // Advance to the end of the number
        j += numberString.length;
      }
    }
  }
  console.log('Total', sum);
  // 535078
}

solution();