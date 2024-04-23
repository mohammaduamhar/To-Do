import express from 'express';
import { createTask, deleteAllTasks, deleteTask, getCurrentUserTasks, updateTask,} from '../controllers/taskController.js';


const router = express.Router();

router.post('/add', createTask);
router.put('/update/:taskId', updateTask);
router.get('/myTasks', getCurrentUserTasks);
router.delete('/deleteAll', deleteAllTasks);
router.delete('/delete/:taskId', deleteTask);

export default router;