import { createReadStream } from "node:fs";

export const readFile = async (filePath) => {
  try {
    const readStream = createReadStream(filePath, { encoding: "utf8" });

    let data = "";
    return new Promise((resolve, reject) => {
      readStream.on("data", (chunk) => (data += chunk));
      readStream.on("end", () => resolve(data));
      readStream.on("error", (err) => reject(`Error reading file: ${err}`));
    });
  } catch (err) {
    throw new Error(`Error reading file: ${err}`);
  }
};
