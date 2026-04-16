"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getApiBaseUrl, authHeaders, getToken } from "@/lib/auth";
import AppNavbar from "@/components/landing/AppNavbar";

export default function ProfilePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(searchParams.get("edit") === "true");
  const [user, setUser] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!getToken()) {
      router.replace("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await fetch(`${getApiBaseUrl()}/profile`, {
          headers: { ...authHeaders(), Accept: "application/json" },
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
          setFormData({
            name: data.user.name || "",
            email: data.user.email || "",
            apellidos: data.user.apellidos || "",
            dni_cif: data.user.dni_cif || "",
            fecha_nacimiento: data.user.fecha_nacimiento || "",
            ciclo: data.user.ciclo || "DAW",
            departamento: data.user.departamento || "",
            especialidad: data.user.especialidad || "",
            nombre_comercial: data.user.nombre_comercial || "",
            web: data.user.web || "",
            direccion: data.user.direccion || "",
            password: "",
            password_confirmation: "",
          });
        } else {
          setError("No se pudo cargar el perfil.");
        }
      } catch (err) {
        setError("Error de conexión al cargar perfil.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(`${getApiBaseUrl()}/profile`, {
        method: "PUT",
        headers: {
          ...authHeaders(),
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
        setSuccess("Perfil actualizado correctamente.");
        setIsEditing(false);
        router.push("/perfil");
      } else {
        setError(data.message || "Error al actualizar perfil.");
      }
    } catch (err) {
      setError("Error de red.");
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#00b4ff] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-600 font-bold">Cargando perfil...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8fbff] text-slate-900 pb-20">
      <AppNavbar />
      
      <div className="mx-auto max-w-4xl px-4 pt-32 animate-fade-in">
        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 ring-1 ring-slate-100 overflow-hidden">
          <div className="relative h-48 bg-black overflow-hidden">
            <div className="absolute top-0 right-0 -mt-20 -mr-20 h-80 w-80 rounded-full bg-[#00b4ff]/20 blur-[100px]"></div>
            <div className="absolute inset-0 flex items-center px-10 gap-8">
               <div className="h-28 w-28 rounded-3xl bg-white/10 backdrop-blur-md ring-4 ring-white/10 flex items-center justify-center text-5xl shadow-2xl">
                 {user.name.slice(0, 1).toUpperCase()}
               </div>
               <div>
                  <h1 className="text-3xl font-black text-white">{user.name} {user.apellidos}</h1>
                  <p className="text-slate-400 font-bold flex items-center gap-2 mt-1">
                    <span className="inline-block w-2 h-2 rounded-full bg-[#00b4ff]"></span>
                    {user.user_type.toUpperCase()}
                  </p>
               </div>
            </div>
          </div>

          <div className="p-10">
            {error && (
              <div className="mb-6 flex items-center gap-2 p-4 rounded-2xl bg-red-50 border border-red-100 text-red-600 font-bold text-sm">
                {error}
              </div>
            )}
            {success && (
              <div className="mb-6 flex items-center gap-2 p-4 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-600 font-bold text-sm">
                {success}
              </div>
            )}

            {!isEditing ? (
              <div className="space-y-8">
                <div className="flex justify-between items-center mb-4">
                   <h2 className="text-2xl font-black text-black">Información de Usuario</h2>
                   <button 
                    onClick={() => setIsEditing(true)}
                    className="px-6 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors"
                   >
                     Editar Perfil
                   </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <InfoField label="Nombre" value={user.name} />
                   <InfoField label="Apellidos" value={user.apellidos || "-"} />
                   <InfoField label="Correo" value={user.email} />
                   <InfoField label="Identificación (DNI/CIF)" value={user.dni_cif || "-"} />
                   
                   {user.user_type === 'alumno' && (
                     <>
                      <InfoField label="Fecha Nacimiento" value={user.fecha_nacimiento || "-"} />
                      <InfoField label="Ciclo de Estudios" value={user.ciclo || "-"} />
                     </>
                   )}

                   {user.user_type === 'profesor' && (
                     <>
                      <InfoField label="Departamento" value={user.departamento || "-"} />
                      <InfoField label="Especialidad" value={user.especialidad || "-"} />
                     </>
                   )}

                   {user.user_type === 'empresa' && (
                     <>
                      <InfoField label="Nombre Comercial" value={user.nombre_comercial || "-"} />
                      <InfoField label="Web" value={user.web || "-"} />
                      <InfoField label="Dirección" value={user.direccion || "-"} fullWidth />
                     </>
                   )}
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="flex justify-between items-center mb-4">
                   <h2 className="text-2xl font-black text-black">Editar Perfil</h2>
                   <button 
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="text-sm font-bold text-slate-400 hover:text-black transition-colors"
                   >
                     Cancelar
                   </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-1.5">
                     <label className="block text-sm font-bold text-slate-700 ml-1">Nombre</label>
                     <input name="name" value={formData.name} onChange={handleChange} className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 font-medium outline-none focus:ring-2 focus:ring-[#00b4ff] focus:bg-white transition-all shadow-sm" required />
                   </div>
                   <div className="space-y-1.5">
                     <label className="block text-sm font-bold text-slate-700 ml-1">Apellidos</label>
                     <input name="apellidos" value={formData.apellidos} onChange={handleChange} className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 font-medium outline-none focus:ring-2 focus:ring-[#00b4ff] focus:bg-white transition-all shadow-sm" />
                   </div>
                   <div className="space-y-1.5">
                     <label className="block text-sm font-bold text-slate-700 ml-1">Correo Electrónico</label>
                     <input name="email" value={formData.email} onChange={handleChange} className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 font-medium outline-none focus:ring-2 focus:ring-[#00b4ff] focus:bg-white transition-all shadow-sm" required />
                   </div>
                   <div className="space-y-1.5">
                     <label className="block text-sm font-bold text-slate-700 ml-1">Identificación (DNI/CIF)</label>
                     <input name="dni_cif" value={formData.dni_cif} onChange={handleChange} className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 font-medium outline-none focus:ring-2 focus:ring-[#00b4ff] focus:bg-white transition-all shadow-sm" />
                   </div>

                   {user.user_type === 'alumno' && (
                     <>
                      <div className="space-y-1.5">
                        <label className="block text-sm font-bold text-slate-700 ml-1">Fecha Nacimiento</label>
                        <input type="date" name="fecha_nacimiento" value={formData.fecha_nacimiento} onChange={handleChange} className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 font-medium outline-none focus:ring-2 focus:ring-[#00b4ff] focus:bg-white transition-all shadow-sm" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-sm font-bold text-slate-700 ml-1">Ciclo</label>
                        <select name="ciclo" value={formData.ciclo} onChange={handleChange} className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 font-medium outline-none focus:ring-2 focus:ring-[#00b4ff] focus:bg-white transition-all shadow-sm">
                          <option value="DAW">DAW</option>
                          <option value="DAM">DAM</option>
                          <option value="ASIR">ASIR</option>
                        </select>
                      </div>
                     </>
                   )}

                   {user.user_type === 'profesor' && (
                     <>
                        <div className="space-y-1.5">
                          <label className="block text-sm font-bold text-slate-700 ml-1">Departamento</label>
                          <input name="departamento" value={formData.departamento} onChange={handleChange} className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 font-medium outline-none focus:ring-2 focus:ring-[#00b4ff] focus:bg-white transition-all shadow-sm" />
                        </div>
                        <div className="space-y-1.5">
                          <label className="block text-sm font-bold text-slate-700 ml-1">Especialidad</label>
                          <input name="especialidad" value={formData.especialidad} onChange={handleChange} className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 font-medium outline-none focus:ring-2 focus:ring-[#00b4ff] focus:bg-white transition-all shadow-sm" />
                        </div>
                     </>
                   )}

                   {user.user_type === 'empresa' && (
                     <>
                        <div className="space-y-1.5">
                          <label className="block text-sm font-bold text-slate-700 ml-1">Nombre Comercial</label>
                          <input name="nombre_comercial" value={formData.nombre_comercial} onChange={handleChange} className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 font-medium outline-none focus:ring-2 focus:ring-[#00b4ff] focus:bg-white transition-all shadow-sm" />
                        </div>
                        <div className="space-y-1.5">
                          <label className="block text-sm font-bold text-slate-700 ml-1">Página Web</label>
                          <input name="web" value={formData.web} onChange={handleChange} className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 font-medium outline-none focus:ring-2 focus:ring-[#00b4ff] focus:bg-white transition-all shadow-sm" />
                        </div>
                        <div className="space-y-1.5 md:col-span-2">
                          <label className="block text-sm font-bold text-slate-700 ml-1">Dirección</label>
                          <textarea name="direccion" value={formData.direccion} onChange={handleChange} rows={2} className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 font-medium outline-none focus:ring-2 focus:ring-[#00b4ff] focus:bg-white transition-all shadow-sm resize-none" />
                        </div>
                     </>
                   )}

                   <div className="pt-4 md:col-span-2">
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Seguridad</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1.5">
                          <label className="block text-sm font-bold text-slate-700 ml-1">Nueva Contraseña</label>
                          <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Dejar en blanco para mantener actual" className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 font-medium outline-none focus:ring-2 focus:ring-[#00b4ff] focus:bg-white transition-all shadow-sm" />
                        </div>
                        <div className="space-y-1.5">
                          <label className="block text-sm font-bold text-slate-700 ml-1">Confirmar Contraseña</label>
                          <input type="password" name="password_confirmation" value={formData.password_confirmation} onChange={handleChange} placeholder="• • • • • •" className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 font-medium outline-none focus:ring-2 focus:ring-[#00b4ff] focus:bg-white transition-all shadow-sm" />
                        </div>
                      </div>
                   </div>
                </div>

                <div className="flex justify-end gap-3 pt-6">
                  <button 
                    type="submit" 
                    disabled={saving}
                    className="px-10 py-4 bg-black text-white font-black rounded-2xl shadow-xl shadow-black/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
                  >
                    {saving ? "Guardando..." : "Guardar Cambios"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

function InfoField({ label, value, fullWidth = false }: { label: string; value: string; fullWidth?: boolean }) {
  return (
    <div className={`space-y-1 ${fullWidth ? 'md:col-span-2' : ''}`}>
      <p className="text-xs font-black text-[#00b4ff] uppercase tracking-wider">{label}</p>
      <p className="text-lg font-bold text-slate-800">{value}</p>
    </div>
  );
}
