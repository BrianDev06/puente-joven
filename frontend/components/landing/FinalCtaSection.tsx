import Link from "next/link";
import { getApiBaseUrl } from "@/lib/auth";

export default function FinalCtaSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="relative overflow-hidden rounded-[3rem] bg-black px-8 py-20 text-center text-white shadow-2xl shadow-black/40 border border-white/5">
        {/* Decorative Circles */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 h-80 w-80 rounded-full bg-[#00b4ff]/20 blur-[100px]"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-80 w-80 rounded-full bg-[#00b4ff]/10 blur-[100px]"></div>

        <div className="relative z-10">
          <img 
            src={`${getApiBaseUrl().replace('/api', '')}/storage/Captura de pantalla 2026-04-08 123626.png`} 
            alt="Puente Joven" 
            className="mx-auto w-16 h-16 rounded-xl object-cover mb-8 shadow-xl shadow-[#00b4ff]/20 ring-2 ring-white/10"
          />
          <h2 className="text-4xl font-black tracking-tight sm:text-5xl">
            ¿Listo para dar el <span className="text-[#00b4ff]">siguiente paso</span>?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg font-medium text-slate-400">
            Únete a cientos de empresas y alumnos que ya están construyendo el futuro del ecosistema laboral.
          </p>
          <div className="mt-12 flex justify-center">
            <Link
              href="/register"
              className="rounded-2xl bg-white px-10 py-5 text-lg font-black text-black shadow-xl transition-all hover:scale-105 hover:bg-[#00b4ff] hover:text-white active:scale-95"
            >
              Crea tu Cuenta Gratis
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
