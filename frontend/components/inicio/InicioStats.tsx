"use client";

import { useEffect, useState } from "react";

type ApiResponse = {
  success: boolean;
  data: Array<{ id: number; estado: string }>;
  total: number;
};

export default function InicioStats() {
  const [total, setTotal] = useState<number | null>(null);
  const [activas, setActivas] = useState<number | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
        const response = await fetch(`${apiUrl}/puentes`, { cache: "no-store" });
        if (!response.ok) return;
        const payload: ApiResponse = await response.json();
        if (!payload.success) return;

        setTotal(payload.total);
        setActivas(payload.data.filter((item) => item.estado === "activo").length);
      } catch {
        setTotal(null);
        setActivas(null);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
      <div className="rounded-full border border-sky-200 bg-sky-50 px-4 py-2 text-sm text-sky-800">
        {total === null ? "Ofertas: --" : `Ofertas publicadas: ${total}`}
      </div>
      <div className="rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm text-emerald-800">
        {activas === null ? "Activas: --" : `Ofertas activas: ${activas}`}
      </div>
    </div>
  );
}

