import { useState } from "react";
import api, { request } from "../api/client";

export default function UploadImage({
  productId,
  onDone,
}: {
  productId: number;
  onDone: () => void;
}) {
  const [busy, setBusy] = useState(false);

  async function pickAndUpload() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;
      setBusy(true);

      const sign = await request<{ uploadUrl: string; fileUrl: string }>(
        api.post(`/products/${productId}/image/sign`, {
          contentType: file.type,
        })
      );
      if (!sign.ok) {
        setBusy(false);
        alert("Erro ao assinar");
        return;
      }

      const put = await fetch(sign.data.uploadUrl, {
        method: "PUT",
        headers: { "Content-Type": file.type },
        body: file,
      });
      if (!put.ok) {
        setBusy(false);
        alert("Erro ao enviar");
        return;
      }

      const save = await request(
        api.patch(`/products/${productId}/image`, {
          image_url: sign.data.fileUrl,
        })
      );
      setBusy(false);
      if (!save.ok) {
        alert("Erro ao salvar URL");
        return;
      }

      onDone();
    };
    input.click();
  }

  return (
    <button className="btn upload" onClick={pickAndUpload} disabled={busy}>
      {busy ? "Enviando..." : "Enviar imagem"}
    </button>
  );
}
