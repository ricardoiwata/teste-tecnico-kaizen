import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api, { request } from "../api/client";

type Product = { id: number; code: string; name: string; price_cents: number };
type CartItem = {
  id: number;
  product_id: number;
  quantity: number;
  Product: Product;
};

export default function Cart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const nav = useNavigate();

  function price(c: number) {
    return (c / 100).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  async function load() {
    setLoading(true);
    setErr("");
    const res = await request<{ items: CartItem[]; total_cents: number }>(
      api.get("/cart")
    );
    setLoading(false);
    if (res.ok) {
      setItems(res.data.items);
      setTotal(res.data.total_cents || 0);
    } else setErr(res.error);
  }
  useEffect(() => {
    load();
  }, []);

  async function updateQty(id: number, quantity: number) {
    if (quantity < 1) return;
    const res = await request(api.put(`/cart/${id}`, { quantity }));
    if (res.ok) load();
  }
  async function removeItem(id: number) {
    const res = await request(api.delete(`/cart/${id}`));
    if (res.ok) load();
  }

  return (
    <>
      <div className="card" style={{ marginBottom: 16 }}>
        <div className="row" style={{ justifyContent: "space-between" }}>
          <h2 style={{ margin: 0, color: "var(--primary)" }}>Carrinho</h2>
          <div className="row">
            <button className="btn ghost" onClick={() => nav("/products")}>
              Voltar aos produtos
            </button>
          </div>
        </div>
        {loading && <p className="small">Carregando…</p>}
        {!loading && err && (
          <p style={{ color: "var(--danger)" }}>Erro: {err}</p>
        )}
      </div>

      {items.length === 0 ? (
        <div className="card">Seu carrinho está vazio.</div>
      ) : (
        <ul style={{ listStyle: "none", padding: 0, display: "grid", gap: 12 }}>
          {items.map((it) => (
            <li key={it.id} className="card">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <div>
                  <div style={{ fontWeight: 700 }}>{it.Product.name}</div>
                  <div className="small">{it.Product.code}</div>
                  <div style={{ marginTop: 6 }}>
                    {price(it.Product.price_cents)}
                  </div>
                </div>
                <div className="row">
                  <input
                    className="input"
                    type="number"
                    min={1}
                    value={it.quantity}
                    onChange={(e) =>
                      updateQty(
                        it.id,
                        Math.max(1, parseInt(e.target.value) || 1)
                      )
                    }
                    style={{ width: 96 }}
                  />
                  <button
                    className="btn danger"
                    onClick={() => removeItem(it.id)}
                  >
                    Remover
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div
        className="card"
        style={{
          marginTop: 16,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <strong>Total</strong>
        <span
          style={{ color: "var(--primary)", fontSize: 20, fontWeight: 800 }}
        >
          {price(total)}
        </span>
      </div>
    </>
  );
}
