import express from "express";
import { createTask, getAllTasks, getOneTask, updateTask, deleteTask, getmytasks } from '../controllers/taskController.js';

const router = express.Router();

router.get("/allTasks", getAllTasks);
router.get("/getmytasks/:id", getmytasks); 
router.get("/getonetask/:id", getOneTask); 
router.post("/createTask", createTask);
router.put("/update/:id", updateTask); 
router.delete("/delete/:id", deleteTask);

export default router;