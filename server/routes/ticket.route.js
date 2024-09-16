import express from 'express';
import { isAdmin, verifyToken } from '../utils/verifiedUser.js';
import { createTicketComment, getAllTicketComments, getAllTickets } from '../controllers/ticket.controller.js';

const router = express.Router();

// Admin-only route: Requires token verification and admin check

// Normal route
router.post('/create-ticket', verifyToken, createTicketComment);
router.get('/ticket-comments', getAllTicketComments);
router.get('/all-tickets', getAllTickets);



export default router;
