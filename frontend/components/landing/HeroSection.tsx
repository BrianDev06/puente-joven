import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-16 text-center">
      <h1 className="text-4xl font-bold md:text-5xl">Conecta Talento con Oportunidades</h1>
      <p className="mx-auto mt-4 max-w-3xl text-lg text-slate-500">
        El portal de empleo que une a alumnos, profesores y empresas en un solo lugar
      </p>

      <div className="mt-8 flex items-center justify-center gap-3">
        <Link
          href="/empleos"
          className="rounded-md bg-sky-500 px-8 py-3 font-semibold text-white transition hover:bg-sky-600"
        >
          Comienza Ahora
        </Link>
      </div>
    </section>
  );
}

