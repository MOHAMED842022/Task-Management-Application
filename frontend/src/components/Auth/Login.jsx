import React, { useState } from "react";
import { login } from "../../api/api.js";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login({ email, password });
      localStorage.setItem("token", data.token);
      alert("Connecté !");
    } catch (err) {
      console.error(err);
      alert("Erreur de connexion");
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
        placeholder="Mot de passe"
        type="password"
      />
      <button type="submit">Se connecter</button>
    </form>
  );
};

export default LoginForm;
