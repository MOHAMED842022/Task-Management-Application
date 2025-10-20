import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Auth/Login"; // correspond à ton fichier Login.jsx
import Register from "./components/Auth/Register"; // correspond à ton fichier Register.jsx
import TaskList from "./components/Tasks/TaskList"; // liste des tâches
import TaskFormPage from "./components/Tasks/TaskForm";

// page pour ajouter une tâche

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
