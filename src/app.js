import * as readline from "node:readline/promises";
import { homedir } from "os";

import { mainState } from "./mainState.js";
import { output, getArgValue } from "./utils/index.js";

class App {
  constructor() {
    this.state = mainState;
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

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.prompt();

    rl.on("line", (data) => {
      switch (data) {
        case ".exit": {
          output(this.state.sayGoodBye());

          rl.close();
          break;
        }
        default: {
          output("Invalid input");
          output(this.state.getDirNameInfo());
        }
      }
    });
  }
}

export const app = new App();
