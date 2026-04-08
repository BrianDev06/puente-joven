import Link from "next/link";

export default function AppNavbar() {
  return (
    <header className="bg-[#071522] text-white">
      <div className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="rounded-md bg-sky-500 px-2 py-1 text-xs font-bold">PJ</div>
          <span className="text-lg font-semibold">Puente Joven</span>
        </div>

        <nav className="flex items-center gap-3">
          <Link href="/login" className="text-sm font-semibold text-white hover:text-sky-200">
            Iniciar Sesion
          </Link>
          <Link
            href="/register"
            className="rounded-md bg-sky-500 px-3 py-1.5 text-sm font-semibold text-white hover:bg-sky-600"
          >
            Registrarse
          </Link>
        </nav>
      </div>
    </header>
  );
}

