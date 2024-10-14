import { ACTIONS } from "../constants.js";

export const validateArgs = (action, actionArgs) => {
  let isValid = false;

  switch (action) {
    case ACTIONS.UP:
    case ACTIONS.LIST: {
      if (!actionArgs.length) {
        isValid = true;
      }
      break;
    }
    case ACTIONS.CD:
    case ACTIONS.CAT:
    case ACTIONS.RM:
    case ACTIONS.ADD:
    case ACTIONS.HASH:
    case ACTIONS.OS: {
      if (actionArgs.length === 1 && !!actionArgs[0]) {
        isValid = true;
      }
      break;
    }

    case ACTIONS.COMPRESS:
    case ACTIONS.DECOMPRESS:
    case ACTIONS.RN:
    case ACTIONS.CP:
    case ACTIONS.MV: {
      if (actionArgs.length === 2 && !!actionArgs[0] && !!actionArgs[1]) {
        isValid = true;
      }
      break;
    }
    default: {
      isValid = false;
    }
  }

  console.error("=== action", action);
  console.error("=== actionArgs", actionArgs);
  console.error("=== isValid", isValid);

  return isValid;
};
