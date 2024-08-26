import express from 'express';
import { createDepartment } from '../controllers/department.controller.js';

const router = express.Router();

// Define a route to create a department
router.post('/', createDepartment);

export default router;
