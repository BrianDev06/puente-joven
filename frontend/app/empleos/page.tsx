"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import EmpleosBoard, { Empleo } from "@/components/empleos/EmpleosBoard";
import { authHeaders, clearToken, getApiBaseUrl, getToken } from "@/lib/auth";

type ApiResponse = {
  success: boolean;
  data: Empleo[];
  total: number;
};

export default function EmpleosPage() {
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [empleos, setEmpleos] = useState<Empleo[]>([]);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.replace("/login");
      return;
    }

    const verifyAndLoad = async () => {
      try {
        const meResponse = await fetch(`${getApiBaseUrl()}/auth/me`, {
          headers: { Accept: "application/json", ...authHeaders() },
        });

        if (!meResponse.ok) {
          clearToken();
          router.replace("/login");
          return;
        }

        const jobsResponse = await fetch(`${getApiBaseUrl()}/puentes`, {
          headers: { Accept: "application/json", ...authHeaders() },
          cache: "no-store",
        });

        if (!jobsResponse.ok) {
          setError("No se pudieron cargar las ofertas.");
          return;
        }

        const payload: ApiResponse = await jobsResponse.json();
        if (!payload.success) {
          setError("No se pudieron cargar las ofertas.");
          return;
        }

        setEmpleos(payload.data);
      } catch {
        setError("Error de conexión con el servidor.");
      } finally {
        setCheckingAuth(false);
        setLoading(false);
      }
    };

    verifyAndLoad();
  }, [router]);

  const handleLogout = () => {
    clearToken();
    router.replace("/login");
  };

  if (checkingAuth || loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#eef1f5]">
        <p className="text-slate-600">Cargando portal de empleos...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#eef1f5] px-4">
        <div className="rounded-xl border border-red-300 bg-white p-6 text-center">
          <p className="text-red-600">{error}</p>
          <button
            type="button"
            onClick={() => router.refresh()}
            className="mt-4 rounded-md bg-sky-500 px-4 py-2 font-semibold text-white"
          >
            Reintentar
          </button>
        </div>
      </main>
    );
  }

  return <EmpleosBoard empleos={empleos} onLogout={handleLogout} />;
}

