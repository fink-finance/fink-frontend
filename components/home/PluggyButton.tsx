"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

// importa só no cliente (evita "window is not defined")
const PluggyConnect = dynamic(
  () => import("react-pluggy-connect").then(m => m.PluggyConnect),
  { ssr: false }
);

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:8000";

export default function PluggyButton() {
  const [connectToken, setConnectToken] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function openConnect() {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/v1/pluggy/connect-token`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (!data.connectToken) throw new Error("Resposta sem connectToken");
      setConnectToken(data.connectToken);
      setOpen(true);
    } catch (e: any) {
      alert(`Falha ao obter connectToken: ${e?.message ?? e}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        onClick={openConnect}
        disabled={loading}
        className="mt-3 rounded-md border px-3 py-2 text-sm font-medium bg-white hover:bg-gray-50"
      >
        {loading ? "Carregando..." : "Conectar conta"}
      </button>

      {connectToken && open && (
        <PluggyConnect
          connectToken={connectToken}
          includeSandbox
          language="pt"
          onSuccess={(data) => {
            console.log("Conectado!", data);
            alert(`Conexão criada! itemId: ${data?.item?.id ?? "?"}`);
            setOpen(false);
          }}
          onError={(err) => {
            console.error(err);
            alert(`Erro: ${err?.message ?? "desconhecido"}`);
          }}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
