import { NextFunction, Request, Response } from "express";
import { PortModel } from "../models/ports.schema";
import { IPort, TPort } from "../models/types/IPort";

async function getAllFiles(req: Request, res: Response) {
  const ports = await PortModel.find();
  return res.status(200).json(ports);
}

// TODO: This is for test. Delete it
async function createPort(req: Request, res: Response, next: NextFunction) {
  try {
    const dummyPort = new PortModel<TPort>({
      name: "192.96.0.0",
      folders: [{ name: "folder" }],
    });
    const dummyPortDB = await dummyPort.save();
    res.status(200).json(dummyPortDB);
  } catch (err) {
    next(err);
  }
}

export default {
  getAllFiles,
  createPort,
};
