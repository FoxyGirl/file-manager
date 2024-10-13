import * as readline from "node:readline/promises";
import { homedir } from "os";

import { mainState } from "./mainState.js";
import { output, getArgValue } from "./utils/index.js";

import { app } from "./app.js";

app.init();
