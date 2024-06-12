import * as fs from "fs";

import axios from "axios";
import { ResourceTypeEnum } from "./enums/ResourceTypeEnum";
import { FILE_EXTENSION_REGEX, URL_SEGMENTS_REGEX } from "./constants/regex";

// TEST To make sure that hypothesis about data: that all paths will be either to folders, or to files we check that number of all paths is equal to number of paths that point to files and number of paths that point to folders
// const dataItemsNumber = data.items.length;
// let files = 0;
// let folders = 0;

// for (const fileUrl of data.items) {
//   if (isFileName(fileUrl.fileUrl)) {
//     files++;
//   } else {
//     folders++;
//   }
// }
// console.table({
//   dataItemsNumber,
//   files,
//   folders,
//   sum: files + folders,
//   equal: dataItemsNumber === files + folders,
// });
// ===END OF TEST
type Data = { items: [{ fileUrl: string }] };

export class Transformer {
  partialDataFilePath = "./test-data-partial.json";
  fullDataFilePath = "./test-data-full.json";

  async transformData() {
    const data: Data = await this.getData(
      ResourceTypeEnum.FILE_SYSTEM,
      this.fullDataFilePath
    );
    const rootObj = {};

    for (let item of data.items) {
      const pathString = item.fileUrl;
      const pathSegments = pathString.match(URL_SEGMENTS_REGEX);
      if (!pathSegments) {
        // Here we can create some document to store all strings that didn't match the regex in order to test regex and validate strings and not crash application
        // We could also decouple this to some kind of validator
        console.warn(
          `String ${pathString} get no matches from URL_SEGMENTS_REGEX. Either regex or string are not valid`
        );
        continue;
      }
      // index of the first pathSegment whose value isn't "http:"
      const firstIndex = 1;

      this.pathStringToObject(
        pathSegments[firstIndex],
        rootObj,
        pathSegments,
        firstIndex
      );
    }

    const writeData = JSON.stringify(this.objectToArrays(rootObj));
    fs.writeFile("data.json", writeData, (err) => {
      if (err) {
        console.error("Error writing file:", err);
      } else {
        console.log("File written successfully");
      }
    });
  }

  pathStringToObject(
    value: string,
    obj: Record<string, Record<any, any>>,
    segments: string[],
    i = 1
  ) {
    if (segments[i] === undefined) return;
    if (i === segments.length - 1) {
      if (this.isFileName(segments[i])) {
        if (Array.isArray(obj["files"])) {
          obj["files"].push(segments[i]);
        } else {
          obj["files"] = [];
          obj["files"].push(segments[i]);
        }
        return;
      }
    }

    if (!(value in obj)) {
      obj[value] = {};
    }
    this.pathStringToObject(segments[i + 1], obj[value], segments, ++i);
  }

  objectToArrays(obj: any): any {
    return Object.keys(obj).map((key) => {
      if (typeof obj[key] === "object" && !Array.isArray(obj[key])) {
        // Recursively transform nested objects
        return { [key]: this.objectToArrays(obj[key]) };
      } else if (Array.isArray(obj[key])) {
        // Directly map arrays
        return obj[key];
      } else {
        // Handle other types directly
        return { [key]: [] };
      }
    });
  }

  async getData(
    resourceType = ResourceTypeEnum.FILE_SYSTEM,
    filePath?: string
  ) {
    switch (resourceType) {
      case ResourceTypeEnum.FILE_SYSTEM:
        if (filePath == undefined) throw Error("File path must be defined");
        return JSON.parse(fs.readFileSync(filePath, "utf-8"));
      case ResourceTypeEnum.REMOTE_RESOURCE:
        //TODO: This is okay since data and resource are not confidential.
        // With confidential data use .env instead
        const res = await axios.get(
          "https://rest-test-eight.vercel.app/api/test"
        );
        return res.data;
    }
  }

  // To check if path leads to a file (and not folder) you can use this function. If path is ending with segment that has dot and three or four letter characters at the end it is very likely that it is a file.
  // This hypothesis could be tested further by testing ending characters against the list of known file extensions.
  isFileName(str: string) {
    return FILE_EXTENSION_REGEX.test(str);
  }
}

console.time("transforming");
const t = new Transformer();
t.transformData();
console.timeEnd("transforming");