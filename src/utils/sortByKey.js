export const sortByKey =
  (key = "name") =>
  (a, b) =>
    a[key] > b[key] ? 1 : -1;
