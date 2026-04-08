"use client";

import AppNavbar from "@/components/landing/AppNavbar";
import HeroSection from "@/components/landing/HeroSection";
import ProfilesSection from "@/components/landing/ProfilesSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import FinalCtaSection from "@/components/landing/FinalCtaSection";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authHeaders, clearToken, getApiBaseUrl, getToken } from "@/lib/auth";

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
      <main className="flex min-h-screen items-center justify-center bg-[#f3f4f6]">
        <p className="text-slate-600">Comprobando sesión...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f3f4f6] text-slate-900">
      <AppNavbar />
      <HeroSection />
      <ProfilesSection />
      <FeaturesSection />
      <FinalCtaSection />
    </main>
  );
}

