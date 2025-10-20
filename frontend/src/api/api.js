import axios from "axios";

// Création d’une instance Axios
const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Ajouter le token JWT si présent (sauf pour login et register)
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (
    token &&
    !req.url.includes("/auth/login") &&
    !req.url.includes("/auth/register")
  ) {
    req.headers.Authorization = `Bearer ${token}`;
  }
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

// --- TASKS ---
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
