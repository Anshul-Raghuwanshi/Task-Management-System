import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskCard from "../components/TaskCard";

const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 6;

  const [tasks, setTasks] = useState([]);

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/task/allTasks`)
      .then((res) => {
        setTasks(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(tasks.length / tasksPerPage);

  return (
    <div className="bg-teal-50 min-h-screen flex flex-col items-center">
      <div className="max-w-5xl w-full p-6 space-y-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800">Your Assigned Tasks</h1>
        <div className="flex flex-wrap justify-center gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 bg-green-500 rounded-full"></span>
            <span>High Priority Task</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 bg-orange-500 rounded-full"></span>
            <span>Low Priority Task</span>
          </div>
        </div>

        {currentTasks.length > 0 ? (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {currentTasks.map((task, index) => (
              <TaskCard
                key={index}
                task={task}
                className="shadow-lg rounded-lg bg-white hover:shadow-xl transition-shadow"
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-96 bg-gray-100 rounded-lg">
            <h2 className="text-lg text-gray-600">No Tasks Available</h2>
            <p className="text-sm text-gray-500 mt-2">Start by creating a new task!</p>
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-center mt-8 space-x-4">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 rounded-md text-sm font-semibold transition ${
                currentPage === index + 1
                  ? "bg-blue-600 text-white shadow"
                  : "bg-gray-200 text-gray-600 hover:bg-blue-500 hover:text-white"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;