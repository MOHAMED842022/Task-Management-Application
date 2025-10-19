// routes/tasks.js
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Task = require("../models/Task");

// ===== Middleware d'authentification =====
const auth = (req, res, next) => {
  // Le token peut venir de x-auth-token ou Authorization: Bearer ...
  const bearerHeader = req.header("Authorization");
  let token = req.header("x-auth-token");

  if (bearerHeader && bearerHeader.startsWith("Bearer ")) {
    token = bearerHeader.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    console.error("JWT verification failed:", err.message);
    res.status(401).json({ msg: "Token is not valid" });
  }
};

// ====== Récupérer toutes les tâches d’un utilisateur ======
router.get("/", auth, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(tasks);
  } catch (err) {
    console.error("Error fetching tasks:", err.message);
    res.status(500).send("Server error");
  }
});

// ====== Créer une nouvelle tâche ======
router.post("/", auth, async (req, res) => {
  const { title, description } = req.body;

  if (!title) {
    return res.status(400).json({ msg: "Title is required" });
  }

  try {
    const newTask = new Task({
      user: req.user.id,
      title,
      description,
    });

    const task = await newTask.save();
    res.status(201).json(task);
  } catch (err) {
    console.error("Error creating task:", err.message);
    res.status(500).send("Server error");
  }
});

// ====== Modifier une tâche ======
router.put("/:id", auth, async (req, res) => {
  const { title, description, completed } = req.body;

  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    // Mise à jour des champs
    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (completed !== undefined) task.completed = completed;

    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (err) {
    console.error("Error updating task:", err.message);
    res.status(500).send("Server error");
  }
});

// ====== Supprimer une tâche ======
router.delete("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    await task.deleteOne();
    res.json({ msg: "Task removed" });
  } catch (err) {
    console.error("Error deleting task:", err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
