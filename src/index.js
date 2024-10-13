const vars = process.env;

const result = Object.entries(vars);
// const userName = result.find((item) => item[0] === "username");

const getArgValue = (arg) => {
  const result = arg.split("=");
  return result[1];
};

const USERNAME_ARG = "--username";
const outArgs = process.argv;
const userArg = outArgs.find((item) => item.includes(USERNAME_ARG));
const userName = userArg ? getArgValue(userArg) : "Anonymous";

// console.log("Hello result = ", result);
const greeting = `Welcome to the File Manager, ${userName}!`;
console.log(greeting);
process.stdin;
