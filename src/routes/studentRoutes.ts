import { Router } from "express";
import StudentControler from "../controllers/StudentControler";
const studentController = StudentControler
const router = Router();

router.post("", studentController.create)
router.get("", studentController.findStudent)
router.get("/getall", studentController.findAll)
router.put("", studentController.editStudent)
router.delete("", studentController.deleteStudent)

export default router;
