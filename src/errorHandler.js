import { output } from "./utils/index.js";

class ErrorHandler {
  constructor() {}

  inputError() {
    output("Invalid input");
  }

  operationError() {
    output("Operation failed");
  }
}

export const errorHandler = new ErrorHandler();
