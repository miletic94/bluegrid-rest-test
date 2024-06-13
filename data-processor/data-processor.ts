import { ResourceTypeEnum } from "../enums/ResourceTypeEnum";
import { PortRepository } from "../server/repositories/port.repository";
import { Transformer } from "./transformer";

export class DataProcessor {
  constructor(
    private transformer: Transformer,
    private repository: PortRepository
  ) {
    this.transformer = transformer;
    this.repository = repository;
  }

  async process() {
    let rawData = await this.repository.getRawData(
      ResourceTypeEnum.REMOTE_RESOURCE
    );
    const transformedData = this.transformer.transformData(rawData);

    this.repository.writeTransformedData(transformedData);
  }
}
