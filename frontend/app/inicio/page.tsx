import AppNavbar from "@/components/landing/AppNavbar";
import HeroSection from "@/components/landing/HeroSection";
import ProfilesSection from "@/components/landing/ProfilesSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import FinalCtaSection from "@/components/landing/FinalCtaSection";

export default function InicioPage() {
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

