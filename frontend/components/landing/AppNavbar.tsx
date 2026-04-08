"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { clearToken, getToken } from "@/lib/auth";

export default function AppNavbar() {
  const router = useRouter();
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    setIsLogged(!!getToken());
  }, []);

  const handleLogout = () => {
    clearToken();
    setIsLogged(false);
    router.replace("/login");
  };

  return (
    <header className="bg-[#071522] text-white">
      <div className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="rounded-md bg-sky-500 px-2 py-1 text-xs font-bold">PJ</div>
          <span className="text-lg font-semibold">Puente Joven</span>
        </div>

        {isLogged ? (
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-md border border-sky-500 px-3 py-1.5 text-sm font-semibold text-sky-200 hover:bg-sky-900"
          >
            Cerrar Sesión
          </button>
        ) : (
          <nav className="flex items-center gap-3">
            <Link href="/login" className="text-sm font-semibold text-white hover:text-sky-200">
              Iniciar Sesión
            </Link>
            <Link
              href="/register"
              className="rounded-md bg-sky-500 px-3 py-1.5 text-sm font-semibold text-white hover:bg-sky-600"
            >
              Registrarse
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}

