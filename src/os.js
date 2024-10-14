import os from "node:os";
import { errorHandler } from "./errorHandler.js";

export const osHandler = (argument) => {
  let result = "";

  switch (argument) {
    case "--EOL": {
      result = JSON.stringify(os.EOL);
      break;
    }
    case "--cpus": {
      const cpus = os.cpus();

      const cpusInfo = cpus.map(
        (cpu, index) =>
          `CPU ${index + 1}: Model: ${cpu.model}, Speed: ${(
            cpu.speed / 1000
          ).toFixed(2)} GHz`
      );
      result = `Total CPUs: ${cpus.length} \n${cpusInfo.join("\n")}`;
      break;
    }
    case "--homedir": {
      result = os.homedir();
      break;
    }
    case "--username": {
      result = os.userInfo().username;
      break;
    }
    case "--architecture": {
      result = os.arch();
      break;
    }

    default: {
      errorHandler.inputError();
    }
  }

  return result;
};
