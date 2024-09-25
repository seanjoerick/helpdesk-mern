import express from 'express';
import { test, updateUserProfile, signout, createUsers, deletedUsers, deleteOwnAccount, getAccounts, getAdminCount } from '../controllers/user.controller.js';
import { isAdmin, verifyToken } from '../utils/verifiedUser.js';

const router = express.Router();

router.get('/test', test);

// Protected routes that require token verification
router.put('/update/:id', verifyToken, updateUserProfile);
router.delete('/delete-account/:id', verifyToken, deleteOwnAccount);
router.post('/signout', signout);

// Admin-only route: Requires token verification and admin check
router.post('/create-users',  createUsers);
// router.put('/update-admin/:id',  updateAdmin);
router.delete('/delete-user/:id', deletedUsers);

//for fetching
router.get('/users', getAccounts);
router.get('/admincount', getAdminCount);

export default router;
