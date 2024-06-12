import { Data } from "../../types/data.type";
import { Port } from "../models/ports.schema";
import { TPort } from "../models/types/IPort";
import * as fs from "fs";

//Functions from Repository do async operations. Make sure to await for them.
export class PortRepository {
  getAllPorts() {
    // return Port.find();
    const filePath = "./data.json";
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
  }

  createBulk(data: Data) {
    Port.insertMany(data);
  }

  // TODO: Remove. Method for testing
  async createOne() {
    const m = new Map();
    m.set("name", "folder");
    m.set("contents", []);
    const data = new Port({ name: "new port", contents: [] });
    await data.save();
    return data;
  }
}
