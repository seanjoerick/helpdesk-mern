import express from 'express';
import { isAdmin, verifyToken } from '../utils/verifiedUser.js';
import { createTicketComment, getAllTicketComments, getAllTickets, getPendingTickets, takeActionOnTicket, takeActionOnTicketCompleted } from '../controllers/ticket.controller.js';

const router = express.Router();

// Admin-only route: Requires token verification and admin check
router.patch('/take-action/:ticketId', verifyToken, isAdmin, takeActionOnTicket);
router.patch('/take-action-completed/:ticketId', verifyToken, isAdmin, takeActionOnTicketCompleted);


// Normal route
router.post('/create-ticket', verifyToken, createTicketComment);

router.get('/tickets/pending', getPendingTickets);
router.get('/ticket-comments', getAllTicketComments);
router.get('/alltickets', getAllTickets);



export default router;
