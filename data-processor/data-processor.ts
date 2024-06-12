// import { ResourceTypeEnum } from "../enums/ResourceTypeEnum";
// import { PortRepository } from "../server/repositories/port.repository";
// import { Transformer } from "../transformer";
// import { Data } from "../types/data.type";
// import axios from "axios";
// import * as fs from "fs";

// const partialDataFilePath = "./test-data-partial.json";
// const fullDataFilePath = "./test-data-full.json";

// export class DataProcessor {
//   constructor(
//     private transformer: Transformer,
//     private portRepository: PortRepository
//   ) {}

//   //TODO: Make this more safe
//   async fetch() {
//     const data: Data = await this.getData(
//       ResourceTypeEnum.FILE_SYSTEM,
//       partialDataFilePath
//     );
//     return data;
//   }

//   async process(data: Data) {
//     const transformedData = await this.transformer.transformData(data);
//     console.log(transformedData);
//     // this.portRepository.createBulk({ transformedData });
//   }

//   async getData(
//     resourceType = ResourceTypeEnum.FILE_SYSTEM,
//     filePath?: string
//   ) {
//     switch (resourceType) {
//       case ResourceTypeEnum.FILE_SYSTEM:
//         if (filePath == undefined) throw Error("File path must be defined");
//         return JSON.parse(fs.readFileSync(filePath, "utf-8"));
//       case ResourceTypeEnum.REMOTE_RESOURCE:
//         //TODO: This is okay since data and resource are not confidential.
//         // With confidential data use .env instead
//         const res = await axios.get(
//           "https://rest-test-eight.vercel.app/api/test"
//         );
//         return res.data;
//     }
//   }
// }
