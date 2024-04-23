import express from 'express';
import { getUserInfo} from '../controllers/userController.js';

const router = express.Router();

router.get('/me', getUserInfo);

export default router;