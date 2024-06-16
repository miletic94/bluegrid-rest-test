import { NextFunction, Request, Response } from "express";
import { PortRepository } from "../repositories/port.repository";
export class PortController {
  constructor(private portRepository: PortRepository) {
    this.portRepository = portRepository;
  }

  async getAllPorts(req: Request, res: Response, next: NextFunction) {
    try {
      const ports = await this.portRepository.getAllPorts();

      return res.status(200).json(ports);
    } catch (err) {
      next(err);
    }
  }
}
