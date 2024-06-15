import { FILE_EXTENSION_REGEX, URL_SEGMENTS_REGEX } from "./constants/regex";
import { RawData } from "./types/data.type";

export class Transformer {
  transformData(rawData: RawData) {
    const rootObj = {};

    for (let item of rawData.items) {
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

    return JSON.stringify(this.objectToArrays(rootObj));
  }

  private pathStringToObject(
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

  private objectToArrays(obj: any): any {
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

  // To check if path leads to a file (and not folder) you can use this function. If path is ending with segment that has dot and three or four letter characters at the end it is very likely that it is a file.
  // This hypothesis could be tested further by testing ending characters against the list of known file extensions.
  private isFileName(str: string) {
    return FILE_EXTENSION_REGEX.test(str);
  }
}
