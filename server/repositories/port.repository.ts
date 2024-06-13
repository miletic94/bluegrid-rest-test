import axios from "axios";
import { ResourceTypeEnum } from "../../enums/ResourceTypeEnum";
import * as fs from "fs";
import path from "path";
import { DATA_RESOURCE_DIRECTORY } from "../../data-resources/root-directory";
import { FULL_DATA_PATH_REMOTE } from "../../data-resources/data-resources";

export class PortRepository {
  getAllPorts() {
    const filePath = path.join(DATA_RESOURCE_DIRECTORY, "data.txt");
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
  }

  // get raw data for transformer
  async getRawData(
    resourceType = ResourceTypeEnum.FILE_SYSTEM,
    filePath?: string
  ) {
    switch (resourceType) {
      case ResourceTypeEnum.FILE_SYSTEM:
        if (filePath == undefined) throw Error("File path must be defined");
        return JSON.parse(fs.readFileSync(filePath, "utf-8"));
      case ResourceTypeEnum.REMOTE_RESOURCE:
        const res = await axios.get(FULL_DATA_PATH_REMOTE);
        return res.data;
    }
  }

  // TODO: Better type for transformed data
  writeTransformedData(transformData: string) {
    fs.writeFile(
      path.join(DATA_RESOURCE_DIRECTORY, "data.txt"),
      transformData,
      (err) => {
        if (err) {
          console.error("Error writing file:", err);
        } else {
          console.log("File written successfully");
        }
      }
    );
  }
}
