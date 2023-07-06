import express from "express";
import { getChat, postChat } from "../controllers/ChatAi.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.post("/add", auth, postChat);
router.get("/get/:id", auth, getChat);

export default router;