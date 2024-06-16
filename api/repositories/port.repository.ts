import axios from "axios";
import { ResourceTypeEnum } from "../../enums/ResourceTypeEnum";
import * as fs from "fs";
import { PATH_TO_API_DATA } from "../../data-resources/local-resources.const";
import { FULL_DATA_PATH_REMOTE } from "../../data-resources/remote-data-resources.const";
import { RawData } from "../../data-processor/types/data.type";

export class PortRepository {
  getAllPorts() {
    try {
      const data = fs.readFileSync("DATA.SM", "utf-8");
      return JSON.parse(data);
    } catch (error) {
      if (error instanceof Error) {
        console.error(`Error reading file: ${error.message}`);
        throw new Error(`Error reading file: ${error.message}`);
      } else {
        console.error("Unknown error occurred:", error);
      }
    }
  }
  // get raw data for transformer
  async getRawData(
    resourceType = ResourceTypeEnum.FILE_SYSTEM,
    filePath?: string
  ): Promise<RawData> {
    console.log("Getting raw data");
    switch (resourceType) {
      case ResourceTypeEnum.FILE_SYSTEM:
        if (filePath == undefined) throw Error("File path must be defined");
        return JSON.parse(fs.readFileSync(filePath, "utf-8"));
      case ResourceTypeEnum.REMOTE_RESOURCE:
        const res = await axios.get(FULL_DATA_PATH_REMOTE);
        return res.data;
    }
  }

  writeTransformedData(transformData: string) {
    console.log("Writing data to file");
    fs.writeFile(PATH_TO_API_DATA, transformData, (err) => {
      if (err) {
        console.error("Error writing file:", err);
      } else {
        console.log("File written successfully");
      }
    });
  }
}
