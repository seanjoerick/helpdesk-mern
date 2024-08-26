import express from 'express';
import { signup } from '../controllers/auth.controller.js'

const router = express.Router();

// Define a test route
router.post('/signup', signup);

export default router;
    