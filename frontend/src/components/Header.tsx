import { Link } from "react-router-dom";
import logo from "../assets/logo-kaizen.png";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { logout } = useAuth();
  return (
    <header
      style={{
        background: "var(--card)",
        borderBottom: "1px solid var(--border)",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div
        className="container"
        style={{
          display: "grid",
          gridTemplateColumns: "auto 1fr auto",
          alignItems: "center",
          padding: "12px 0",
          margin: "0 auto",
          columnGap: 32,
        }}
      >
        <div className="row" style={{ gap: 16, justifyContent: "flex-start" }}>
          <img src={logo} alt="Kaizen" style={{ height: 40 }} />
        </div>
        <nav
          className="row"
          style={{ gap: 12, justifyContent: "center", justifySelf: "center" }}
        >
          <Link to="/products">Produtos</Link>
          <Link to="/cart">Carrinho</Link>
        </nav>
        <div className="row" style={{ gap: 8, justifyContent: "flex-end" }}>
          <button className="btn logout" onClick={logout}>
            Sair
          </button>
        </div>
      </div>
    </header>
  );
}
