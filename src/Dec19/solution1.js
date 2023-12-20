const fs = require("fs");
const chalk = require("chalk");

const stepStatementRegex = /^([a-z])([>|<])([\d]+):(.+)$/;

function solution() {
  const input = fs.readFileSync(`${__dirname}/input.txt`, "utf8");

  const [workflows, partRatings] = input
    .split("\n\n")
    .map((part) => part.split("\n"));

  // Compile workflows into list of functions
  const workflowsMap = workflows.reduce((acc, workflow) => {
    const [_, name, steps] = workflow.match(/^([a-z]+)\{(.+)\}$/);
    acc[name] = steps.split(",").map((step) => {
      const statementMatch = step.match(stepStatementRegex);

      if (statementMatch) {
        const [_, key, operator, stringValue, destination] = statementMatch;
        const value = Number(stringValue);
        return operator === "<"
          ? (values) => (values[key] < value ? destination : null)
          : (values) => (values[key] > value ? destination : null);
      }

      return (values) => step;
    });
    return acc;
  }, {});

  function checkPart(values) {
    let workflow = workflowsMap.in;
    let workflowIndex = 0;
    let accepted = false;

    while (workflow && workflowIndex < workflow.length) {
      const step = workflow[workflowIndex];
      let destination = step(values);

      if (!destination) {
        workflowIndex++;
        continue;
      }

      if (workflowsMap[destination]) {
        workflow = workflowsMap[destination];
        workflowIndex = 0;
        continue;
      }

      accepted = destination === "A";
      break;
    }

    return accepted;
  }

  let part1 = 0;
  for (part of partRatings) {
    const [_, valuesString] = part.match(/^\{(.+)\}$/);
    const values = valuesString.split(",").reduce((acc, p) => {
      const [key, value] = p.split("=");
      acc[key] = Number(value);
      return acc;
    }, {});

    if (checkPart(values, workflowsMap)) {
      part1 += Object.values(values).reduce((acc, value) => acc + value, 0);
    }
  }

  console.log({ part1 });
}

solution();
