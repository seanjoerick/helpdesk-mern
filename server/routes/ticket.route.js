import express from 'express';
import { isAdmin, verifyToken } from '../utils/verifiedUser.js';
import { createTicketComment, getMyPendingTickets, getMyTotalCompletedTicket } from '../controllers/ticket.controller.js';
const router = express.Router();

// Admin-only route: Requires token verification and admin check
router.post('/create-ticket', verifyToken, createTicketComment);


//for fetching in ui
router.get('/ticket/pending', verifyToken, getMyPendingTickets);
router.get('/ticket/completed', verifyToken, getMyTotalCompletedTicket);

export default router;