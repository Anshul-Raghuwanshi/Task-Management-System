import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateForm = () => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        status: "Pending",
        priority: false,
        dueDate: "",
        assignedTo: "",
    });

    const [users, setUsers] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/users/allusers");
                setUsers(() => [...response.data]);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { title, description, status, priority, dueDate, assignedTo } = formData;
        try {
            const response = await axios.post("http://localhost:5000/api/task/createTask", {
                title,
                description,
                status,
                priority,
                dueDate,
                assignedTo,
            });
            alert(response.data.message);
            navigate('/');
        } catch (error) {
            console.log(error);
        }
        setFormData({
            title: "",
            description: "",
            status: "Open",
            priority: false,
            dueDate: "",
            assignedTo: "",
        });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-lg mt-12 mx-auto p-6 bg-cream shadow-md rounded-xl space-y-6"
        >
            <div className="flex flex-col space-y-2">
                <label htmlFor="title" className="text-lg font-semibold text-gray-700">
                    Task Title
                </label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter task title"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    required
                />
            </div>

            <div className="flex flex-col space-y-2">
                <label htmlFor="description" className="text-lg font-semibold text-gray-700">
                    Task Description
                </label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Enter task description"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    required
                ></textarea>
            </div>

            <div className="flex flex-col space-y-2">
                <label htmlFor="status" className="text-lg font-semibold text-gray-700">
                    Task Status
                </label>
                <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    required
                >
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                </select>
            </div>

            <div className="flex items-center space-x-4">
                <input
                    type="checkbox"
                    id="priority"
                    name="priority"
                    checked={formData.priority}
                    onChange={handleChange}
                    className="h-5 w-5 border-gray-300 text-blue-600 focus:ring-blue-400 focus:ring-2"
                />
                <label htmlFor="priority" className="text-lg font-semibold text-gray-700">
                    Mark as High Priority Task
                </label>
            </div>

            <div className="flex flex-col space-y-2">
                <label htmlFor="dueDate" className="text-lg font-semibold text-gray-700">
                    Due Date
                </label>
                <input
                    type="date"
                    id="dueDate"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
            </div>

            <div className="flex flex-col space-y-2">
                <label htmlFor="assignedTo" className="text-lg font-semibold text-gray-700">
                    Appoint To
                </label>
                <select
                    id="assignedTo"
                    name="assignedTo"
                    value={formData.assignedTo}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    required
                >
                    <option value="" disabled>
                        Select a User
                    </option>
                    {users.map((user) => (
                        <option key={user._id} value={user.username}>
                            {user.username}
                        </option>
                    ))}
                </select>
            </div>

            <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-400 to-blue-500 text-white py-3 px-4 rounded-lg font-semibold shadow-lg hover:from-blue-500 hover:to-blue-600 focus:ring-2 focus:ring-blue-400"
            >
                Create Task
            </button>
        </form>
    );
};

export default CreateForm;