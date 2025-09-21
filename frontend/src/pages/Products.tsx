import { useEffect, useState } from "react";
import api, { request } from "../api/client";
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
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  function price(c: number) {
    return (c / 100).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  async function load() {
    setLoading(true);
    setErr("");
    const res = await request<{
      items: Product[];
      page: number;
      limit: number;
      total: number;
    }>(api.get(`/products?page=${page}&limit=${limit}`));
    setLoading(false);
    if (res.ok) {
      setItems(res.data.items);
      setTotal(res.data.total);
    } else setErr(res.error);
  }

  async function search() {
    const term = q.trim();
    if (!term) return load();
    setLoading(true);
    setErr("");
    const res = await request<{ items: Product[] }>(
      api.get(`/products/search?q=${encodeURIComponent(term)}`)
    );
    setLoading(false);
    if (res.ok) setItems(res.data.items);
    else setErr(res.error);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") search();
  }

  useEffect(() => {
    load(); /* eslint-disable-next-line */
  }, [page]);

  return (
    <>
      <div className="card" style={{ marginBottom: 16 }}>
        <div className="row" style={{ justifyContent: "space-between" }}>
          <h2 style={{ margin: 0, color: "var(--primary)" }}>Produtos</h2>
          <div className="row">
            <input
              className="input"
              placeholder="Buscar por código ou nome"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onKeyDown={onKeyDown}
              style={{ width: 260, borderColor: "#33a1a9" }}
            />
            <button className="btn" onClick={search}>
              Buscar
            </button>
          </div>
        </div>
        {loading && <p className="small">Carregando…</p>}
        {!loading && err && (
          <p style={{ color: "var(--danger)" }}>Erro: {err}</p>
        )}
      </div>

      <ul
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: 16,
          alignItems: "start",
          listStyle: "none",
          padding: 0,
        }}
      >
        {items.map((p) => (
          <li key={p.id} className="card">
            {p.image_url && (
              <img
                src={p.image_url}
                alt={p.name}
                style={{ width: "100%", borderRadius: 8, marginBottom: 8 }}
              />
            )}
            <div style={{ fontWeight: 700 }}>{p.name}</div>
            <div className="small">{p.code}</div>
            <div style={{ marginTop: 8, marginBottom: 8 }}>
              {price(p.price_cents)}
            </div>
            <UploadImage productId={p.id} onDone={load} />
            <AddToCart productId={p.id} />
          </li>
        ))}
      </ul>

      <div className="row" style={{ marginTop: 16, justifyContent: "center" }}>
        <button
          className="btn page"
          disabled={page <= 1}
          onClick={() => setPage((p) => p - 1)}
        >
          Anterior
        </button>
        <span className="small">Página {page}</span>
        <button
          className="btn page"
          disabled={page * limit >= total}
          onClick={() => setPage((p) => p + 1)}
        >
          Próxima
        </button>
      </div>
    </>
  );
}
