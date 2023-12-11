import { readFile } from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

export function readFileAsArrayBuffer(filePath) {
  return new Promise((resolve, reject) => {
    readFile(filePath, (err, data) => {
      if (err) {
        reject(err);
        console.error("读取文件时发生错误:", err);
      } else {
        resolve(data.buffer);
      }
    });
  });
}

export const getCurrentPath = (currentFileUrl) => {
  const currentFilePath = fileURLToPath(currentFileUrl);
  const currentDir = dirname(currentFilePath);
  return currentDir;
};
