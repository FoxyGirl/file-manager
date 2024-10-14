import { createReadStream, createWriteStream } from "fs";

export const copyFile = async (sourcePath, destinationPath) => {
  const readStream = createReadStream(sourcePath);
  const writeStream = createWriteStream(destinationPath);

  return new Promise((resolve, reject) => {
    readStream.on("error", reject);
    writeStream.on("error", reject);
    writeStream.on("finish", resolve);

    readStream.pipe(writeStream);
  });
};
