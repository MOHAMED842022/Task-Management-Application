import React, { useEffect, useState } from "react";
import { getTasks, deleteTask } from "../../api";

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
      fetchTasks();
    } catch (err) {
      console.error("Erreur suppression task:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      {tasks.map((task) => (
        <div key={task._id}>
          <h3>{task.title}</h3>
          <button onClick={() => handleDelete(task._id)}>Supprimer</button>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
