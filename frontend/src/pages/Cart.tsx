import { useEffect, useState } from "react";
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

  function fPrice(cents: number) {
    return (cents / 100).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  async function load() {
    const res = await request<{ items: CartItem[]; total_cents: number }>(
      api.get("/cart")
    );
    if (res.ok) {
      setItems(res.data.items);
      setTotal(res.data.total_cents ?? 0);
    }
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
    <div
      style={{
        maxWidth: 760,
        margin: "32px auto",
        fontFamily: "Inter, system-ui, sans-serif",
      }}
    >
      <h2 style={{ marginBottom: 12 }}>Carrinho</h2>
      <button
        onClick={() => (window.location.href = "/products")}
        style={{ marginBottom: 16 }}
      >
        Voltar aos produtos
      </button>

      {items.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {items.map((it) => (
            <li
              key={it.id}
              style={{
                border: "1px solid #e5e7eb",
                borderRadius: 8,
                padding: 12,
                marginBottom: 12,
              }}
            >
              <div style={{ fontWeight: 600 }}>
                {it.Product.name}{" "}
                <small style={{ color: "#6b7280" }}>({it.Product.code})</small>
              </div>
              <div style={{ marginTop: 4 }}>
                {fPrice(it.Product.price_cents)}
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginTop: 8,
                }}
              >
                <label>Qtd:</label>
                <input
                  type="number"
                  min={1}
                  value={it.quantity}
                  onChange={(e) =>
                    updateQty(it.id, Math.max(1, parseInt(e.target.value) || 1))
                  }
                  style={{ width: 80 }}
                />
                <button onClick={() => removeItem(it.id)}>Remover</button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <h3 style={{ marginTop: 16 }}>Total: {fPrice(total)}</h3>
    </div>
  );
}
