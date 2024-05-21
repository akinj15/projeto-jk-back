import { Router } from "express";
import checkPointControler from "../controllers/CheckPointControler";

const userController = checkPointControler
const router = Router();

router.post("", userController.create)
router.get("", userController.findCheckPoint)
router.get("/getall", userController.findAll)
router.put("", userController.editCheckPoint)
router.delete("", userController.delete)

export default router;
