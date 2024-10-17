import * as readline from "node:readline/promises";
import { homedir } from "node:os";

import { mainState } from "./mainState.js";
import { errorHandler } from "./errorHandler.js";
import { Engine } from "./engine.js";
import { output, getArgValue } from "./utils/index.js";

class App {
  constructor() {
    this.state = mainState;
    this.errorHandler = errorHandler;

    this.readline = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    this.engine = new Engine(this.state);
  }

  init() {
    const homeDir = homedir();
    this.state.setDirName(homeDir);

    const USERNAME_ARG = "--username";
    const outArgs = process.argv;

    const userArg = outArgs.find((item) => item.startsWith(USERNAME_ARG));

    if (userArg) {
      this.state.setUserName(getArgValue(userArg));
    }

    output(this.state.getGreeting());
    output(this.state.getDirNameInfo());

    this.readline.prompt();

    this.readline.on("line", (data) => {
      if (data === ".exit") {
        this.readline.close();
      } else {
        this.engine.run(data);
      }
    });

    this.readline.on("close", () => {
      output(this.state.sayGoodBye());
    });
  }
}

export const app = new App();
