import Department from '../models/department.model.js';
import { errorHandler } from '../utils/error.js';

export const createDepartment = async (req, res, next) => {
    const { name } = req.body;

    if (!name) {
        return next(errorHandler(400, 'Department name is required!'));
    }

    try {
        const existingDepartment = await Department.findOne({ name });
        if (existingDepartment) {
            return next(errorHandler(400, 'Department Already Exists!'));
        }

        const newDepartment = new Department({ name });
        await newDepartment.save();
        res.status(201).json({ message: 'Department created successfully', department: newDepartment });
    } catch (error) {
        next(error);
    }
};

export const getAllDepartments = async (req, res, next) => {
    try {
        const departments = await Department.find();
        res.status(200).json(departments);    
    } catch (error) {
        next(error);
    }
};