import { ResourceTypeEnum } from "../enums/ResourceTypeEnum";
import { PortRepository } from "../api/repositories/port.repository";
import { Transformer } from "./transformer";
import { ArrayMap } from "./ArrayMap";

export class DataProcessor {
  constructor(
    private transformer: Transformer,
    private repository: PortRepository
  ) {
    this.transformer = transformer;
    this.repository = repository;
  }

  async process() {
    try {
      const rawData = await this.repository.getRawData(
        ResourceTypeEnum.REMOTE_RESOURCE
      );

      let arrayMapData = this.transformer.transformRawData(rawData);
      // If we wanted to make it easier to add new data, we could write arrayMapData here
      // That way we would save ArrayMap object, that is designed to make writing new data efficient
      // Then we would transform data with transformArrayMapToResultData while receiving data. That would save some memory, but it would also make API a bit slower.
      console.log("Transforming data to resultObject");
      let resultData =
        this.transformer.transformArrayMapToResultData(arrayMapData);

      // clean memory
      arrayMapData = new ArrayMap("clean", [], new Map());

      console.log("Transforming result data to string");
      const resultString = JSON.stringify(resultData);

      // clean memory
      resultData = [];

      await this.repository.writeTransformedData(resultString);
    } catch (error) {
      console.error("Error during processing:", error);
      throw error;
    }
  }
}
