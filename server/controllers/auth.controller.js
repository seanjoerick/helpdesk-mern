import User from '../models/user.model.js';
import Department from '../models/department.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
    const { department, username, email, password } = req.body;

    if (!username || !email || !password || !department) return res.status(400).json({ success: false, message: 'All fields are required' });

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ success: false, message: 'User already exists!' });   
        

        const validDepartment = await Department.findById(department);
        if (!validDepartment) return next(errorHandler(400, 'Invalid department ID.'));
        

        const hashedPassword = bcryptjs.hashSync(password, 10);
        const newUser = new User({
            department, 
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();
        res.status(201).json({sucesss: true, message: 'User created successfully!', user: newUser });
    } catch (error) {
        next(error);
    }
};


export const signin = async (req, res, next) => {
    const  { email, password } = req.body;
    try {
        const validUser = await User.findOne({ email });
        if(!validUser) return res.status(400).json({sucesss: false, message: 'User not found!'});

        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword)  return res.status(400).json({sucesss: false, message: 'Wrong crendentials!'});
      

        // Generate a JWT token
      const token = jwt.sign({ id: validUser._id, roles: validUser.roles }, process.env.JWT_SECRET);


      const { password: pass, ...rest } = validUser._doc;
        res.status(200).cookie('access_token', token, {
          httpOnly: true,
        }).json(rest);
        
    } catch (error) {
        next(error);
    }
}

export const google = async (req, res, next) => {
    const { email, name, googlePhotoUrl } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user) {
           
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            
            const { password, ...rest } = user._doc;
            
            res.status(200).cookie('access_token', token, {
                httpOnly: true,
            }).json(rest);
        } else {
            const generatedPassword = Array(2)
                .fill(0)
                .map(() => Math.random().toString(36).substring(2, 10))
                .join('');
            
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
            
            const newUser = new User({
                username: name,
                email: email,
                password: hashedPassword,
                avatar: googlePhotoUrl
            });
            
            await newUser.save();

            // Generate a JWT token
            const token = jwt.sign({ id: newUser._id, roles: newUser.roles }, process.env.JWT_SECRET);
            
            const { password, ...rest } = newUser._doc;
            res.status(200).cookie('access_token', token, {
                httpOnly: true,
            }).json(rest);
        }

    } catch (error) {
        next(error);
    }
};

