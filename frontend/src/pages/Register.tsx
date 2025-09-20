import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const [name, setName] = useState("Ana");
  const [email, setEmail] = useState("ana@ex.com");
  const [password, setPassword] = useState("123456");
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
    } else {
      setMsg(
        "Erro ao cadastrar. Verifique os dados (email pode já estar em uso)."
      );
    }
  }

  return (
    <div
      style={{
        maxWidth: 360,
        margin: "48px auto",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <h1 style={{ marginBottom: 16 }}>Cadastrar</h1>
      <form onSubmit={onSubmit}>
        <label>Nome</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          minLength={2}
          style={{ width: "100%", marginBottom: 12 }}
        />
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
          {loading ? "Enviando..." : "Cadastrar"}
        </button>
      </form>
      {msg && <p style={{ marginTop: 12 }}>{msg}</p>}
      <p style={{ marginTop: 16 }}>
        Já tem conta? <Link to="/login">Entrar</Link>
      </p>
    </div>
  );
}
