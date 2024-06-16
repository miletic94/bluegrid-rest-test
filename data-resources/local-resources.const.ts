import path from "node:path";

export const DATA_RESOURCE_DIRECTORY = path.basename(__dirname);

// Path to file in which result data will be written
export const PATH_TO_API_DATA = path.join(
  DATA_RESOURCE_DIRECTORY,
  "data",
  "data.txt"
);
