import { Router } from "express";
import UserControler from "../controllers/UserControler";
import logginIsRequired from "../middleware/logginIsRequired";
const userController = UserControler
const router = Router();

router.post("", userController.create)
router.post("/login", userController.login)
router.get("", logginIsRequired, userController.findUser)
router.get("/getall", logginIsRequired, userController.findAll)
router.put("", logginIsRequired, userController.editUser)
router.delete("", logginIsRequired, userController.deleteUser)

export default router;
