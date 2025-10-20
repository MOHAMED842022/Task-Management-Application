require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

// Routes
const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/tasks");

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Connexion à MongoDB
connectDB();

// ✅ Middleware
app.use(
  cors({
    origin: "http://localhost:3000", // ton frontend
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

// ✅ Routes API
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// ✅ Route test
app.get("/", (req, res) => {
  res.send("ToDo App API fonctionne !");
});

// ✅ Lancement serveur
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
