import express from 'express';
import { sendOtp, verifyOtp } from "../controllers/Otp.js";
import auth from '../middlewares/auth.js';

const router = express.Router();

router.post('/send-otp', auth, sendOtp);
router.post('/verify-otp', auth, verifyOtp);

export default router;