"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { clearToken, getApiBaseUrl, getToken, getUser, saveUser } from "@/lib/auth";
import UserNav from "@/components/shared/UserNav";

export default function AppNavbar() {
  const router = useRouter();
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const token = getToken();
    setIsLogged(!!token);

    if (token && !getUser()) {
      fetch(`${getApiBaseUrl()}/auth/me`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => res.json())
      .then(payload => {
        if (payload.success) {
          saveUser(payload.user);
          // Re-trigger component update
          setIsLogged(false);
          setTimeout(() => setIsLogged(true), 0);
        }
      });
    }
  }, []);

  const handleLogout = () => {
    clearToken();
    setIsLogged(false);
    router.replace("/login");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10 text-white shadow-2xl">
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-3 group transition-transform hover:scale-105 active:scale-95">
          <img
            src={`${getApiBaseUrl().replace('/api', '')}/storage/Captura de pantalla 2026-04-08 123626.png`}
            alt="Puente Joven Logo"
            className="w-10 h-10 rounded-lg object-cover ring-2 ring-[#00b4ff]/30 shadow-lg"
          />
          <span className="text-xl font-black tracking-tight text-white group-hover:text-[#00b4ff] transition-colors">Puente Joven</span>
        </Link>

        <div className="flex items-center gap-6">
          {isLogged ? (
            <UserNav />
          ) : (
            <nav className="flex items-center gap-4">
              <Link href="/login" className="text-sm font-bold text-slate-300 hover:text-white transition-colors px-3">
                Iniciar Sesión
              </Link>
              <Link
                href="/register"
                className="rounded-xl bg-[#00b4ff] px-6 py-2.5 text-sm font-black text-white shadow-lg shadow-[#00b4ff]/20 transition-all hover:scale-105 hover:bg-white hover:text-black active:scale-95"
              >
                Registrarse
              </Link>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}
