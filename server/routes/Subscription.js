import express from "express";
import { checkSubscription, order, verifyOrder } from "../controllers/Subscription.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.post("/order", auth, order);
router.post("/is-order-complete", auth, verifyOrder);
router.get("/check-subscription/:userId", auth, checkSubscription);

export default router;