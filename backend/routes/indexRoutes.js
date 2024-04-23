import express from 'express';
import taskRoutes from './taskRoutes.js';

import authRoutes from './authRoutes.js';

import userRoutes from './userRoutes.js';

import  checkAuth from '../utils/checkAuth.js'


const router  = express.Router();

router.use('/auth', authRoutes);
router.use('/tasks', checkAuth, taskRoutes);
router.use('/users', checkAuth, userRoutes);

export default router;