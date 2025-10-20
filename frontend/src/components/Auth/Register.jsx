import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../api/api";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await register({ name, email, password });
      localStorage.setItem("token", data.token);
      alert("Inscription réussie !");
      navigate("/tasks");
    } catch (err) {
      console.error(err);
      alert("Erreur d'inscription");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nom"
        required
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Mot de passe"
        required
      />
      <button type="submit">S'inscrire</button>
    </form>
  );
};

export default Register;
