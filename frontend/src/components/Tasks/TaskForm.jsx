import React, { useState } from "react";
import { createTask } from "../../api/api";

const TaskForm = ({ onTaskAdded }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) return alert("Le titre est requis !");
    try {
      await createTask({ title, description });
      setTitle("");
      setDescription("");
      onTaskAdded();
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l'ajout de la tâche");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Titre de la tâche"
        required
      />
      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <button type="submit">Ajouter</button>
    </form>
  );
};

export default TaskForm;
