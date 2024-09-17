import express from 'express';
import { createDepartment, updateDepartment, getAllDepartments, deleteDepartment } from '../controllers/department.controller.js';
import { isAdmin, verifyToken } from '../utils/verifiedUser.js';
const router = express.Router();

// Admin-only route: Requires token verification and admin check
router.post('/create-department', verifyToken, isAdmin, createDepartment);
router.put('/update-department/:id', verifyToken, isAdmin, updateDepartment);
router.delete('/delete-department/:id', verifyToken, isAdmin, deleteDepartment);

//for fetching
router.get('/', getAllDepartments);

export default router;
