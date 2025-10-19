// server.js
require("dotenv").config(); // Charger les variables d'environnement
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db"); // Votre fichier de connexion MongoDB

// Routes
const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/tasks");

const app = express();

// Port depuis .env ou 5000 par défaut
const PORT = process.env.PORT || 5000;

// Connecter à la base de données
connectDB();

// Middleware
app.use(cors());
app.use(express.json()); // Pour parser le JSON des requêtes

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// Route de test
app.get("/", (req, res) => {
  res.send("ToDo App Pro API");
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
