import { NextFunction, Request, Response } from "express";
import { PortRepository } from "../repositories/port.repository";
import * as fs from "fs";
export class PortController {
  constructor(private portRepository: PortRepository) {
    this.portRepository = portRepository;
  }

  async getAllPorts(req: Request, res: Response, next: NextFunction) {
    // const data = JSON.parse(fs.readFileSync("./test-data-full.json", "utf-8"));
    try {
      const ports = await this.portRepository.getAllPorts();
      // const response = ports.map((port) => {
      //   return { [port.name]: port.contents };
      // });

      return res.status(200).json(ports);
    } catch (err) {
      next(err);
    }
  }

  // TODO: Remove.
  async createOne(req: Request, res: Response, next: NextFunction) {
    try {
      const port = await this.portRepository.createOne();
      const responseJson = { [port.name]: port.contents };
      return res.status(200).json(responseJson);
    } catch (err) {
      next(err);
    }
  }
}
