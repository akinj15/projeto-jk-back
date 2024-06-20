import { Router } from "express";
import { userController } from "../controllers";
import logginIsRequired from "../middleware/logginIsRequired";
const router = Router();

router.post("", userController.create)
router.post("/login", userController.login)
router.get("", logginIsRequired, userController.whoAmI)
router.get("/getAll", logginIsRequired, userController.listUsers)
router.put("", logginIsRequired, userController.updateUser)

export default router;
