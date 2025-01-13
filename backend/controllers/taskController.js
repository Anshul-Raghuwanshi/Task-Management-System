import Tasks from "../models/taskModel.js";
import User from "../models/userModel.js";

const createTask = async (req, res) => {
    const { title, description, status, priority, dueDate, assignedTo } = req.body;
    try {
        const user = await User.find({ username: assignedTo });
        
        const task = await Tasks.create({ title, description, status, priority, dueDate, assignedTo: user[0]._id });
        res.status(200).json({task, message:"Task created successfully"});
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
};

const getmytasks = async (req, res) => {
    const { id } = req.params;
    try {
        const tasks = await Tasks.find({ assignedTo: id });
        res.status(200).json(tasks);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
}

const getOneTask = async (req, res) => {
    const { id } = req.params;
    try {
        const task = await Tasks.findById(id);
        const user = await User.find({ _id: task.assignedTo });
        res.status(200).json({data:task,assignedTo:user[0].username});
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
};

const getAllTasks = async (req, res) => {
    try {
        const tasks = await Tasks.find();
        
        res.status(200).json(tasks);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
};

const updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, description, status, priority, dueDate, assignedTo } = req.body;
    try {
        const task = await Tasks.findByIdAndUpdate(id, { title, description, status, priority, dueDate, assignedTo }, { new: true });
        res.status(200).json(task);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
};

const deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        const task = await Tasks.findByIdAndDelete(id);
        res.status(200).json({task, message:"Task deleted successfully"});
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
};

export { createTask, getAllTasks, getOneTask, updateTask, deleteTask,getmytasks };