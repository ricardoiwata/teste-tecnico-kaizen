import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo-kaizen.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    <div className="auth-layout">
      <div className="auth-card">
        <div className="auth-brand">
          <img src={logo} alt="Kaizen Autopeças" className="auth-logo" />
          <div>
            <h2>Bem-vindo de volta</h2>
            <p className="auth-subtitle">
              Acesse com suas credenciais para continuar.
            </p>
          </div>
        </div>
        <form className="auth-form" onSubmit={onSubmit}>
          <label className="label">Email</label>
          <input
            className="input"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seu@email.com"
          />
          <label className="label">Senha</label>
          <input
            className="input"
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••"
          />
          <div className="auth-actions">
            <button className="btn" type="submit" disabled={loading}>
              {loading ? "Entrando..." : "Entrar"}
            </button>
            <Link
              to="/register"
              style={{ textDecoration: "underline" }}
              className="small"
            >
              Criar conta
            </Link>
          </div>
          {error && (
            <p className="auth-feedback" style={{ color: "var(--danger)" }}>
              {error}
            </p>
          )}
        </form>
        <div className="auth-footer">
          <span>Ainda não tem conta?</span>
          <br />
          <Link to="/register" style={{ textDecoration: "underline" }}>
            Criar cadastro
          </Link>
        </div>
      </div>
    </div>
  );
}
