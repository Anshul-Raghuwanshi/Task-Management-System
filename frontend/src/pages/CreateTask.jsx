import React, { useState, useEffect } from "react";
import TaskForm from "../components/CreateForm";

const CreateTask = () => {
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    setAdmin(JSON.parse(localStorage.getItem("admin")));
  }, []);

  if (admin) {
    return (
      <div className="bg-teal-50 min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-xl w-full sm:w-96 md:w-[500px] lg:w-[600px]">
          <h2 className="text-3xl font-bold text-teal-700 mb-6 text-center">Create New Task</h2>
          <p className="text-gray-600 text-center text-lg mb-4">
            Please fill in the details to create a new task and assign it to your team members.
          </p>
          <TaskForm />
        </div>
      </div>
    );
  } else {
    return (
      <div className="bg-teal-50 min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-xl w-full sm:w-96 md:w-[500px] lg:w-[600px]">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Access Restricted</h2>
          <p className="text-gray-600 text-center text-lg mb-6">
            You do not have the necessary permissions to access this page. Please contact the admin for access.
          </p>
          <div className="text-center">
            <button
              onClick={() => window.location.href = "/dashboard"}
              className="w-full px-6 py-3 bg-teal-500 text-white font-semibold rounded-lg shadow-md hover:bg-teal-600 focus:ring-2 focus:ring-teal-400 transition duration-200 ease-in-out"
            >
              Return to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default CreateTask;