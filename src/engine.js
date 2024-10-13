import path from "node:path";
import fs from "node:fs/promises";

import { errorHandler } from "./errorHandler.js";
import { output, validateArgs } from "./utils/index.js";

export class Engine {
  constructor(state) {
    this.state = state;
    this.errorHandler = errorHandler;
  }

  async handleAction(data) {
    const [action, ...actionArgs] = data.trim().split(" ");
    console.log(">>>> action", action);
    console.log(">>>> actionArgs", actionArgs);

    switch (action) {
      case "up": {
        if (!validateArgs(action, actionArgs)) {
          this.errorHandler.operationError();
          break;
        }
        const newDirName = path.resolve(this.state.dirName, "..");
        this.state.setDirName(newDirName);
        break;
      }
      case "cd": {
        // TEST: /home/foxygirl/workspace
        if (!validateArgs(action, actionArgs)) {
          this.errorHandler.operationError();
          break;
        }
        const pathStr = actionArgs[0];

        const newPath = path.resolve(this.state.dirName, pathStr);
        await fs.access(newPath);
        this.state.setDirName(newPath);

        break;
      }
      default: {
        this.errorHandler.inputError();
      }
    }

    output(this.state.getDirNameInfo());
  }

  async run(data) {
    try {
      await this.handleAction(data);
    } catch (err) {
      //   console.error(err.message);
      this.errorHandler.operationError();
      output(this.state.getDirNameInfo());
    }
  }
}
