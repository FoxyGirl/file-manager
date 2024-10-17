import fs from "node:fs/promises";

import { sortByKey } from "../utils/index.js";

export const list = async (folderPath) => {
  try {
    const folderContent = await fs.readdir(folderPath, { withFileTypes: true });

    const result = folderContent
      .map((file) => ({
        name: file.name,
        type: file.isDirectory() ? "directory" : "file",
      }))
      .reduce(
        (acc, item) => {
          if (item.type === "directory") {
            return {
              ...acc,
              directories: [...acc.directories, item],
            };
          } else {
            return {
              ...acc,
              files: [...acc.files, item],
            };
          }
        },
        { files: [], directories: [] }
      );
    console.log(result);

    const normalizedResult = [
      ...result.directories.sort(sortByKey()),
      ...result.files.sort(sortByKey()),
    ];
    console.table(normalizedResult);
  } catch (err) {
    throw new Error(`Error reading folder: ${err}`);
  }
};
