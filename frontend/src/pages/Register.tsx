import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo-kaizen.png";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const nav = useNavigate();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg("");
    setLoading(true);
    const ok = await register(name, email, password);
    setLoading(false);
    if (ok) {
      setMsg("Conta criada! Faça login.");
      nav("/login");
    } else setMsg("Erro ao cadastrar. Verifique os dados.");
  }

  const isErrorMessage = msg.toLowerCase().includes("erro");

  return (
    <div className="auth-layout">
      <div className="auth-card">
        <div className="auth-brand">
          <img src={logo} alt="Kaizen Autopeças" className="auth-logo" />
          <div>
            <h2>Crie sua conta</h2>
            <p className="auth-subtitle">
              Cadastre-se para acessar o catálogo e o carrinho.
            </p>
          </div>
        </div>
        <form className="auth-form" onSubmit={onSubmit}>
          <label className="label">Nome</label>
          <input
            className="input"
            required
            minLength={2}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Seu nome"
          />
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
            placeholder="mínimo 6 caracteres"
          />
          <div className="auth-actions">
            <button className="btn" type="submit" disabled={loading}>
              {loading ? "Enviando..." : "Cadastrar"}
            </button>
            <Link to="/login" className="small">
              Já tenho conta
            </Link>
          </div>
          {msg && (
            <p
              className="auth-feedback"
              style={{ color: isErrorMessage ? "var(--danger)" : "var(--success)" }}
            >
              {msg}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
