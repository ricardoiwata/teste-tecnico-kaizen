import { useEffect, useState } from "react";
import api, { request } from "../api/client";
import { useAuth } from "../context/AuthContext";
import AddToCart from "../components/AddToCart";
import UploadImage from "../components/UploadImage";

type Product = {
  id: number;
  code: string;
  name: string;
  price_cents: number;
  image_url?: string | null;
};

export default function Products() {
  const [items, setItems] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(12);
  const [total, setTotal] = useState(0);
  const [q, setQ] = useState("");
  const { logout } = useAuth();

  function fPrice(cents: number) {
    return (cents / 100).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  async function load() {
    const res = await request<{
      items: Product[];
      page: number;
      limit: number;
      total: number;
    }>(api.get(`/products?page=${page}&limit=${limit}`));
    if (res.ok) {
      setItems(res.data.items);
      setTotal(res.data.total);
    }
  }

  async function search() {
    const term = q.trim();
    if (!term) return load();
    const res = await request<{ items: Product[] }>(
      api.get(`/products/search?q=${encodeURIComponent(term)}`)
    );
    if (res.ok) setItems(res.data.items);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <div
      style={{
        maxWidth: 920,
        margin: "32px auto",
        fontFamily: "Inter, system-ui, sans-serif",
      }}
    >
      <header
        style={{
          display: "flex",
          gap: 12,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h2 style={{ margin: 0 }}>Produtos</h2>
        <div style={{ display: "flex", gap: 8 }}>
          <input
            placeholder="Buscar por código (ex.: P-0001) ou nome"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <button onClick={search}>Buscar</button>
          <button onClick={() => (window.location.href = "/cart")}>
            Carrinho
          </button>
          <button onClick={logout}>Sair</button>
        </div>
      </header>

      <ul
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 16,
          padding: 0,
          listStyle: "none",
          marginTop: 16,
        }}
      >
        {items.map((p) => (
          <li
            key={p.id}
            style={{
              border: "1px solid #e5e7eb",
              borderRadius: 8,
              padding: 16,
            }}
          >
            <div style={{ fontWeight: 600 }}>{p.name}</div>
            <div style={{ color: "#6b7280", fontSize: 13 }}>{p.code}</div>
            <div style={{ marginTop: 8 }}>{fPrice(p.price_cents)}</div>
            {p.image_url && (
              <img
                src={p.image_url}
                alt={p.name}
                style={{ width: "100%", marginTop: 8, borderRadius: 6 }}
              />
            )}
            <AddToCart productId={p.id} />
            <UploadImage productId={p.id} onDone={load} />
          </li>
        ))}
      </ul>

      <footer
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginTop: 16,
        }}
      >
        <button disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
          Anterior
        </button>
        <span>Página {page}</span>
        <button
          disabled={page * limit >= total}
          onClick={() => setPage((p) => p + 1)}
        >
          Próxima
        </button>
      </footer>
    </div>
  );
}
