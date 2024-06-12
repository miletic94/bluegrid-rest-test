import * as fs from "fs";
import { FILE_EXTENSION_REGEX, URL_SEGMENTS_REGEX } from "./constants/regex";

const partialDataFilePath = "./test-data-partial.json";
const fullDataFilePath = "./test-data-full.json";

type Data = { items: [{ fileUrl: string }] };

const data: Data = getData(partialDataFilePath);

// TEST To make sure that hypothesis about data: that all paths will be either to folders, or to files we check that number of all paths is equal to number of paths that point to files and number of paths that point to folders
const dataItemsNumber = data.items.length;
let files = 0;
let folders = 0;

for (const fileUrl of data.items) {
  if (isFileName(fileUrl.fileUrl)) {
    files++;
  } else {
    folders++;
  }
}
console.table({
  dataItemsNumber,
  files,
  folders,
  sum: files + folders,
  equal: dataItemsNumber === files + folders,
});
// ===END OF TEST

// TODO: Create objects from arrays. Check file extensions by creating a set.

function toJSONFormattedString(linkString: string) {
  const urlSegments = linkString.match(URL_SEGMENTS_REGEX);
  if (!urlSegments) {
    // Here we can create some document to store all strings that didn't match the regex in order to test regex and validate strings and not crash application
    console.warn(
      `String ${linkString} get no matches from URL_SEGMENTS_REGEX. Either regex or string are not valid`
    );
    return;
  }

  let JSONFormattedString = "";
  const lastSegmentIndex = urlSegments.length - 1;

  for (let i = 1; i < lastSegmentIndex; i++) {}

  if (isFileName(urlSegments[lastSegmentIndex])) {
  }
}

// To check if path leads to a file (and not folder) you can use this function. If path is ending with segment that has dot and three or four letter characters at the end it is very likely that it is a file.
// This hypothesis could be tested further by testing ending characters against the list of known file extensions.
function isFileName(str: string) {
  return FILE_EXTENSION_REGEX.test(str);
}

function getData(filePath: string) {
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

// put files into sets

// const a = [
//   {
//     "34.8.32.234": [
//       {
//         SvnRep: [
//           {
//             "ADV-H5-New": ["README.txt", "VisualSVN.lck", "hooks-env.tmpl"],
//           },
//           {
//             "AT-APP": ["README.txt", "VisualSVN.lck", "hooks-env.tmpl"],
//           },
//           "README.txt",
//           "VisualSVN.lck",
//           "hooks-env.tmpl",
//         ],
//       },
//       {
//         www: ["README.txt", "VisualSVN.lck", "hooks-env.tmpl"],
//       },
//     ],
//   },
// ];

// PORT:A:B:
