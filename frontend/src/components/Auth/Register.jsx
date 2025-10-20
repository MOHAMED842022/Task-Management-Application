import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../api/api.js";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await register({ email, password });
      console.log("Inscription réussie :", res);
      setError("");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Erreur inscription");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Mot de passe"
      />
      <button type="submit">S’inscrire</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
};

export default Register;
