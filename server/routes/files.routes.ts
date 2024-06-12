import { Router } from "express";
import FilesController from "../controllers/files.controller";

const router = Router();

router.get("/files", FilesController.getAllFiles);
router.post("/files", FilesController.createPort);

export default router;
