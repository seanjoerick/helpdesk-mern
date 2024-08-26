import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';

export const signup = async (req, res, next) => {
    const { departments, username, email, password, role} = req.body;
    const userRole = role || 'user'; 

    if(!username || !departments || !email || !password) {
       next(errorHandler(400, 'All fields are required'));
    }

    try {
        const existingUser = await User.findOne({email});
        if(existingUser) {
            next(errorHandler(400, 'User already exists!'));    
        }
        const hashedpassword = bcryptjs.hashSync(password, 10);

        const newUser = new User ({departments, username, email, role: [userRole], password: hashedpassword});

        await newUser.save();
        res.status(201).json({message: 'User Created sucessfully', user: newUser });
    } catch (error) {
        next(error)
    }
}
