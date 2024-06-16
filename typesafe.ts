import { RawData, Result } from "./data-processor/types/data.type";

const FILE_EXTENSION_REGEX = /\.\w{3,4}$/;
const URL_SEGMENTS_REGEX = /(?:(?!\/).)+/gm;
const rawData = {
  items: [
    { fileUrl: "port/A" },
    { fileUrl: "port/A/B" },
    { fileUrl: "port/A/a.txt" },
    //  { fileUrl: "port/C/" },
    //{ fileUrl: "port/C/D" },
    //{ fileUrl: "port/C/c.txt" },
    //{ fileUrl: "port/C/E" },
    // { fileUrl: "port/C/E/F" },
    //  { fileUrl: "port/C/E/F/G" },
    // { fileUrl: "port/C/E/F/f.txt" },
    // { fileUrl: "port/A/B/C" },
  ],
};

// /**
//  * @class
//  *
//  * Used in @see segmentsToArrayMap and @see transformArrayMapToResultData
//  *
//  */
// export class ArrayMap {
//   name: string;
//   array: (ArrayMap | string)[];
//   map: Map<string, Record<"index", number>>;

//   constructor(
//     name: string,
//     array: (ArrayMap | string)[],
//     map: Map<string, Record<"index", number>>
//   ) {
//     /**
//      * Used in @see transformArrayMapToResultData to transform ArraySet to Result type
//      * @type {string}
//      */
//     this.name = name;
//     /**
//      * Used to store actual array of data in recursive manner
//      * @type {(ArrayMap | string)[]}
//      */
//     this.array = array;
//     /**
//      * Used in @see segmentsToArrayMap to quickly check if there is already folder with specific name inside of the @see array
//      * If there is, it stores index of the folder inside of the array.
//      * @type { Map<string, Record<"index", number>> }
//      */
//     this.map = map;
//   }
// }

/**
 * Represents an ArrayMap.
 *
 * Used in {@link segmentsToArrayMap} and {@link transformArrayMapToResultData}
 */
export class ArrayMap {
  /**
   * Used in {@link transformArrayMapToResultData} to transform ArraySet to Result type.
   */
  name: string;

  /**
   * Used to store actual array of data in a recursive manner.
   */
  array: (ArrayMap | string)[];

  /**
   * Used in {@link segmentsToArrayMap} to quickly check if there is already a folder with a specific name inside the {@link array}.
   * If there is, it stores the index of the folder inside the array.
   */
  map: Map<string, Record<"index", number>>;

  /**
   * Create an ArrayMap.
   * @param name - The name of the ArrayMap.
   * @param array - The array of data in a recursive manner.
   * @param map - A map to check for existing folders and store their indices.
   */
  constructor(
    name: string,
    array: (ArrayMap | string)[],
    map: Map<string, Record<"index", number>>
  ) {
    this.name = name;
    this.array = array;
    this.map = map;
  }
}

/**
 * Transforms raw data into a structured ArrayMap representation and then into a result data format.
 *
 * @param {RawData} rawData - The raw data of type {@link RawData } to transform.
 * @returns The transformed result data.
 */
export function transformRawData(rawData: RawData) {
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

    segmentsToArrayMap(rootObj, urlSegments, firstIndex);
  }

  // If we wanted to make it easier to add new data, we could return rootObj here
  // That way we would save ArrayMap object, that is designed to make writing new data efficient
  // Then we would transform data with transformArrayMapToResultData while receiving data. That would save some memory, but it would also make API a bit slower.
  return transformArrayMapToResultData(rootObj);
}

// /**
//  * Recursively transforms array of segments of url to @see ArrayMap objects
//  *
//  * @param {ArrayMap} arrayMap - Data structure used to efficiently transform data
//  * @param {string[]} segments - Array of string segments representing either folder name or file name
//  */

/**
 * Converts segments of a url into an ArrayMap structure.
 *
 * @param arrayMap - The {@link ArrayMap} to populate with segments.
 * @param segments - Array of the segments of the url to convert.
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
function segmentsToArrayMap(arrayMap: ArrayMap, segments: string[], i = 1) {
  const currentSegment = segments[i];
  if (currentSegment === undefined) return;

  if (i === segments.length - 1) {
    if (isFileName(currentSegment)) {
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
    segmentsToArrayMap(arrayMap.array[v.index] as ArrayMap, segments, ++i);
  }
}

/**
 * Recursively transforms the data from ArrayMap to wanted result of Result type
 * @param {ArrayMap} arrayMap
 * @returns {Result} - Returns part of the whole result of type {@link Result}
 */
export function transformArrayMapToResultData(arrayMap: ArrayMap) {
  const res: Result = [];
  if (arrayMap.array.length === 0) {
    return [];
  }

  for (const e of arrayMap.array) {
    if (e instanceof ArrayMap) {
      res.push({ [e.name]: transformArrayMapToResultData(e) });
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
export function isFileName(segment: string) {
  return FILE_EXTENSION_REGEX.test(segment);
}

console.dir(transformRawData(rawData), { depth: 10 });

// TODO: Test
