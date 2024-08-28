import express from 'express';
import { test, signout } from '../controllers/user.controller.js';

const router = express.Router();

// Define a test route
router.get('/test', test);
router.post('/signout', signout);

export default router;
