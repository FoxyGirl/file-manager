import path from "node:path";
import fs from "node:fs/promises";

import { errorHandler } from "./errorHandler.js";
import { output, validateArgs } from "./utils/index.js";
import { osHandler } from "./helpers/os.js";
import { calculateHash } from "./helpers/calculateHash.js";
import { list } from "./helpers/list.js";
import { readFile } from "./helpers/readFile.js";
import { copyFile } from "./helpers/copyFile.js";
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

        await list(this.state.dirName);

        break;
      }

      case ACTIONS.CAT: {
        if (!validateArgs(action, actionArgs)) {
          this.errorHandler.inputError();
          break;
        }

        const pathStr = actionArgs[0];

        const sourcePath = pathStr.startsWith("/")
          ? path.resolve(pathStr)
          : path.resolve(this.state.dirName, pathStr);

        await readFile(sourcePath).then((data) => output(data));
        break;
      }

      case ACTIONS.CP: {
        if (!validateArgs(action, actionArgs)) {
          this.errorHandler.inputError();
          break;
        }

        const [sourcePath, destinationPath] = actionArgs;

        await fs.access(sourcePath);
        // TEST: cp /home/foxygirl/zz.txt /home/foxygirl/workspace/

        await copyFile(sourcePath, destinationPath);
        break;
      }

      case ACTIONS.MV: {
        if (!validateArgs(action, actionArgs)) {
          this.errorHandler.inputError();
          break;
        }

        const [sourcePath, destinationPath] = actionArgs;

        await fs.access(sourcePath);
        // TEST: mv /home/foxygirl/zz.txt /home/foxygirl/workspace/
        // TEST: mv /home/foxygirl/zz.txt /home/foxygirl/workspace/22.txt

        await copyFile(sourcePath, destinationPath);
        await fs.rm(sourcePath);
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

      case ACTIONS.ADD: {
        if (!validateArgs(action, actionArgs)) {
          this.errorHandler.inputError();
          break;
        }
        const pathStr = actionArgs[0];
        const newPath = path.resolve(this.state.dirName, pathStr);

        await fs.writeFile(newPath, "", { flag: "wx" });
        // TEST 111.txt
        break;
      }

      case ACTIONS.RN: {
        if (!validateArgs(action, actionArgs)) {
          this.errorHandler.inputError();
          break;
        }
        const [pathToFile, newPathToFile] = actionArgs;
        const sourcePath = path.resolve(this.state.dirName, pathToFile);
        const newPath = path.resolve(this.state.dirName, newPathToFile);

        await fs.access(sourcePath);
        await fs.rename(sourcePath, newPath);
        break;
      }

      case ACTIONS.HASH: {
        if (!validateArgs(action, actionArgs)) {
          this.errorHandler.inputError();
          break;
        }
        const pathStr = actionArgs[0];

        const sourcePath = pathStr.startsWith("/")
          ? path.resolve(pathStr)
          : path.resolve(this.state.dirName, pathStr);

        await fs.access(sourcePath);
        await calculateHash(sourcePath)
          .then((hash) => output(hash))
          .catch((err) => {
            throw new Error(err.message);
          });
        break;
      }

      case ACTIONS.OS: {
        if (!validateArgs(action, actionArgs)) {
          this.errorHandler.inputError();
          break;
        }

        const result = osHandler(actionArgs[0]);
        if (result) {
          output(result);
        }
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
      console.error(err.message);
      this.errorHandler.operationError();
      output(this.state.getDirNameInfo());
    }
  }
}
