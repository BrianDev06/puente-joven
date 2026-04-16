"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getApiBaseUrl, getToken, saveToken, saveUser } from "@/lib/auth";

type UserType = "alumno" | "profesor" | "empresa";

export default function RegisterPage() {
  const router = useRouter();
  
  // Basic Info
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [userType, setUserType] = useState<UserType>("alumno");
  
  // Common Profile Info
  const [apellidos, setApellidos] = useState("");
  const [dniCif, setDniCif] = useState("");
  
  // Alumno Info
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [ciclo, setCiclo] = useState("DAW");
  
  // Profesor Info
  const [departamento, setDepartamento] = useState("");
  const [especialidad, setEspecialidad] = useState("");
  
  // Empresa Info
  const [nombreComercial, setNombreComercial] = useState("");
  const [web, setWeb] = useState("");
  const [direccion, setDireccion] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (getToken()) {
      router.replace("/inicio");
    }
  }, [router]);

  if (!mounted) return null;

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
          apellidos,
          dni_cif: dniCif,
          fecha_nacimiento: userType === "alumno" ? fechaNacimiento : null,
          ciclo: userType === "alumno" ? ciclo : null,
          departamento: userType === "profesor" ? departamento : null,
          especialidad: userType === "profesor" ? especialidad : null,
          nombre_comercial: userType === "empresa" ? nombreComercial : null,
          web: userType === "empresa" ? web : null,
          direccion: userType === "empresa" ? direccion : null,
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
      saveUser(payload.user);
      router.replace("/inicio");
    } catch {
      setError("No se pudo conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f8fbff] px-4 py-12 relative overflow-hidden selection:bg-[#00b4ff]/20">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-[500px] h-[500px] bg-[#00b4ff]/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-[500px] h-[500px] bg-black/5 rounded-full blur-[120px]" />

      <section className="w-full max-w-2xl relative z-10">
        <div className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] ring-1 ring-slate-200 p-10 backdrop-blur-xl bg-white/90 border border-slate-100">
          <div className="mb-8 flex flex-col items-center text-center">
            <img 
              src={`${getApiBaseUrl().replace('/api', '')}/storage/Captura de pantalla 2026-04-08 123626.png`} 
              alt="Puente Joven Logo" 
              className="w-20 h-20 rounded-2xl object-cover shadow-xl shadow-[#00b4ff]/20 mb-4 ring-4 ring-white"
            />
            <h1 className="text-3xl font-black tracking-tight text-black">Crea tu Cuenta</h1>
            <p className="mt-1 text-slate-500 font-medium font-outfit">Selecciona tu perfil para comenzar</p>
          </div>

          <div className="mb-8 p-1 bg-slate-100 rounded-2xl flex items-center justify-between gap-1 border border-slate-200">
            {(["alumno", "profesor", "empresa"] as UserType[]).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setUserType(type)}
                className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all duration-300 ${
                  userType === type 
                    ? "bg-black text-white shadow-lg shadow-black/20" 
                    : "text-slate-500 hover:text-black"
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Información de Acceso</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField label="Nombre" placeholder="Tu nombre" value={name} onChange={setName} required />
                <InputField label="Correo Electrónico" type="email" placeholder="email@ejemplo.com" value={email} onChange={setEmail} required />
                <InputField label="Contraseña" type="password" placeholder="••••••••" value={password} onChange={setPassword} required />
                <InputField label="Confirmar Contraseña" type="password" placeholder="••••••••" value={passwordConfirmation} onChange={setPasswordConfirmation} required />
              </div>
            </div>

            <div key={userType} className="space-y-4 pt-2 border-t border-slate-100">
              <h3 className="text-xs font-black text-[#00b4ff] uppercase tracking-widest ml-1">Detalles del Perfil</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {userType !== "empresa" && (
                  <InputField label="Apellidos" placeholder="Tus apellidos" value={apellidos} onChange={setApellidos} />
                )}
                <InputField label={userType === "empresa" ? "CIF" : "DNI"} placeholder={userType === "empresa" ? "A12345678" : "12345678X"} value={dniCif} onChange={setDniCif} />
                
                {/* Alumno Fields */}
                {userType === "alumno" && (
                  <>
                    <div className="space-y-1.5">
                      <label className="block text-sm font-bold text-slate-700 ml-1">Fecha de Nacimiento</label>
                      <input type="date" value={fechaNacimiento} onChange={(e) => setFechaNacimiento(e.target.value)} className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-5 py-4 text-sm text-black focus:bg-white focus:ring-2 focus:ring-[#00b4ff] outline-none transition-all shadow-sm" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-sm font-bold text-slate-700 ml-1">Ciclo formativo</label>
                      <select value={ciclo} onChange={(e) => setCiclo(e.target.value)} className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-5 py-4 text-sm text-black focus:bg-white focus:ring-2 focus:ring-[#00b4ff] outline-none transition-all shadow-sm cursor-pointer">
                        <option value="DAW">DAW - Desarrollo de Aplicaciones Web</option>
                        <option value="DAM">DAM - Desarrollo de Aplicaciones Multiplataforma</option>
                        <option value="ASIR">ASIR - Administración de Sistemas en Red</option>
                      </select>
                    </div>
                  </>
                )}

                {/* Profesor Fields */}
                {userType === "profesor" && (
                  <>
                    <InputField label="Departamento" placeholder="Ej. Informática" value={departamento} onChange={setDepartamento} />
                    <InputField label="Especialidad" placeholder="Ej. Ciberseguridad" value={especialidad} onChange={setEspecialidad} />
                  </>
                )}

                {/* Empresa Fields */}
                {userType === "empresa" && (
                  <>
                    <InputField label="Nombre Comercial" placeholder="Ej. TechSolutions S.L." value={nombreComercial} onChange={setNombreComercial} />
                    <InputField label="Sitio Web" type="url" placeholder="https://tuempresa.com" value={web} onChange={setWeb} />
                    <div className="space-y-1.5 md:col-span-2">
                       <label className="block text-sm font-bold text-slate-700 ml-1">Dirección Física</label>
                       <textarea value={direccion} onChange={(e) => setDireccion(e.target.value)} placeholder="Calle Ejemplo 123, CP 28001, Madrid" rows={2} className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-5 py-4 text-sm text-black placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-[#00b4ff] outline-none transition-all shadow-sm resize-none" />
                    </div>
                  </>
                )}
              </div>
            </div>

            {error ? (
              <div className="flex items-center gap-2 p-4 rounded-2xl bg-red-50 border border-red-100 text-red-600 animate-shake">
                <p className="text-sm font-bold">{error}</p>
              </div>
            ) : null}

            <button
              type="submit"
              disabled={loading}
              className="group relative w-full h-14 overflow-hidden rounded-2xl bg-black text-base font-bold text-white shadow-xl shadow-black/20 transition-all duration-300 hover:scale-[1.01] active:scale-95 disabled:opacity-50"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {loading ? "Creando tu cuenta..." : "Completar Registro"}
                {!loading && <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>}
              </span>
              <div className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full transition-transform duration-700 ease-in-out group-hover:translate-x-full"></div>
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-sm font-medium text-slate-500">
              ¿Ya eres miembro?{" "}
              <Link href="/login" className="font-extrabold text-[#00b4ff] hover:text-black transition-colors">
                Inicia sesión aquí
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

function InputField({ label, type = "text", placeholder, value, onChange, required = false }: any) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-bold text-slate-700 ml-1">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-5 py-4 text-sm text-black placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-[#00b4ff] outline-none transition-all duration-300 shadow-sm"
        required={required}
      />
    </div>
  );
}
