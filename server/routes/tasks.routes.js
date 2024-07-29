import express from 'express'
import { auth } from '../middleware/auth.js';
import { createTask } from '../controller/Tasks/createTask.js';
import { getUserTasks } from '../controller/Tasks/getTasks.js';
import { updateTask } from '../controller/Tasks/updateTasks.js';
import { deleteTask } from '../controller/Tasks/deleteTasks.js';
import { dragUpdate } from '../controller/Drag/dragUpdate.js';
import { getTaskById } from '../controller/Tasks/getTaskById.js';
const router = express.Router();


router.post('/createTask', auth, createTask);
router.get('/getTasks/:id', getUserTasks );
router.put('/updateTask/:id',auth,updateTask)
router.delete('/deleteTask/:id',auth,deleteTask)
router.patch('/updateTaskStatus',dragUpdate)
router.get('/getTaskInfo/:id', getTaskById)

export default router;