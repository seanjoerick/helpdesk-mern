import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js';
import Department from '../models/department.model.js';
import { errorHandler } from '../utils/error.js';

export const test = (req, res) => {
    res.json({ message: 'API is working!' });
};

export const updateUserProfile = async (req, res, next) => {
    try {
        if (req.user.id !== req.params.id) 
            return res.status(403).json({ success: false, message: 'Forbidden: You are not authorized to update this user.' });
        
        if (req.body.password) 
            req.body.password = bcryptjs.hashSync(req.body.password, 10);

        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: {
                username: req.body.username,
                password: req.body.password,
                department: req.body.department,
            }
        }, { new: true });

        const { password, ...rest } = updatedUser._doc;

        res.status(200).json(rest);
    } catch (error) { 
        next(error);    
    }
};

export const deleteOwnAccount = async (req, res, next) => {
    if (req.user.id !== req.params.id) 
        return next(errorHandler(401, 'You can only delete your own account!'));

    try {
        await User.findByIdAndDelete(req.params.id);
        res.clearCookie('access_token');
        res.status(200).json('Your account has been deleted!');
    } catch (error) {
        next(error);
    }
};

export const signout = (req, res, next) => {
    try {
        res.clearCookie('access_token').status(200).json('User has been signed out');
    } catch (error) {
        next(error);
    }
};

export const createUsers = async (req, res, next) => {
    const { department, username, email, password, roles } = req.body;

    if (!username || !email || !password || !department) 
        return res.status(400).json({ success: false, message: 'All fields are required' });

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) 
            return res.status(400).json({ success: false, message: 'User already exists!' });

        const validDepartment = await Department.findById(department);
        if (!validDepartment) 
            return next(errorHandler(400, 'Invalid department ID.'));

        const hashedPassword = bcryptjs.hashSync(password, 10);
        const newUser = new User({
            department,
            username,
            email,
            password: hashedPassword,
            roles
        });

        await newUser.save();
        res.status(201).json({ success: true, message: 'Account created successfully!', user: newUser });
    } catch (error) {
        next(error);
    }
};

// export const updateAdmin = async (req, res, next) => {
//     try {
//         if (req.body.password) 
//             req.body.password = bcryptjs.hashSync(req.body.password, 10);

//         const updatedAdmin = await User.findByIdAndUpdate(req.params.id, {
//             $set: {
//                 username: req.body.username,
//                 password: req.body.password,
//             }
//         }, { new: true });

//         if (!updatedAdmin) 
//             return res.status(400).json({ success: false, message: 'User not found!' });

//         const { password, ...rest } = updatedAdmin._doc;

//         res.status(200).json({ success: true, user: rest });  
//     } catch (error) {
//         next(error);
//     }
// };

export const deletedUsers = async (req, res, next) => {
    try {
        const deleteAccount = await User.findByIdAndDelete(req.params.id);
        if (!deleteAccount) 
            return res.status(400).json({ success: false, message: 'Account already deleted' });

        res.status(200).json({ success: true, message: 'Account deleted successfully!' });
    } catch (error) {
        next(error);
    }
};

export const getAccounts = async (req, res, next) => {
    try {
        const accounts = await User.find().populate('department');
        res.status(200).json({ accounts }); 
    } catch (error) {
        next(error);
    }
};

export const getAdminCount = async (req, res, next) => {
    try {
        const adminCount = await User.countDocuments({ roles: 'Admin' });

        res.status(200).json({
            message: 'Admin count fetched successfully!',
            count: adminCount,
        });
    } catch (error) {
        next(error);
    }
};