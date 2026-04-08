import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <section className="w-full max-w-md rounded-xl border bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">Iniciar Sesion</h1>
        <p className="mt-2 text-slate-600">
          Esta pantalla de acceso es temporal. Aqui conectaremos la autenticacion.
        </p>
        <form className="mt-6 space-y-4">
          <input
            type="email"
            placeholder="correo@ejemplo.com"
            className="w-full rounded-md border px-3 py-2 outline-none focus:border-sky-500"
          />
          <input
            type="password"
            placeholder="Contrasena"
            className="w-full rounded-md border px-3 py-2 outline-none focus:border-sky-500"
          />
          <button
            type="button"
            className="w-full rounded-md bg-sky-500 py-2 font-semibold text-white hover:bg-sky-600"
          >
            Entrar
          </button>
        </form>
        <p className="mt-5 text-sm text-slate-600">
          No tienes cuenta?{" "}
          <Link href="/register" className="font-semibold text-sky-600 hover:underline">
            Registrate
          </Link>
        </p>
      </section>
    </main>
  );
}

