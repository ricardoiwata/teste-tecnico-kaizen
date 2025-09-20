import { useState } from "react";
import api, { request } from "../api/client";

export default function AddToCart({ productId }: { productId: number }) {
  const [qty, setQty] = useState(1);
  const [msg, setMsg] = useState("");

  async function add() {
    const res = await request(
      api.post("/cart", { product_id: productId, quantity: qty })
    );
    setMsg(res.ok ? "Adicionado!" : "Erro ao adicionar");
    setTimeout(() => setMsg(""), 1200);
  }

  return (
    <div
      style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 8 }}
    >
      <input
        type="number"
        min={1}
        value={qty}
        onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))}
        style={{ width: 72 }}
      />
      <button onClick={add}>Adicionar</button>
      {msg && <small>{msg}</small>}
    </div>
  );
}
