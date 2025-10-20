import axios from "axios";

// Création d’une instance Axios
const API = axios.create({
  baseURL: "http://localhost:5000/api", // ton backend
});

// Ajouter le token JWT si présent
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

// --- AUTH ---
export const login = async (credentials) => {
  const res = await API.post("/auth/login", credentials);
  return res.data;
};

export const register = async (data) => {
  const res = await API.post("/auth/register", data);
  return res.data;
};

// --- TASKS (au besoin plus tard) ---
export const getTasks = async () => {
  const res = await API.get("/tasks");
  return res.data;
};

export const createTask = async (taskData) => {
  const res = await API.post("/tasks", taskData);
  return res.data;
};

export const deleteTask = async (id) => {
  const res = await API.delete(`/tasks/${id}`);
  return res.data;
};

export default API;
