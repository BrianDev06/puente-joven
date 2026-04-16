"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { clearToken, getUser } from "@/lib/auth";

export default function UserNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    setUser(getUser());

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    clearToken();
    router.replace("/login");
  };

  if (!user) return (
    <div className="flex h-10 w-10 animate-pulse items-center justify-center rounded-full bg-slate-200 shadow-md">
    </div>
  );

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-full bg-black/5 p-1 transition-all hover:bg-black/10 focus:ring-2 focus:ring-[#00b4ff] focus:ring-offset-2"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-black to-slate-800 text-sm font-bold text-white shadow-md ring-2 ring-white">
          {user.name.slice(0, 1).toUpperCase()}
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-56 origin-top-right rounded-2xl bg-white p-2 shadow-2xl ring-1 ring-black/5 animate-fade-in z-[100]">
          <div className="px-4 py-3 border-b border-slate-50 mb-1">
            <p className="text-sm font-bold text-black truncate">{user.name}</p>
            <p className="text-xs font-medium text-slate-500 truncate">{user.email}</p>
            <span className="mt-1.5 inline-block rounded-full bg-[#00b4ff]/10 px-2 py-0.5 text-[10px] font-black uppercase text-[#00b4ff]">
              {user.user_type}
            </span>
          </div>
          
          <div className="space-y-1">
            <Link
              href="/perfil"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 w-full px-3 py-2 text-sm font-bold text-slate-700 rounded-xl hover:bg-slate-50 hover:text-[#00b4ff] transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
              Ver Perfil
            </Link>
            <Link
              href="/perfil?edit=true"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 w-full px-3 py-2 text-sm font-bold text-slate-700 rounded-xl hover:bg-slate-50 hover:text-[#00b4ff] transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
              Editar Perfil
            </Link>
          </div>
          
          <div className="mt-1 pt-1 border-t border-slate-50">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 w-full px-3 py-2 text-sm font-bold text-red-600 rounded-xl hover:bg-red-50 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
              Cerrar Sesión
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
