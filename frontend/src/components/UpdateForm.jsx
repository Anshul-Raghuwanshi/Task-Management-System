import React, { useState, useEffect } from "react";
import { useTaskContext } from '../context/TaskContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdateForm = () => {
    const [admin, setAdmin] = useState(false);
    const editTaskValuse = useTaskContext();
    const { _id, title, description, status, priority, dueDate, assignedTo } = editTaskValuse.task;

    const [formData, setFormData] = useState({
        title: title,
        description: description,
        dueDate: dueDate ? new Date(dueDate).toISOString().slice(0, 10) : '',
        priority: priority,
        status: status,
        assignedTo: assignedTo,
    });

    const [users, setUsers] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        setAdmin(JSON.parse(localStorage.getItem("admin")));
    }, []);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/users/allusers");
                setUsers(() => [...response.data]);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        }
        fetchUsers();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.put(`http://localhost:5000/api/task/update/${_id}`, formData)
            .then((response) => {
                alert("Task updated successfully:");
                navigate("/");
            })
            .catch((error) => {
                console.error("Error updating task:", error);
            });

        setFormData({
            _id: "",
            title: "",
            description: "",
            dueDate: "",
            priority: false,
            status: false,
            assignedTo: "",
        });
    };

    return (
        <div className="bg-teal-50 min-h-screen flex items-center justify-center">
            <form
                onSubmit={handleSubmit}
                className="max-w-lg mt-9 mx-auto p-6 bg-white rounded-lg shadow-xl border border-gray-300"
            >
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
                    Update Task Details
                </h2>

                <div className="flex flex-col space-y-4">
                    <div>
                        <label htmlFor="title" className="font-medium text-gray-700">Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            placeholder="Enter task title"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="description" className="font-medium text-gray-700">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            placeholder="Enter task description"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="status" className="font-medium text-gray-700">Status</label>
                        <select
                            id="status"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                        >
                            <option value="Pending">Pending</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>

                    <div className="flex items-center space-x-2">
                        <label htmlFor="priority" className="font-medium text-gray-700">High Priority Task</label>
                        <input
                            type="checkbox"
                            id="priority"
                            name="priority"
                            checked={formData.priority}
                            onChange={handleChange}
                            className="h-4 w-4 text-teal-600"
                        />
                    </div>

                    <div>
                        <label htmlFor="dueDate" className="font-medium text-gray-700">Due Date</label>
                        <input
                            type="date"
                            id="dueDate"
                            name="dueDate"
                            value={formData.dueDate}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="assignedTo" className="font-medium text-gray-700">Appointed To</label>
                        {admin ? (
                            <select
                                id="assignedTo"
                                name="assignedTo"
                                value={formData.assignedTo}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                            >
                                <option value="" disabled>Select a user</option>
                                {users.map((user) => (
                                    <option key={user._id} value={user.username}>
                                        {user.username}
                                    </option>
                                ))}
                            </select>
                        ) : (
                            <p className="text-gray-600">Only Admins can assign tasks.</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 bg-teal-500 text-white rounded-lg font-semibold hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    >
                        Update Task Details
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateForm;