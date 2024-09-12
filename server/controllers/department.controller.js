import Department from '../models/department.model.js';
import { errorHandler } from '../utils/error.js';


export const createDepartment = async (req, res, next) => {
    const { departmentName } = req.body;

    if (!departmentName) {
        return next(errorHandler(400, 'Department name is required!'));
    }

    try {
        const existingDepartment = await Department.findOne({ departmentName });
        if (existingDepartment) {
            return next(errorHandler(400, 'Department Already Exists!'));
        }

        const newDepartment = new Department({ departmentName });
        await newDepartment.save();
        res.status(201).json({ message: 'Department created successfully', department: newDepartment });
    } catch (error) {
        next(error);
    }
};

export const updateDepartment = async (req, res, next) => {
    const { id } = req.params; //ginet ko yung id sa url parameters
    const { departmentName } = req.body; //get new name from request body

    if(!departmentName) {
        return next(errorHandler(400, 'Department name is required!'))
    }

    try {
        const updatedDepartment = await Department.findByIdAndUpdate(id, { departmentName }, { new: true });

        if(!updatedDepartment) {
            return next(errorHandler(404, 'Department not found!'));
        }
        res.status(200).json({message: 'Deparment name updated successfully', department: updatedDepartment})
    } catch (error) {
        next(error);
    }
};

export const deleteDepartment = async (req, res, next) => {
    const { id } = req.params;
    try {
        const deletedDepartment = await Department.findByIdAndDelete(id);
        if(!deletedDepartment){
            return next(errorHandler(400, 'Department not found!'));
        }
        res.status(200).json({message: 'Department deleted successfully!', department: deletedDepartment});   
    } catch (error) {
        next(error);
    }
} 

export const getAllDepartments = async (req, res, next) => {
    try {
        const departments = await Department.find();
        res.status(200).json({departments});    
    } catch (error) {
        next(error);
    }
};

