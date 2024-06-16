import { PortRepository } from "../api/repositories/port.repository";
import { DataProcessor } from "./data-processor";
import { Transformer } from "./transformer";

const dataProcessor = new DataProcessor(
  new Transformer(),
  new PortRepository()
);
dataProcessor.process();
