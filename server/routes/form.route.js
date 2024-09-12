import express from 'express';
import {  } from '../controllers/department.controller.js';
import { isAdmin, verifyToken } from '../utils/verifiedUser.js';
import { createFormTicket, deleteForm, getAllForms, updateFormTicket } from '../controllers/form.controller.js';
const router = express.Router();

// Admin-only route: Requires token verification and admin check
router.post('/create-form', verifyToken, isAdmin, createFormTicket);
router.put('/update-form/:id', verifyToken, isAdmin, updateFormTicket);
router.delete('/delete-form/:id', verifyToken, isAdmin, deleteForm);

//for fetching in front-end
router.get('/forms', getAllForms);
export default router;