import React, { useEffect, useState } from "react";
import axios from "axios";

const AssignedTasks = () => {
  const [mytasks, setMytasks] = useState([]);
  const myID = localStorage.getItem("userID");
  const ID = JSON.parse(myID);

  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5;

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = mytasks.slice(indexOfFirstTask, indexOfLastTask);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(mytasks.length / tasksPerPage);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/task/getmytasks/${ID}`)
      .then((res) => {
        setMytasks(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">
          Assigned Task List
        </h1>

        <div className="overflow-hidden bg-teal-100 shadow-md rounded-lg">
          <table className="min-w-full table-auto">
            <thead className="bg-teal-500 text-white">
              <tr>
                <th className="px-6 py-3 text-left">Title</th>
                <th className="px-6 py-3 text-left">Description</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left">Priority</th>
                <th className="px-6 py-3 text-left">Due Date</th>
              </tr>
            </thead>
            <tbody>
              {currentTasks.length > 0 ? (
                currentTasks.map((task, index) => (
                  <tr
                    key={index}
                    className="border-b hover:bg-gray-100 transition"
                  >
                    <td className="px-6 py-4">{task.title}</td>
                    <td className="px-6 py-4">{task.description}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          task.status === "Completed"
                            ? "bg-green-500 text-white"
                            : task.status === "In Progress"
                            ? "bg-yellow-500 text-white"
                            : "bg-red-500 text-white"
                        }`}
                      >
                        {task.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {task.priority ? "High" : "Normal"}
                    </td>
                    <td className="px-6 py-4">
                      {new Date(task.dueDate).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No tasks assigned yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-6">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 bg-teal-500 text-white rounded-md mr-2 ${
                currentPage === 1
                  ? "bg-gray-300 cursor-not-allowed"
                  : "hover:bg-teal-600"
              }`}
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`px-4 py-2 rounded-md mx-1 ${
                  currentPage === index + 1
                    ? "bg-teal-500 text-white"
                    : "bg-white text-teal-500 border border-teal-500"
                } hover:bg-teal-500 hover:text-white transition`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 bg-teal-500 text-white rounded-md ml-2 ${
                currentPage === totalPages
                  ? "bg-gray-300 cursor-not-allowed"
                  : "hover:bg-teal-600"
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssignedTasks;