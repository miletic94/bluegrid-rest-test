/**
 * Represents an ArrayMap.
 *
 * Used in {@link segmentsToArrayMap} and {@link transformArrayMapToResultData}
 */
export class ArrayMap {
  /**
   * Used in {@link transformArrayMapToResultData} to transform ArrayMap to Result type.
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
