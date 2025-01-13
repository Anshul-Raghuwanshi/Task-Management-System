import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTaskContext } from '../context/TaskContext';

const TaskCard = ({ task }) => {
    const [priority, setPriority] = useState(false);
    const navigate = useNavigate();
    const editTaskValues = useTaskContext();

    useEffect(() => {
        setPriority(task.priority);
    }, [task.priority]);

    const handleEdit = () => {
        editTaskValues.setTask(task);
        navigate(`/updatetask`, { state: task });
    };

    const handleDetails = () => {
        editTaskValues.setTask(task);
        navigate(`/task/${task._id}`);
    };

    return (
        <div
            className={`flex flex-col items-center justify-evenly p-4 m-4 border-l-4 shadow-lg rounded-lg ${
                priority ? 'border-green-400 bg-cream-light' : 'border-yellow-400 bg-cream'
            }`}
        >
            <h2 className="text-xl font-bold text-gray-800 mb-2">{task.title}</h2>
            <p className="text-sm text-gray-600 font-semibold mb-2">
                Current Status: {task.status}
            </p>
            <p className="text-sm text-gray-600 font-semibold mb-4">
                Due Date: {new Date(task.dueDate).toLocaleDateString()}
            </p>

            <button
                onClick={handleDetails}
                className="w-full bg-blue-400 text-white py-2 px-4 rounded-lg hover:bg-blue-500 transition"
            >
                View Details
            </button>

            <button
                onClick={handleEdit}
                className="w-full bg-green-400 text-white py-2 px-4 rounded-lg hover:bg-green-500 transition mt-2"
            >
                Edit Task Details
            </button>
        </div>
    );
};

export default TaskCard;