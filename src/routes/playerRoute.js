import { Router } from "express";
import * as playerController from "../controllers/playerControllers.js"

const router = Router();

router.get("/", playerController.listarPlayer)
router.get("/:id", playerController.buscarPorId)
router.post("/", playerController.criar)
router.post("/login", playerController.login)
router.put("/:id", playerController.atualizar)
router.delete("/:id", playerController.deletar)

export default router;