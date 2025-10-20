import React from "react";
import { deleteTask } from "../../api"; // utilisation cohérente de api.js

const TaskItem = ({ task, onTaskUpdated }) => {
  const handleDelete = async () => {
    if (!window.confirm("Supprimer cette tâche ?")) return;
    try {
      await deleteTask(task._id);
      onTaskUpdated(); // notifie le parent de mettre à jour la liste
    } catch (err) {
      alert(err.response?.data?.message || "Échec de la suppression");
    }
  };

  return (
    <li>
      <b>{task.title}</b> - {task.description} {task.completed && "(Terminé)"}
      <button onClick={handleDelete} style={{ marginLeft: "10px" }}>
        ❌
      </button>
    </li>
  );
};

export default TaskItem;
