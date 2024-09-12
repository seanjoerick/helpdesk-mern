import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js';
import Department from '../models/department.model.js';
import { errorHandler } from '../utils/error.js';

  export const test = (req, res) => {
    res.json({ message: 'API is working!' });
  };
  
  export const updateUserProfile = async (req, res, next) => { 
    try {
      if (req.user.id !== req.params.id) return res.status(403).json({ success: false, message: 'Forbidden: You are not authorized to update this user.' });
      if (req.body.password) req.body.password = bcryptjs.hashSync(req.body.password, 10);
    
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

  export const deleteUserAccount = async (req, res, next) => {
    if(req.user.id !== req.params.id) return next(errorHandler(401, 'You can only delete your own account!'))
        try {
            await User.findByIdAndDelete(req.params.id) 
            res.clearCookie('access_token');
            res.status(200).json('User has been deleted!');
        } catch (error) {
            next(error)
        }
}

  export const signout = (req, res, next) => {
    try {
      res.clearCookie('access_token').status(200).json('User has been signed out');
    } catch (error) {
      next(error);
    }
  };


  export const createAdmin = async (req, res, next) => {
    const { department, username, email, password } = req.body;

    try {
      if (!username || !email || !password) return res.status(400).json({ success: false, message: 'All fields are required!' });

        const existingAdmin = await User.findOne({ email });

        if (existingAdmin) return res.status(400).json({ success: false, message: 'Admin already exists!' });
      

        const defaultDepartment = await Department.findOne({ name: 'Human Resources' });
        if (!defaultDepartment) return res.status(400).json({ success: false, message: 'Default department not found!' });
        
        const departmentId = department || defaultDepartment._id;

        const hashedPassword = bcryptjs.hashSync(password, 10);

        const newAdmin = new User({
            username,
            email,
            password: hashedPassword,
            roles: 'admin',
            department: departmentId
        });

        await newAdmin.save();
        res.status(200).json({ success: true, message: 'Admin created successfully!', user: newAdmin });

    } catch (error) {
        next(error);
    }
};

export const updateAdmin = async (req, res, next) => {
  try {
    if (req.body.password) req.body.password = bcryptjs.hashSync(req.body.password, 10)

    const updatedAdmin = await User.findByIdAndUpdate(req.params.id, {
      $set: {
        username: req.body.username,
        password: req.body.password,
      }
    }, { new: true });

    if (!updatedAdmin) return res.status(400).json({ success: false, message: 'User not found!' });
    

    const { password, ...rest } = updatedAdmin._doc;

    res.status(200).json({ success: true, user: rest });  

  } catch (error) {
    next(error);
  }
}

export const deletedAccount = async (req, res, next) => {
  try {

    const deleteAccount = await User.findByIdAndDelete(req.params.id);
    if (!deleteAccount) return res.status(400).json({ success: false, message: 'Account already deleted' });
    
    res.status(200).json({ success: true, message: 'Account deleted successfully!' });
  } catch (error) {
    next(error);
  }
};


export const getAllAdmins = async (req, res, next) => {
  try {
    const admins = await User.find({ roles: 'admin'});

    res.status(200).json({admins});
  } catch (error) {
      next(error);
  }
}

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ roles: 'user'});
    res.status(200).json({users});
  } catch (error) {
      next(error);
  }
}


