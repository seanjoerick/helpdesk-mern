import express from 'express';
import { test } from '../controllers/user.controller.js';

const router = express.Router();

// Define a test route
router.get('/test', test);

export default router;
