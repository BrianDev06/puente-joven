"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getApiBaseUrl, getToken, saveToken } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (getToken()) {
      router.replace("/inicio");
    }
  }, [router]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${getApiBaseUrl()}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const payload = await response.json();

      if (!response.ok || !payload.success) {
        setError(payload.message || "No se pudo iniciar sesión.");
        return;
      }

      saveToken(payload.token);
      router.replace("/inicio");
    } catch {
      setError("No se pudo conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f3f4f6] px-4">
      <section className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-4 flex justify-center">
          <div className="rounded-md bg-sky-500 px-3 py-2 text-lg font-bold text-white">PJ</div>
        </div>
        <h1 className="text-center text-4xl font-bold text-slate-900">Iniciar Sesión</h1>
        <p className="mt-2 text-center text-slate-500">Accede a tu portal de empleo</p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-700">Correo Electrónico</label>
            <input
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-black bg-slate-100 px-3 py-2 text-black placeholder:text-slate-500 outline-none focus:border-black"
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-700">Contraseña</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-black bg-slate-100 px-3 py-2 text-black placeholder:text-slate-500 outline-none focus:border-black"
              required
            />
          </div>

          {error ? <p className="text-sm text-red-600">{error}</p> : null}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-sky-500 py-2 font-semibold text-white transition hover:bg-sky-600 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Entrando..." : "Iniciar Sesión"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-slate-500">
            ¿No tienes cuenta?{" "}
            <Link href="/register" className="font-semibold text-sky-600 hover:underline">
              Regístrate aquí
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}

