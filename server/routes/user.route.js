import express from 'express';
import { test, updateUserProfile, signout, createAdmin, updateAdmin, deletedUsers, deleteOwnAccount, getAccounts } from '../controllers/user.controller.js';
import { isAdmin, verifyToken } from '../utils/verifiedUser.js';

const router = express.Router();

router.get('/test', test);

// Protected routes that require token verification
router.put('/update/:id', verifyToken, updateUserProfile);
router.delete('/delete-account/:id', verifyToken, deleteOwnAccount);
router.post('/signout', signout);

// Admin-only route: Requires token verification and admin check
router.post('/create-admin', createAdmin);
router.put('/update-admin/:id', updateAdmin);
router.delete('/delete-user/:id', deletedUsers);

//for fetching
router.get('/users', getAccounts);

export default router;
