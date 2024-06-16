import { RawData } from "./data-processor/types/data.type";

const FILE_EXTENSION_REGEX = /\.\w{3,4}$/;
const URL_SEGMENTS_REGEX = /(?:(?!\/).)+/gm;
const rawData: RawData = {
  items: [
    { fileUrl: "http://port/A" },
    { fileUrl: "http://port/A/B" },
    { fileUrl: "http://port/A/C" },
    // { fileUrl: "http://port/A/B/D" },
    // { fileUrl: "http://port/A/B/a.txt" },
    // { fileUrl: "http://port/A/B/b.txt" },
  ],
};

type ArraySet = {
  [key: string]:
    | (ArraySet | string)[]
    | Record<string, Record<"index", number>>;
  set: Record<string, Record<"index", number>>;
};

class ArraySetConstructor {
  private constructor() {
    throw new Error();
  }
  static toObject(
    name: string,
    array: (ArraySet | string)[],
    set: Record<string, Record<"index", number>>
  ): ArraySet {
    return {
      // Do not delete this property. Deleting could cause unexpected bugs. This approach sacrifices type safety for speed and memory.
      // If you have to change returned object in any way, consult documentation
      [name]: array,
      set,
    };
  }
}

function transformData(rawData: RawData) {
  const rootObj: ArraySet = {
    root: [],
    set: {},
  };

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

    pathStringToObject(
      pathSegments[firstIndex],
      "root",
      rootObj,
      pathSegments,
      firstIndex
    );
  }

  return rootObj;
}

function pathStringToObject(
  nextArrayName: string,
  currentArrayName: string,
  currentArraySet: ArraySet,
  segments: string[],
  i: number
) {
  if (segments[i] === undefined) return;

  if (i === segments.length - 1) {
    if (isFileName(segments[i])) {
      (currentArraySet[currentArrayName] as (ArraySet | string)[]).push(
        segments[i]
      );
      return;
    }
  }

  if (!(nextArrayName in currentArraySet.set)) {
    currentArraySet.set[nextArrayName] = {
      index: (currentArraySet[currentArrayName] as (ArraySet | string)[])
        .length,
    };
    (currentArraySet[currentArrayName] as (ArraySet | string)[]).push(
      ArraySetConstructor.toObject(nextArrayName, [], {})
    );
  }

  pathStringToObject(
    segments[i + 1],
    segments[i],
    (currentArraySet[currentArrayName] as ArraySet[])[
      currentArraySet.set[nextArrayName].index
    ],
    segments,
    ++i
  );
}

function isFileName(str: string) {
  return FILE_EXTENSION_REGEX.test(str);
}

console.dir(transformData(rawData), { depth: 10 });
