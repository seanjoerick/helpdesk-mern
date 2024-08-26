import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';

export const signup = async (req, res, next) => {
    const { departments, username, email, password, roles } = req.body;
    const userRole = roles || 'user'; 

    if (!username || !email || !password || !departments) {
        return next(errorHandler(400, 'All fields are required'));
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return next(errorHandler(400, 'User already exists!'));    
        }

        const hashedPassword = bcryptjs.hashSync(password, 10);
        const newUser = new User({
            departments,
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

