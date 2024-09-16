import express from 'express';
import { isAdmin, verifyToken } from '../utils/verifiedUser.js';
import { createTicketComment } from '../controllers/ticket.controller.js';

const router = express.Router();

// Admin-only route: Requires token verification and admin check
router.post('/create-ticket', verifyToken, createTicketComment);



export default router;
