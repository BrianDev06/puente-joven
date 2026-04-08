import Link from "next/link";

export default function FinalCtaSection() {
  return (
    <section className="bg-[#071522] py-14 text-center text-white">
      <h2 className="text-4xl font-bold">Listo para Comenzar?</h2>
      <p className="mx-auto mt-3 max-w-2xl text-slate-300">
        Unete a miles de usuarios que ya estan conectando con oportunidades
      </p>
      <div className="mt-8 flex items-center justify-center gap-3">
        <Link
          href="/register"
          className="rounded-md bg-sky-500 px-8 py-3 font-semibold transition hover:bg-sky-600"
        >
          Registrarse Gratis
        </Link>
        <Link
          href="/login"
          className="rounded-md border border-sky-400 px-8 py-3 font-semibold text-sky-200 transition hover:bg-sky-900"
        >
          Ya tengo cuenta
        </Link>
      </div>
    </section>
  );
}

