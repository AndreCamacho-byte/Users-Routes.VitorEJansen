import { Router } from "express";
import * as usuarioController from "../controllers/usuario.controller.js"

const router = Router();




router.get("/",usuarioController.listar)
router.get("/:id",usuarioController.buscarPorId)
router.post("/",usuarioController.criar)
router.post("/login", usuarioController.login) //add

export default router;