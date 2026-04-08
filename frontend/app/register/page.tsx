"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getApiBaseUrl, getToken, saveToken } from "@/lib/auth";

type UserType = "alumno" | "profesor" | "admin";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [userType, setUserType] = useState<UserType>("alumno");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (getToken()) {
      router.replace("/inicio");
    }
  }, [router]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");

    if (password !== passwordConfirmation) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${getApiBaseUrl()}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          password_confirmation: passwordConfirmation,
          user_type: userType,
        }),
      });

      const payload = await response.json();
      if (!response.ok || !payload.success) {
        if (payload.errors) {
          const firstError = Object.values(payload.errors)[0] as string[] | undefined;
          setError(firstError?.[0] || "No se pudo completar el registro.");
        } else {
          setError(payload.message || "No se pudo completar el registro.");
        }
        return;
      }

      saveToken(payload.token);
      router.replace("/inicio");
    } catch {
      setError("No se pudo conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f3f4f6] px-4 py-10">
      <section className="w-full max-w-2xl rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-center text-4xl font-bold text-slate-900">Crear Cuenta</h1>
        <p className="mt-2 text-center text-slate-500">
          Selecciona tu tipo de usuario y completa el registro
        </p>

        <div className="mt-6 grid grid-cols-3 overflow-hidden rounded-full border border-slate-200 bg-slate-100 text-sm">
          {(["alumno", "profesor", "admin"] as UserType[]).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setUserType(type)}
              className={`px-4 py-2 font-semibold transition ${
                userType === type ? "bg-white text-slate-900" : "text-slate-500"
              }`}
            >
              {type === "admin" ? "Empresa" : type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-700">Nombre Completo</label>
            <input
              type="text"
              placeholder="Juan Pérez"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-md border border-black bg-slate-100 px-3 py-2 text-black placeholder:text-slate-500 outline-none focus:border-black"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-700">Correo Electrónico</label>
            <input
              type="email"
              placeholder="juan@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-black bg-slate-100 px-3 py-2 text-black placeholder:text-slate-500 outline-none focus:border-black"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-700">Contraseña</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-black bg-slate-100 px-3 py-2 text-black placeholder:text-slate-500 outline-none focus:border-black"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-700">Confirmar Contraseña</label>
            <input
              type="password"
              placeholder="••••••••"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              className="w-full rounded-md border border-black bg-slate-100 px-3 py-2 text-black placeholder:text-slate-500 outline-none focus:border-black"
              required
            />
          </div>

          {error ? <p className="text-sm text-red-600">{error}</p> : null}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-sky-500 py-2 font-semibold text-white transition hover:bg-sky-600 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Creando cuenta..." : "Crear Cuenta"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          ¿Ya tienes cuenta?{" "}
          <Link href="/login" className="font-semibold text-sky-600 hover:underline">
            Inicia sesión
          </Link>
        </p>
      </section>
    </main>
  );
}

