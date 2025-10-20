import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import TaskList from "./components/Tasks/TaskList";
import TaskFormPage from "./components/Tasks/TaskFormPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tasks" element={<TaskList />} />
        <Route path="/tasks/add" element={<TaskFormPage />} />
      </Routes>
    </Router>
  );
}

export default App;
