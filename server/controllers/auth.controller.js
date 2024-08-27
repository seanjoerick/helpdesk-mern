import User from '../models/user.model.js';
import Department from '../models/department.model.js'; // Import the Department model
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';

export const signup = async (req, res, next) => {
    const { department, username, email, password, roles } = req.body;
    const userRole = roles || 'user'; 

    if (!username || !email || !password || !department) {
        return next(errorHandler(400, 'All fields are required'));
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return next(errorHandler(400, 'User already exists!'));    
        }

        const validDepartment = await Department.findById(department);
        if (!validDepartment) {
            return next(errorHandler(400, 'Invalid department ID.'));
        }

        const hashedPassword = bcryptjs.hashSync(password, 10);
        const newUser = new User({
            department, 
            username,
            email,
            roles: [userRole],
            password: hashedPassword
        });

        await newUser.save();
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        next(error);
    }
}
