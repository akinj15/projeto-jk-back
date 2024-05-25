import { Router } from "express";
import { permissionController } from "../controllers";
import logginIsRequired from "../middleware/logginIsRequired";
const router = Router();

router.post("", logginIsRequired, permissionController.create)
router.post("/assing", logginIsRequired, permissionController.assingRole)
router.get("", logginIsRequired, permissionController.listRoles)
router.delete("", logginIsRequired, permissionController.deleteRole)

export default router;
