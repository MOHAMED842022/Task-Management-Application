// frontend/src/components/Tasks/TaskFormPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import TaskForm from "./TaskForm";

const TaskFormPage = () => {
  const navigate = useNavigate();

  const handleTaskAdded = () => {
    // Après ajout, rediriger vers la liste des tâches
    navigate("/tasks");
  };

  return (
    <div>
      <h2>Ajouter une tâche</h2>
      <TaskForm onTaskAdded={handleTaskAdded} />
    </div>
  );
};

export default TaskFormPage;
