import * as fs from "fs";

const partialDataFilePath = "./test-data-partial.json";
const fullDataFilePath = "./test-data-full.json";

const data = getData(partialDataFilePath);

function getData(filePath: string) {
  return fs.readFileSync(filePath, "utf-8");
}

console.log(data);
