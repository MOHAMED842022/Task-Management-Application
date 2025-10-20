// frontend/src/components/Tasks/TaskFormPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import TaskForm from "./TaskForm";

const TaskFormPage = () => {
  const navigate = useNavigate();

  const handleTaskAdded = () => {
    navigate("/tasks"); // redirige après ajout
  };

  return (
    <div>
      <h2>Ajouter une tâche</h2>
      <TaskForm onTaskAdded={handleTaskAdded} />
    </div>
  );
};

export default TaskFormPage;
