import express from 'express';
import { isAdmin, verifyToken } from '../utils/verifiedUser.js';
import { createTicketComment, getAllTicketComments, getAllTickets, getLatestRequest, getMyPendingTickets, getMyPendingTicketsCount, getTotalCommentsThisMonth, getTotalCompleted, getTotalPending, getTotalRequestsByFormType, takeActionOnTicket, takeActionOnTicketCompleted } from '../controllers/ticket.controller.js';

const router = express.Router();

// Admin-only route: Requires token verification and admin check
router.patch('/take-action/:ticketId', verifyToken, isAdmin, takeActionOnTicket);
router.patch('/take-action-completed/:ticketId', verifyToken, isAdmin, takeActionOnTicketCompleted);


// Normal route
router.post('/create-ticket', verifyToken, createTicketComment);

router.get('/ticket-comments', getAllTicketComments);
router.get('/alltickets', getAllTickets);
router.get('/latestrequest', getLatestRequest);
router.get('/tickets/pending', getTotalPending);
router.get('/tickets/completed', getTotalCompleted);
router.get('/tickets/totalform', getTotalRequestsByFormType);

//user
router.get('/tickets/getmycomments', verifyToken, getMyPendingTickets);
router.get('/tickets/getmycommentcounts', verifyToken, getMyPendingTicketsCount);
export default router;
