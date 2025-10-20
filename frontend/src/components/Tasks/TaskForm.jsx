import React from "react";
import { useNavigate } from "react-router-dom";
import TaskForm from "./TaskForm"; // le composant de formulaire réel

const TaskFormPage = () => {
  // 🔹 renommé ici pour éviter le conflit
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
