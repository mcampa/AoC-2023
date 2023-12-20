const fs = require("fs");
const chalk = require("chalk");

const ruleStatementRegex = /^([a-z])([>|<])([\d]+):(.+)$/;

function solution() {
  const input = fs.readFileSync(`${__dirname}/input.txt`, "utf8");

  const [workflows] = input
    .split("\n\n")
    .map((part) => part.split("\n"));

  const workflowsMap = workflows.reduce((acc, workflow) => {
    const [_, name, steps] = workflow.match(/^([a-z]+)\{(.+)\}$/);
    acc[name] = steps.split(",");
    return acc;
  }, {});

  function checkRanges(ranges, workflowName, workflowStep = 0) {
    if (workflowName === 'A') {
      return Object.values(ranges).reduce((acc, [min, max]) => acc * (max - min + 1), 1);
    } else if (workflowName === 'R') {
      return 0;
    }

    const rule = workflowsMap[workflowName][workflowStep];
    const statementMatch = rule.match(ruleStatementRegex);

    if (statementMatch) {
      const [_, key, operator, stringValue, destination] = rule.match(ruleStatementRegex);
      const value = Number(stringValue);
  
      const [min, max] = ranges[key];
      
      if (operator === "<") {
        return checkRanges({ ...ranges, [key]: [min, value - 1] }, destination, 0) +
        checkRanges({ ...ranges, [key]: [value, max] }, workflowName, workflowStep + 1);
      } else {
        return checkRanges({ ...ranges, [key]: [value + 1, max] }, destination, 0) +
        checkRanges({ ...ranges, [key]: [min, value] }, workflowName, workflowStep + 1);
      }
    } else {
      return checkRanges(ranges, rule, 0);
    }
  }

  console.log({
    part2: checkRanges({
      x: [1, 4000],
      m: [1, 4000],
      a: [1, 4000],
      s: [1, 4000],
    }, 'in'),
  });
}

solution();
