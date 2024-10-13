import * as readline from "node:readline/promises";
import { homedir } from "os";

import { mainState } from "./mainState.js";
import { output, getArgValue } from "./utils/index.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.prompt();

// const vars = process.env;
// const result = Object.entries(vars);

const homeDir = homedir();
mainState.setDirName(homeDir);

const USERNAME_ARG = "--username";
const outArgs = process.argv;

const userArg = outArgs.find((item) => item.startsWith(USERNAME_ARG));

if (userArg) {
  mainState.setUserName(getArgValue(userArg));
}

output(mainState.getGreeting());
output(mainState.getDirNameInfo());

rl.on("line", (data) => {
  if (data === ".exit") {
    output(mainState.sayGoodBye());

    rl.close();
  }
});
