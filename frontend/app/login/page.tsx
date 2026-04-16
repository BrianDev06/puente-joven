"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getApiBaseUrl, getToken, saveToken, saveUser } from "@/lib/auth";

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
      saveUser(payload.user);
      router.replace("/inicio");
    } catch {
      setError("No se pudo conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f8fbff] px-4 relative overflow-hidden selection:bg-[#00b4ff]/20">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-[#00b4ff]/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-black/10 rounded-full blur-[100px]" />

      <section className="w-full max-w-md relative z-10">
        <div className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] ring-1 ring-slate-200 p-10 backdrop-blur-xl bg-white/90 border border-slate-100">
          <div className="mb-10 flex flex-col items-center text-center">
            <img 
              src={`${getApiBaseUrl().replace('/api', '')}/storage/Captura de pantalla 2026-04-08 123626.png`} 
              alt="Puente Joven Logo" 
              className="w-28 h-28 rounded-3xl object-cover shadow-2xl shadow-[#00b4ff]/30 mb-6 ring-4 ring-white"
            />
            <h1 className="text-3xl font-black tracking-tight text-black">Bienvenido</h1>
            <p className="mt-2 text-slate-500 font-medium">Portal Talento-Empresa</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-1.5">
              <label className="block text-sm font-bold text-slate-700 ml-1">Correo Electrónico</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400 group-focus-within:text-[#00b4ff] transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                </div>
                <input
                  type="email"
                  placeholder="ejemplo@correo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-2xl border border-slate-300 bg-slate-50 pl-12 pr-4 py-4 text-sm text-black placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-inset focus:ring-[#00b4ff] focus:border-[#00b4ff] outline-none transition-all duration-300 shadow-sm"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-sm font-bold text-slate-700 ml-1">Contraseña</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400 group-focus-within:text-[#00b4ff] transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                </div>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-2xl border border-slate-300 bg-slate-50 pl-12 pr-4 py-4 text-sm text-black placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-inset focus:ring-[#00b4ff] focus:border-[#00b4ff] outline-none transition-all duration-300 shadow-sm"
                  required
                />
              </div>
            </div>

            {error ? (
              <div className="flex items-center gap-2 p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 animate-shake">
                <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                <p className="text-sm font-bold">{error}</p>
              </div>
            ) : null}

            <button
              type="submit"
              disabled={loading}
              className="group relative w-full h-14 overflow-hidden rounded-2xl bg-black text-base font-bold text-white shadow-xl shadow-black/20 ring-1 ring-black transition-all duration-300 hover:scale-[1.02] hover:bg-slate-900 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    Validando...
                  </>
                ) : (
                  <>
                    Iniciar Sesión
                    <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                  </>
                )}
              </span>
              <div className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full transition-transform duration-700 ease-in-out group-hover:translate-x-full"></div>
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-slate-100 text-center">
            <p className="text-sm font-medium text-slate-500">
              ¿Aún no eres parte?{" "}
              <Link href="/register" className="font-extrabold text-[#00b4ff] hover:text-black transition-colors inline-flex items-center gap-1 group">
                Regístrate ahora
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
