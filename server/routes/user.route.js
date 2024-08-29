import express from 'express';
import { test, updateUser, signout } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifiedUser.js';

const router = express.Router();

router.get('/test', test);

// Define an update user route with authentication
router.post('/update/:id', verifyToken, updateUser);

router.post('/signout', signout);

export default router;
