import React, { useState } from "react";
// ✅ Import correct de tes fonctions API
import { login } from "../../api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password });
      console.log("Login réussi :", res);
      localStorage.setItem("token", res.token);
      setError("");
      // redirection vers dashboard si nécessaire
    } catch (err) {
      setError(err.response?.data?.message || "Erreur login");
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
      <button type="submit">Se connecter</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default Login;
