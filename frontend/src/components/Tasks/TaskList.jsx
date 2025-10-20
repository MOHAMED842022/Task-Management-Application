import React, { useEffect, useState } from "react";
import { getTasks, deleteTask } from "../../api/api.js";
import TaskForm from "./TaskForm";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(""); // pour afficher l'erreur

  const fetchTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
      setError(""); // réinitialiser l'erreur
    } catch (err) {
      console.error("Erreur chargement tasks:", err);
      setError("Impossible de charger les tâches. Vérifie que tu es connecté.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      console.error("Erreur suppression task:", err);
      alert("Impossible de supprimer la tâche");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <h2>Liste des tâches</h2>

      {/* Formulaire pour ajouter une tâche */}
      <TaskForm onTaskAdded={fetchTasks} />

      {/* Affichage d'erreur si la récupération échoue */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Liste des tâches */}
      {tasks.length === 0 && !error ? (
        <p>Aucune tâche disponible</p>
      ) : (
        tasks.map((task) => (
          <div key={task._id} style={{ marginBottom: "10px" }}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <button onClick={() => handleDelete(task._id)}>Supprimer</button>
          </div>
        ))
      )}
    </div>
  );
};

export default TaskList;
