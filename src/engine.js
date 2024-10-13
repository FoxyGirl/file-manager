import * as path from "node:path";

import { errorHandler } from "./errorHandler.js";
import { output, getArgValue } from "./utils/index.js";

export class Engine {
  constructor(state) {
    this.state = state;
    this.errorHandler = errorHandler;
  }

  run(data) {
    switch (data) {
      case "up": {
        const newDirName = path.resolve(this.state.dirName, "..");
        this.state.setDirName(newDirName);
        break;
      }
      default: {
        this.errorHandler.inputError();
      }
    }

    output(this.state.getDirNameInfo());
  }
}
