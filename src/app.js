import * as readline from "node:readline/promises";
import { homedir } from "node:os";
import * as path from "node:path";

import { mainState } from "./mainState.js";
import { errorHandler } from "./errorHandler.js";
import { output, getArgValue } from "./utils/index.js";

class App {
  constructor() {
    this.state = mainState;
    this.errorHandler = errorHandler;
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
      let isEndOfWork = false;

      switch (data) {
        case "up": {
          const newDirName = path.resolve(this.state.dirName, "..");
          this.state.setDirName(newDirName);
          break;
        }
        case ".exit": {
          output(this.state.sayGoodBye());

          rl.close();
          isEndOfWork = true;
          break;
        }
        default: {
          this.errorHandler.inputError();
        }
      }

      if (!isEndOfWork) {
        output(this.state.getDirNameInfo());
      }
    });
  }
}

export const app = new App();
