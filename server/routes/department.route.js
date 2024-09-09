import express from 'express';
import { createDepartment, updateDepartment, getAllDepartments, deleteDepartment } from '../controllers/department.controller.js';
import { verifyToken } from '../utils/verifiedUser.js';
const router = express.Router();

// Define a route to create a department
router.post('/', verifyToken, createDepartment);

router.put('/update/:id', verifyToken, updateDepartment);

router.delete('/delete/:id', verifyToken, deleteDepartment);

router.get('/', getAllDepartments);

export default router;

