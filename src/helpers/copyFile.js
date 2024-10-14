import path from "node:path";
import { createReadStream, createWriteStream } from "node:fs";

export const copyFile = async (sourcePath, destinationPath) => {
  let destinationPathToFile = destinationPath;

  const isPathWithoutFileName = destinationPath.endsWith(path.sep);

  if (isPathWithoutFileName) {
    const fileName = path.basename(sourcePath);
    destinationPathToFile = path.resolve(destinationPath, fileName);
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
