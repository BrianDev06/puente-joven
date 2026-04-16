"use client";

import AppNavbar from "@/components/landing/AppNavbar";
import HeroSection from "@/components/landing/HeroSection";
import ProfilesSection from "@/components/landing/ProfilesSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import FinalCtaSection from "@/components/landing/FinalCtaSection";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authHeaders, clearToken, getApiBaseUrl, getToken, saveUser } from "@/lib/auth";

export default function InicioPage() {
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.replace("/login");
      return;
    }

    const verify = async () => {
      try {
        const response = await fetch(`${getApiBaseUrl()}/auth/me`, {
          headers: {
            Accept: "application/json",
            ...authHeaders(),
          },
        });

        if (!response.ok) {
          clearToken();
          router.replace("/login");
          return;
        }

        const data = await response.json();
        if (data.success) {
          saveUser(data.user);
        }
      } catch {
        clearToken();
        router.replace("/login");
        return;
      } finally {
        setCheckingAuth(false);
      }
    };

    verify();
  }, [router]);

  if (checkingAuth) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f8fbff]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#00b4ff] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-600 font-bold tracking-tight">Comprobando sesión...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white text-slate-900 selection:bg-[#00b4ff]/20">
      <AppNavbar />
      <div className="flex flex-col">
        <HeroSection />
        <ProfilesSection />
        <FeaturesSection />
        <FinalCtaSection />
      </div>
      
      {/* Footer minimalista */}
      <footer className="py-12 border-t border-slate-100 bg-white">
        <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <img 
              src={`${getApiBaseUrl().replace('/api', '')}/storage/Captura de pantalla 2026-04-08 123626.png`} 
              alt="Logo" 
              className="w-8 h-8 rounded-lg"
            />
            <span className="font-black text-black">Puente Joven</span>
          </div>
          <p className="text-sm text-slate-400 font-medium">© 2026 Puente Joven. Todos los derechos reservados.</p>
        </div>
      </footer>
    </main>
  );
}
