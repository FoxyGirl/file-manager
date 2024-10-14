import crypto from "node:crypto";
import { createReadStream } from "node:fs";

export const calculateHash = async (filePath) => {
  try {
    const hash = crypto.createHash("sha256");
    const stream = createReadStream(filePath);

    return new Promise((resolve, reject) => {
      stream.on("data", (chunk) => hash.update(chunk));
      stream.on("end", () => resolve(hash.digest("hex")));
      stream.on("error", (err) => reject(`Error reading file: ${err}`));
    });
  } catch (err) {
    throw new Error(`Error calculating hash: ${err}`);
  }
};
