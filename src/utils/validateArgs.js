export const validateArgs = (action, actionArgs) => {
  let isValid = false;

  switch (action) {
    case "up": {
      if (!actionArgs.length) {
        isValid = true;
      }
      break;
    }
    case "cd": {
      if (actionArgs.length === 1 && !!actionArgs[0]) {
        isValid = true;
      }
      break;
    }

    default: {
      isValid = false;
    }
  }

  //   console.error("=== isValid", isValid);

  return isValid;
};
