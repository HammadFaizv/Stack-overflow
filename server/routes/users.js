import express from 'express';

import { signup, login } from '../controllers/auth.js';
import { getAllUsers, updateProfile, follow, unfollow } from '../controllers/users.js';
import auth from '../middlewares/auth.js';

const router = express.Router();

router.post('/signup', signup)
router.post('/login', login)

router.get('/getAllUsers', getAllUsers)
router.patch('/update/:id', auth, updateProfile)

router.patch('/friend', auth, follow);
router.patch('/unfriend', auth, unfollow);

export default router;