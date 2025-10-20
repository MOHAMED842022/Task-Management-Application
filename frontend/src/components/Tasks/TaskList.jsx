// frontend/src/components/Tasks/TaskList.jsx
import React, { useEffect, useState } from "react";
import { getTasks } from "../../api/api";
import TaskForm from "./TaskForm";
import TaskItem from "./TaskItem";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  // Charger les tâches depuis l'API
  const fetchTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      console.error("Erreur chargement tasks:", err);
      alert("Impossible de charger les tâches.");
    }
  };

  // Appelé après ajout ou suppression pour rafraîchir la liste
  const handleTaskUpdated = () => {
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <h2>Liste des tâches</h2>

      {/* Formulaire pour ajouter une tâche */}
      <TaskForm onTaskAdded={handleTaskUpdated} />

      {/* Liste des tâches */}
      {tasks.length === 0 ? (
        <p>Aucune tâche disponible</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <TaskItem
              key={task._id}
              task={task}
              onTaskUpdated={handleTaskUpdated}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
