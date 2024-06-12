import { Port } from "../models/ports.schema";
import { TPort } from "../models/types/IPort";

//Functions from Repository do async operations. Make sure to await for them.
export class PortRepository {
  getAllPorts() {
    return Port.find();
  }
}
