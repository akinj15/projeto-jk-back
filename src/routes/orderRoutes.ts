import { Router } from "express";
import orderControler from "../controllers/OrderControler";

const orderController = orderControler
const router = Router();

router.post("", orderController.create)
router.get("", orderController.findOrder)
router.get("/one/:id", orderController.findOrderById)
router.get("/getall", orderController.findAll)
router.put("", orderController.editOrder)
router.delete("", orderController.delete)

export default router;
