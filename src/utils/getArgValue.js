export const getArgValue = (arg) => {
  const result = arg.split("=");
  return result[1];
};
