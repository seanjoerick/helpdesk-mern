import express from 'express';
import { createDepartment, getAllDepartments } from '../controllers/department.controller.js';

const router = express.Router();

// Define a route to create a department
router.post('/', createDepartment);
router.get('/', getAllDepartments);

export default router;
