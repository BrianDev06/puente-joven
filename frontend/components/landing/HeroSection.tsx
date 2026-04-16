import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 pt-40 pb-20 text-center overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-[#00b4ff]/5 blur-[120px] -z-10" />
      
      <div className="relative z-10 animate-fade-in">
        <h1 className="text-5xl font-black tracking-tight text-black md:text-7xl leading-[1.1]">
          Conecta <span className="text-[#00b4ff]">Talento</span> con <br/>
          <span className="relative">
            Oportunidades
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-[#00b4ff]/30 rounded-full"></div>
          </span>
        </h1>
        
        <p className="mx-auto mt-8 max-w-3xl text-xl font-medium text-slate-500 leading-relaxed font-outfit">
          El portal de empleo que revoluciona la unión entre alumnos, profesores y empresas de vanguardia en un solo ecosistema digital.
        </p>

        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/empleos"
            className="w-full sm:w-auto rounded-2xl bg-black px-10 py-5 font-black text-white shadow-2xl shadow-black/20 transition-all hover:scale-105 hover:bg-slate-900 active:scale-95"
          >
            Comienza Ahora
          </Link>
          <Link
            href="#profiles"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('profiles')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full sm:w-auto rounded-2xl border border-slate-200 bg-white px-10 py-5 font-bold text-slate-800 transition-all hover:bg-slate-50 hover:border-slate-300 active:scale-95"
          >
            Saber Más
          </Link>
        </div>
      </div>
    </section>
  );
}
