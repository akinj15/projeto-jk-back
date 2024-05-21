import { Router } from "express";
import cursoControler from "../controllers/CursoControler";

const userController = cursoControler
const router = Router();

router.post("", userController.create)
router.get("", userController.findCurso)
router.get("/getall", userController.findAll)
router.put("", userController.editCurso)
router.delete("", userController.delete)

export default router;
