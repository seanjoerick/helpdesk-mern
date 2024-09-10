import express from 'express';
import { createDepartment, updateDepartment, getAllDepartments, deleteDepartment } from '../controllers/department.controller.js';
import { isAdmin, verifyToken } from '../utils/verifiedUser.js';
const router = express.Router();

// Define a route to create a department
router.post('/create-department', verifyToken, isAdmin, createDepartment);

router.put('/update-department/:id', verifyToken, isAdmin, updateDepartment);

router.delete('/delete-department/:id', verifyToken, isAdmin, deleteDepartment);

router.get('/', getAllDepartments);

export default router;

