import fs from "node:fs/promises";

export const list = async (folderPath) => {
  try {
    const folderContent = await fs.readdir(folderPath, { withFileTypes: true });

    const result = folderContent.map((file) => ({
      name: file.name,
      type: file.isDirectory() ? "directory" : "file",
    }));
    console.table(result);
  } catch (err) {
    throw new Error(`Error reading folder: ${err}`);
  }
};
