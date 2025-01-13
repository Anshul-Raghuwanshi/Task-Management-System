import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useTaskContext } from '../context/TaskContext';

const Task = () => {
  const { id } = useParams();
  const [task, setTask] = useState({
    data: { title: '', description: '', status: '', priority: false, dueDate: '', assignedTo: '' },
    assignedTo: ''
  });

  const navigate = useNavigate();
  const editTaskValuse = useTaskContext();

  const fetchTask = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/task/getonetask/${id}`);
      const data = response.data;
      setTask(data);
    } catch (error) {
      console.log(error);
    }
  };

  const markComplete = async () => {
    const confirmComplete = window.confirm('Are you sure you want to mark this task as complete?');
    if (!confirmComplete) return;

    try {
      const { _id, title, description, status, priority, dueDate, assignedTo } = editTaskValuse.task;
      await axios.put(`http://localhost:5000/api/task/update/${id}`, {
        title, description, status: 'Completed', priority, dueDate, assignedTo
      });
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = () => {
    navigate(`/updatetask`);
  };

  const deleteTask = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this task?');
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/api/task/delete/${id}`)
          .then((res) => alert(res.data.message));
        navigate('/');
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    fetchTask();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-teal-100 pb-72">
      <div className="max-w-4xl w-full bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* Left Section: Task Title, Description */}
          <div className="p-6 w-full lg:w-2/3">
            <h2 className="text-4xl font-bold text-teal-600 mb-4">{task.data.title}</h2>
            <p className="text-teal-500 text-lg mb-6 leading-relaxed">{task.data.description}</p>
            <div className="space-y-4">
              <p className="flex items-center text-teal-600 text-sm">
                <span className="mr-2 text-teal-500"><i className="fas fa-calendar-alt"></i></span>
                <strong className="mr-2">Due Date:</strong> {new Date(task.data.dueDate).toLocaleDateString()}
              </p>
              <p className="flex items-center text-teal-600 text-sm">
                <span className="mr-2 text-teal-500"><i className="fas fa-tasks"></i></span>
                <strong className="mr-2">Status:</strong> {task.data.status}
              </p>
              <p className="flex items-center text-teal-600 text-sm">
                <span className="mr-2 text-teal-500"><i className="fas fa-star"></i></span>
                <strong className="mr-2">Priority:</strong> {task.data.priority ? 'High' : 'Low'}
              </p>
              <p className="flex items-center text-teal-600 text-sm">
                <span className="mr-2 text-teal-500"><i className="fas fa-user"></i></span>
                <strong className="mr-2">Assigned To:</strong> {task.assignedTo}
              </p>
            </div>
          </div>

          {/* Right Section: Action Buttons */}
          <div className="p-6 w-full lg:w-1/3 bg-teal-500 text-white space-y-4">
            <button 
              onClick={markComplete} 
              className="w-full py-3 bg-teal-600 hover:bg-teal-700 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-teal-300 focus:ring-offset-2"
            >
              Mark as Completed
            </button>
            <button 
              onClick={handleEdit} 
              className="w-full py-3 bg-teal-600 hover:bg-teal-700 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-teal-300 focus:ring-offset-2"
            >
              Edit Task
            </button>
            <button 
              onClick={deleteTask} 
              className="w-full py-3 bg-red-600 hover:bg-red-700 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
            >
              Delete Task
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Task;