import path from "node:path";
import { stat } from "node:fs/promises";
import { createReadStream, createWriteStream } from "node:fs";

export const copyFile = async (sourcePath, destinationPath) => {
  let destinationPathToFile = destinationPath;
  const stats = await stat(destinationPath);

  if (stats.isDirectory()) {
    const fileName = path.basename(sourcePath);
    destinationPathToFile = path.resolve(destinationPathToFile, fileName);
  }

  const readStream = createReadStream(sourcePath);
  const writeStream = createWriteStream(destinationPathToFile);

  return new Promise((resolve, reject) => {
    readStream.on("error", reject);
    writeStream.on("error", reject);
    writeStream.on("finish", resolve);

    readStream.pipe(writeStream);
  });
};
