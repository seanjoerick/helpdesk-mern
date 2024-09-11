import express from 'express';
import { test, updateUserProfile, deleteUserAccount, signout, createAdmin, updateAdmin, deletedAccount, getAllAdmins, getAllUsers } from '../controllers/user.controller.js';
import { isAdmin, verifyToken } from '../utils/verifiedUser.js';

const router = express.Router();

router.get('/test', test);

// Protected routes that require token verification
router.put('/update/:id', verifyToken, updateUserProfile);
router.delete('/delete/:id', verifyToken, deleteUserAccount);
router.post('/signout', signout);

// Admin-only route: Requires token verification and admin check
router.post('/create-admin', verifyToken, isAdmin, createAdmin);
router.put('/update-admin/:id', verifyToken, isAdmin, updateAdmin);
router.delete('/delete-account/:id', verifyToken, isAdmin, deletedAccount);

//for fetching
router.get('/admins', verifyToken, isAdmin, getAllAdmins);
router.get('/users', verifyToken, isAdmin, getAllUsers);

export default router;
