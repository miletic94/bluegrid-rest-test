/**
 * Represents raw data containing an array of items, each with a file URL.
 *  * @typedef { Record<"items", Array<Record<"fileUrl", string>>>;} Result
 * @example
 * ```typescript
 * const items: RawData = {items: [
 *   {fileUrl: "http://196.172.0.0/folder/subfolder/"},
 *   {fileUrl: "http://196.172.0.0/folder/subfolder/file.txt"},
 *   {fileUrl: "http://196.172.0.0/folder/file.txt"},
 * ]}
 * ```
 */
export type RawData = Record<"items", Array<Record<"fileUrl", string>>>;

/**
 * Represents a result of the API which is an array containing either strings or nested objects of the same type.
 *
 * This type is used to store hierarchical data where each element can either be a string or another nested
 * record with the same structure, representing folders and files.
 *
 * @typedef {Array<Record<string, Result> | string>} Result
 * @example
 * ```typescript
 * const exampleResult: Result = [
 *  "192.176.0.0":  {
 *     "folder1": [
 *       {
 *         "subfolder": [
 *           "file3.txt"
 *         ]
 *       },
 *  *    "file2.txt"
 *     ]
 *   }
 * ];
 * ```
 */
export type Result = Array<Record<string, Result> | string>;
