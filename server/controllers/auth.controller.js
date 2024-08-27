import User from '../models/user.model.js';
import Department from '../models/department.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
    const { department, username, email, password, roles } = req.body;
    const userRole = roles || 'user'; 

    if (!username || !email || !password || !department) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'User already exists!' });   
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

export const signin = async (req, res, next) => {
    const  { email, password } = req.body;
    try {
        const validUser = await User.findOne({ email });
        if(!validUser) return res.status(400).json({sucesss: false, message: 'User not found!'});

        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword)  return res.status(400).json({sucesss: false, message: 'Wrong crendentials!'});
      

        // Generate a JWT token
      const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

      const { password: pass, ...rest } = validUser._doc;
        res.status(200).cookie('access_token', token, {
          httpOnly: true,
        }).json(rest);
        
    } catch (error) {
        next(error);
    }
}
