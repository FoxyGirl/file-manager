import path from "node:path";
import fs from "node:fs/promises";

import { errorHandler } from "./errorHandler.js";
import { output, validateArgs } from "./utils/index.js";
import { ACTIONS } from "./constants.js";

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
      case ACTIONS.UP: {
        if (!validateArgs(action, actionArgs)) {
          this.errorHandler.inputError();
          break;
        }
        const newDirName = path.resolve(this.state.dirName, "..");
        this.state.setDirName(newDirName);
        break;
      }
      case ACTIONS.CD: {
        // TEST: /home/foxygirl/workspace
        if (!validateArgs(action, actionArgs)) {
          this.errorHandler.inputError();
          break;
        }
        const pathStr = actionArgs[0];

        const newPath = path.resolve(this.state.dirName, pathStr);
        await fs.access(newPath);
        this.state.setDirName(newPath);
        break;
      }
      case ACTIONS.LIST: {
        if (!validateArgs(action, actionArgs)) {
          this.errorHandler.inputError();
          break;
        }
        const files = await fs.readdir(this.state.dirName);
        // TODO: refactor output as a table
        output(files.join(" ||  \n"));

        break;
      }
      case ACTIONS.RM: {
        if (!validateArgs(action, actionArgs)) {
          this.errorHandler.inputError();
          break;
        }
        const pathStr = actionArgs[0];

        const newPath = pathStr.startsWith("/")
          ? path.resolve(pathStr)
          : path.resolve(this.state.dirName, pathStr);

        await fs.access(newPath);
        await fs.rm(newPath);
        // TEST zdelete.txt
        // TEST /home/foxygirl/zdelete.txt
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
