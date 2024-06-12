import { Router } from "express";
import { PortController } from "../controllers/port.controller";
import { PortRepository } from "../repositories/port.repository";

const router = Router();

// TODO: Consider DI container to manage dependencies
const controller = new PortController(new PortRepository());
router.get("/files", controller.getAllPorts.bind(controller));
router.post("/files", controller.createOne.bind(controller));

export default router;
