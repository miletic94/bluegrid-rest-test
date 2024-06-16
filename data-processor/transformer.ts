import { ArrayMap } from "./ArrayMap";
import { FILE_EXTENSION_REGEX, URL_SEGMENTS_REGEX } from "./constants/regex";
import { RawData, Result } from "./types/data.type";

export class Transformer {
  /**
   * Transforms raw data into a structured ArrayMap representation and then into a result data format.
   *
   * @param {RawData} rawData - The raw data of type {@link RawData } to transform.
   * @returns The transformed result data.
   */
  transformRawData(rawData: RawData) {
    console.log("Transforming data to arrayMap object");
    // rootArrayMap object where final result will be stored
    const rootObj = new ArrayMap("root", [], new Map());

    for (let item of rawData.items) {
      const urlString = item.fileUrl;
      const urlSegments = urlString.match(URL_SEGMENTS_REGEX);
      if (!urlSegments) {
        // Here we can create some document to store all strings that didn't match the regex in order to test regex and validate strings and not crash application
        // We could also decouple this to some kind of validator
        console.warn(
          `String ${urlString} get no matches from URL_SEGMENTS_REGEX. Either regex or string are not valid`
        );
        continue;
      }
      // index of the first urlSegment whose value isn't "http:"
      const firstIndex = 1;

      this.segmentsToArrayMap(rootObj, urlSegments, firstIndex);
    }

    // If we wanted to make it easier to add new data, we could return rootObj here
    // That way we would save ArrayMap object, that is designed to make writing new data efficient
    // Then we would transform data with transformArrayMapToResultData while receiving data. That would save some memory, but it would also make API a bit slower.
    return rootObj;
  }

  /**
   * Converts segments of a url into an ArrayMap structure.
   *
   * @param {ArrayMap} arrayMap - The {@link ArrayMap} to populate with segments.
   * @param {string[]} segments - Array of the segments of the url to convert.
   * @param i - The current index in the segments array (default is 1).
   *
   * @remarks
   * This function is used to recursively transform segments of url into an ArrayMap structure.
   * It updates the provided ArrayMap with the segments and checks if the current segment is a file name.
   *
   * @example
   * ```typescript
   * const arrayMap = new ArrayMap('root', [], new Map());
   * const segments = ['196.172.0.0', 'folder', 'file.txt'];
   * segmentsToArrayMap(arrayMap, segments);
   * // arrayMap will be updated with the structure representing the url.
   * ```
   */
  private segmentsToArrayMap(arrayMap: ArrayMap, segments: string[], i = 1) {
    const currentSegment = segments[i];
    if (currentSegment === undefined) return;

    if (i === segments.length - 1) {
      if (this.isFileName(currentSegment)) {
        arrayMap.array.push(currentSegment);
        return;
      }
    }

    if (!arrayMap.map.has(currentSegment)) {
      arrayMap.map.set(currentSegment, { index: arrayMap.array.length });
      arrayMap.array.push(new ArrayMap(currentSegment, [], new Map()));
    }

    const v = arrayMap.map.get(currentSegment);
    if (v != undefined) {
      this.segmentsToArrayMap(
        arrayMap.array[v.index] as ArrayMap,
        segments,
        ++i
      );
    }
  }

  /**
   * Recursively transforms the data from ArrayMap to wanted result of Result type
   * @param {ArrayMap} arrayMap
   * @returns {Result} - Returns part of the whole result of type {@link Result}
   */
  transformArrayMapToResultData(arrayMap: ArrayMap) {
    const res: Result = [];
    if (arrayMap.array.length === 0) {
      return [];
    }

    for (const e of arrayMap.array) {
      if (e instanceof ArrayMap) {
        res.push({ [e.name]: this.transformArrayMapToResultData(e) });
      } else {
        res.push(e);
      }
    }
    return res;
  }

  /**
   * Checks if a string is a valid file name.
   * @param segment - The segment to check.
   * @returns {boolean} `true` if the segment is a file name, otherwise `false`.
   */
  isFileName(segment: string) {
    return FILE_EXTENSION_REGEX.test(segment);
  }
}

// TODO: Test
