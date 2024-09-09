import express from 'express';
import { createDepartment, updateDeparment, getAllDepartments } from '../controllers/department.controller.js';
import { verifyToken } from '../utils/verifiedUser.js';
const router = express.Router();

// Define a route to create a department
router.post('/', verifyToken, createDepartment);

router.put('/update/:id', verifyToken, updateDeparment);

router.get('/', getAllDepartments);

export default router;

