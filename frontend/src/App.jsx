import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Task from './pages/Task'
import CreateTask from './pages/CreateTask'
import ProtectedRoute from './components/ProtectedRoute'
import UpdateForm from './components/UpdateForm'
import AssignedTasks from './pages/AssignedTasks'
import Dashboard from './pages/Dashboard'

function App() {

    return (
      <>
        <Router>
          <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/AssignedTasks" element={<ProtectedRoute><AssignedTasks /></ProtectedRoute>} />
          <Route path="/createtask" element={<ProtectedRoute><CreateTask /></ProtectedRoute>} />
          <Route path="/updatetask" element={<ProtectedRoute><UpdateForm /></ProtectedRoute>} />
          <Route path="/task/:id" element={<ProtectedRoute><Task /></ProtectedRoute>} />
          </Routes>
        </Router>
      </>
    )
  }


export default App