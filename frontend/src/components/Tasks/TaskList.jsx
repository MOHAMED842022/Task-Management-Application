import React, { useEffect, useState } from "react";
import { getTasks, deleteTask } from "../../api/api.js"; // ✅ Utilisation de api.js

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      console.error("Erreur chargement tasks:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((task) => task._id !== id));
    } catch (err) {
      console.error("Erreur suppression task:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      {tasks.length === 0 ? (
        <p>Aucune tâche disponible</p>
      ) : (
        tasks.map((task) => (
          <div key={task._id}>
            <h3>{task.title}</h3>
            <button onClick={() => handleDelete(task._id)}>Supprimer</button>
          </div>
        ))
      )}
    </div>
  );
};

export default TaskList;
