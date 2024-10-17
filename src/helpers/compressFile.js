import { createReadStream, createWriteStream } from "fs";
import { createBrotliCompress, createBrotliDecompress } from "zlib";
import path from "path";
import { pipeline } from "stream";
import { promisify } from "util";

const pipelineAsync = promisify(pipeline);

export const compressFile = async (source, destination) => {
  const readStream = createReadStream(source);
  const writeStream = createWriteStream(destination);
  const brotli = createBrotliCompress();

  try {
    await pipelineAsync(readStream, brotli, writeStream);
  } catch (err) {
    throw new Error(`Error compressing file: ${err.message}`);
  }
};

export const decompressFile = async (source, destination) => {
  const readStream = createReadStream(source);
  const writeStream = createWriteStream(destination);
  const brotli = createBrotliDecompress();

  try {
    await pipelineAsync(readStream, brotli, writeStream);
  } catch (err) {
    throw new Error(`Error decompressing file: ${err.message}`);
  }
};
