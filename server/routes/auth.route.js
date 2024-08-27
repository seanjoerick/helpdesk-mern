import express from 'express';
import { signin, signup } from '../controllers/auth.controller.js'

const router = express.Router();

// Define a test route
router.post('/signup', signup);
router.post('/signin', signin)

export default router;
    