const fs = require("fs");
const chalk = require("chalk");

function solution() {
  const input = fs.readFileSync(`${__dirname}/input.txt`, "utf8").split("\n");
  const modules = input.reduce((acc, line) => {
    const [moduleName, destinations] = line.split(" -> ");
    const type =
      moduleName === "broadcaster"
        ? "Broadcaster"
        : moduleName.startsWith("%")
        ? "FlipFlop"
        : "Conjunction";

    acc[moduleName.replace(/[&|%]/, "")] = {
      type,
      destinations: destinations.split(", "),
    };
    return acc;
  }, {});

  const output = {
    high: 0,
    low: 0,
    rxPressed: false,
  };

  const state = {};

  function initializeState() {
    for (let [moduleName, { type }] of Object.entries(modules)) {
      if (type === "FlipFlop" || type === "Conjunction") {
        moduleState = {};
        Object.entries(modules)
          .filter(([, m]) => m.destinations.includes(moduleName))
          .forEach(([inputName]) => {
            moduleState[inputName] = false;
          });

        state[moduleName] = moduleState;
      }
    }
  }

  function pressButton() {
    // console.log("")
    const stack = [["broadcaster", false, "button"]];
    while (stack.length > 0) {
      const [moduleName, pulse, inputName] = stack.shift();
      let outputPulse = pulse;

      if (moduleName === "rx" && pulse === false) {
        output.rxPressed = true;
        break;
      }

      if (!modules[moduleName]) {
        continue;
      }

      const module = modules[moduleName];

      if (module.type === "FlipFlop") {
        const flipFlopState = !!state[moduleName][inputName];
        if (outputPulse === true) {
          continue;
        }
        state[moduleName][inputName] = !flipFlopState;
        outputPulse = !flipFlopState;
      }

      if (module.type === "Conjunction") {
        state[moduleName][inputName] = outputPulse;
        outputPulse = !Object.values(state[moduleName]).every(value => value);
      }

      for (let destination of module.destinations) {
        stack.push([destination, outputPulse, moduleName]);
        // console.log(moduleName, outputPulse ? '-high->' : '-low->', destination);
        if (outputPulse) {
          output.high++;
        } else {
          output.low++;
        }
      }
    }
  }

  // Initialize state
  initializeState();

  for (let i = 0; i < 1000; i++) {
    output.low++;
    pressButton();
  }

  console.log("part1", output.low * output.high);

  // Re-initialize state
  initializeState();

  let part2 = 1;
  while (!output.rxPressed) {
    pressButton();
    part2++;

    if (part2 % 10000000 === 0) {
      process.stdout.write(".");
    }
  }

  console.log("part2", part2);
}

solution();
