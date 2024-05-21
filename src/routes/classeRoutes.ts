import { Router } from "express";
import classeControler from "../controllers/ClasseControler";

const userController = classeControler
const router = Router();

router.post("", userController.create)
router.get("", userController.findClasse)
router.get("/getall", userController.findAll)
router.put("", userController.editClasse)
router.delete("", userController.delete)

export default router;
