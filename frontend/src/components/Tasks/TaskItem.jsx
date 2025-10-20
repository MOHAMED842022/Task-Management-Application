import React from "react";
import API from "../../api";

const TaskItem = ({ task, onTaskUpdated }) => {
  const deleteTask = async () => {
    if (!window.confirm("Delete this task?")) return;
    try {
      await API.delete(`/tasks/${task._id}`);
      onTaskUpdated();
    } catch (err) {
      alert("Delete failed");
    }
  };

  return (
    <li>
      <b>{task.title}</b> - {task.description} {task.completed && "(Completed)"}
      <button onClick={deleteTask}>❌</button>
    </li>
  );
};

export default TaskItem;
