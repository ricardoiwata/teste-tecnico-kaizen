import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("ana@ex.com");
  const [password, setPassword] = useState("123456");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const nav = useNavigate();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const ok = await login(email, password);
    setLoading(false);
    if (ok) nav("/products");
    else setError("Credenciais inválidas");
  }

  return (
    <div
      style={{
        maxWidth: 360,
        margin: "48px auto",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <h1 style={{ marginBottom: 16 }}>Entrar</h1>
      <form onSubmit={onSubmit}>
        <label>Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          type="email"
          style={{ width: "100%", marginBottom: 12 }}
        />
        <label>Senha</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
          type="password"
          style={{ width: "100%", marginBottom: 12 }}
        />
        <button type="submit" disabled={loading} style={{ marginTop: 8 }}>
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>
      {error && <p style={{ color: "tomato", marginTop: 12 }}>{error}</p>}
      <p style={{ marginTop: 16 }}>
        Não tem conta? <Link to="/register">Cadastrar</Link>
      </p>
    </div>
  );
}
