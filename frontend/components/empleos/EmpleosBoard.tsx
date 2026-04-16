"use client";

import { useMemo, useState } from "react";
import { authHeaders, getApiBaseUrl } from "@/lib/auth";
import UserNav from "@/components/shared/UserNav";

export type Empleo = {
  id: number;
  nombre: string;
  descripcion: string;
  estado: string;
  fecha_creacion?: string;
  created_at?: string;
  tipo_jornada?: string;
  ubicacion?: string;
  requisitos?: string;
  ofrecemos?: string;
};

type Props = {
  empleos: Empleo[];
  onLogout: () => void;
  canCreateOffer: boolean;
  onOfferCreated: () => void;
};

export default function EmpleosBoard({ empleos, onLogout, canCreateOffer, onOfferCreated }: Props) {
  const [filtro, setFiltro] = useState("");
  const [selectedId, setSelectedId] = useState<number | null>(empleos[0]?.id ?? null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    tipo_jornada: "jornada completa",
    ubicacion: "",
    requisitos: "",
    ofrecemos: "",
  });

  const handleCreateOffer = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch(`${getApiBaseUrl()}/puentes`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json", ...authHeaders() },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setIsModalOpen(false);
        setFormData({ nombre: "", descripcion: "", tipo_jornada: "jornada completa", ubicacion: "", requisitos: "", ofrecemos: "" });
        onOfferCreated();
      } else {
        alert("Error al crear oferta. Revisa los datos y vuelve a intentarlo.");
      }
    } catch {
      alert("Error de red al crear oferta.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const filtered = useMemo(() => {
    const normalized = filtro.trim().toLowerCase();
    if (!normalized) return empleos;
    return empleos.filter(
      (e) =>
        e.nombre.toLowerCase().includes(normalized) ||
        e.descripcion.toLowerCase().includes(normalized)
    );
  }, [empleos, filtro]);

  const selected = filtered.find((e) => e.id === selectedId) ?? filtered[0] ?? null;
  const estadoLabel =
    selected?.estado === "activo"
      ? "Activa"
      : selected?.estado === "en_proceso"
        ? "En proceso"
        : "Cerrada";

  const formattedDate = selected?.created_at || selected?.fecha_creacion;
  const dateStr = formattedDate ? new Date(formattedDate).toLocaleDateString("es-ES") : "";

  return (
    <main className="min-h-screen bg-[#f8fbff] text-slate-900 relative selection:bg-[#00b4ff]/20">
      <div className="mx-auto flex max-w-[1400px] h-screen overflow-hidden bg-white shadow-[0_0_50px_-12px_rgba(0,0,0,0.15)] ring-1 ring-slate-200 lg:rounded-2xl lg:h-[calc(100vh-2rem)] lg:my-4 border border-slate-100">
        {/* Sidebar */}
        <aside className="w-[340px] border-r border-slate-100 bg-white/80 flex flex-col z-20">
          <div className="p-6 border-b border-slate-100 bg-white backdrop-blur-xl flex flex-col items-center text-center">
            <img
              src={`${getApiBaseUrl().replace('/api', '')}/storage/Captura de pantalla 2026-04-08 123626.png`}
              alt="Puente Joven Logo"
              className="w-24 h-24 rounded-2xl object-cover shadow-xl shadow-[#00b4ff]/20 mb-6 ring-4 ring-white"
            />
            <h2 className="text-2xl font-black tracking-tight text-black self-start mb-4">Ofertas</h2>
            <div className="relative group w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400 group-focus-within:text-[#00b4ff] transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </div>
              <input
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
                placeholder="Buscar puesto o empresa..."
                className="w-full rounded-2xl border border-slate-300 bg-slate-50 pl-11 pr-4 py-3 text-sm text-black placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-inset focus:ring-[#00b4ff] focus:border-[#00b4ff] outline-none transition-all duration-300 shadow-sm"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar bg-slate-50/50">
            {filtered.map((empleo) => {
              const isSelected = selected?.id === empleo.id;
              return (
                <button
                  key={empleo.id}
                  type="button"
                  onClick={() => setSelectedId(empleo.id)}
                  className={`group relative flex w-full items-center gap-4 rounded-2xl p-4 text-left transition-all duration-300 ${isSelected
                      ? "bg-black text-white shadow-xl shadow-black/20 ring-1 ring-black scale-[1.02]"
                      : "bg-white text-slate-700 shadow-sm ring-1 ring-slate-200 hover:ring-[#00b4ff]/40 hover:shadow-md hover:scale-[1.01]"
                    }`}
                >
                  <div className={`shrink-0 flex h-12 w-12 items-center justify-center rounded-xl font-bold text-sm transition-transform duration-300 group-hover:scale-110 ${isSelected ? "bg-[#00b4ff] text-white shadow-inner" : "bg-sky-50 text-[#00b4ff] ring-1 ring-sky-100"
                    }`}>
                    {empleo.nombre.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="flex-1 truncate">
                    <p className={`text-base font-bold truncate transition-colors ${isSelected ? "text-white" : "text-black group-hover:text-[#00b4ff]"}`}>
                      {empleo.nombre}
                    </p>
                    <p className={`text-xs mt-1 font-medium capitalize flex items-center gap-1.5 ${isSelected ? "text-[#b2eaff]" : "text-slate-500"}`}>
                      <span className={`inline-block w-1.5 h-1.5 rounded-full ${empleo.estado === 'activo' ? 'bg-emerald-400' : 'bg-amber-400'}`}></span>
                      {empleo.estado}
                    </p>
                  </div>
                </button>
              );
            })}

            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-8 text-center rounded-2xl border border-dashed border-slate-300 bg-white shadow-sm">
                <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 mb-3">🔍</div>
                <p className="text-sm font-medium text-slate-600">No se encontraron resultados</p>
                <p className="text-xs text-slate-400 mt-1">Prueba con otros términos de búsqueda.</p>
              </div>
            ) : null}
          </div>
        </aside>

        {/* Main Content Area */}
        <section className="flex-1 relative flex flex-col bg-slate-50/30 overflow-hidden">
          {/* Header */}
          <header className="flex items-center justify-between px-8 py-5 bg-white/80 backdrop-blur-xl border-b border-slate-100 z-10 sticky top-0">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#00b4ff] mb-1">Portal de Talento</p>
              <h1 className="text-2xl font-black text-black">Explorar Ofertas</h1>
            </div>
            <div className="flex items-center gap-4">
              {canCreateOffer ? (
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="group relative inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-black to-slate-800 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-black/30 ring-1 ring-white/10 transition-all duration-300 hover:scale-105 hover:shadow-black/40"
                >
                  <svg className="w-4 h-4 transition-transform group-hover:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4"></path></svg>
                  Crear Oferta
                </button>
              ) : null}
              <div className="pl-4 border-l border-slate-100 ml-2">
                <UserNav />
              </div>
            </div>
          </header>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-8 fade-in-up">
            {selected ? (
              <div className="mx-auto max-w-4xl space-y-8 pb-12">
                <div className="flex items-start gap-6">
                  <div className="flex shrink-0 h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-black to-slate-800 shadow-xl shadow-black/20 ring-4 ring-white">
                    <span className="text-3xl">🏢</span>
                  </div>
                  <div className="pt-2">
                    <h2 className="text-4xl font-extrabold tracking-tight text-black mb-3">
                      {selected.nombre}
                    </h2>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        {estadoLabel}
                      </span>
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-50 px-3 py-1 text-xs font-bold text-[#00b4ff] ring-1 ring-inset ring-sky-600/20 capitalize">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        {selected.tipo_jornada || "Jornada completa"}
                      </span>
                      {dateStr && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600 ring-1 ring-inset ring-slate-500/10">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                          Publicado: {dateStr}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
                  <h3 className="text-lg font-bold text-black flex items-center gap-2 mb-4">
                    <svg className="w-5 h-5 text-[#00b4ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7"></path></svg>
                    Descripción del Puesto
                  </h3>
                  <p className="text-base leading-relaxed text-slate-600 whitespace-pre-line">
                    {selected.descripcion}
                  </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="group rounded-3xl bg-gradient-to-br from-black to-slate-800 p-8 text-white shadow-xl shadow-black/10 relative overflow-hidden transition-transform duration-300 hover:-translate-y-1">
                    <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-white/5 rounded-full blur-2xl transition-transform duration-700 group-hover:scale-150"></div>
                    <h3 className="text-lg font-bold flex items-center gap-3 mb-6 relative z-10">
                      <div className="p-2 bg-white/10 rounded-lg"><svg className="w-5 h-5 text-sky-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div>
                      Requisitos clave
                    </h3>
                    <ul className="space-y-3 text-sm text-slate-300 whitespace-pre-line relative z-10 leading-relaxed">
                      {selected.requisitos || "• Ganas de aprender y proactividad."}
                    </ul>
                  </div>

                  <div className="group rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200 relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-sky-100 hover:ring-sky-200 hover:-translate-y-1 border border-slate-100">
                    <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-sky-50 rounded-full blur-2xl transition-transform duration-700 group-hover:scale-150"></div>
                    <h3 className="text-lg font-bold text-black flex items-center gap-3 mb-6 relative z-10">
                      <div className="p-2 bg-sky-50 rounded-lg"><svg className="w-5 h-5 text-[#00b4ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg></div>
                      Lo que ofrecemos
                    </h3>
                    <ul className="space-y-3 text-sm text-slate-600 whitespace-pre-line relative z-10 leading-relaxed">
                      {selected.ofrecemos || "• Excelente ambiente laboral."}
                    </ul>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-6 p-8 rounded-3xl bg-gradient-to-r from-sky-50 to-white ring-1 ring-sky-100/50 shadow-sm mt-8 border border-[#00b4ff]/20">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-white ring-1 ring-slate-200 flex items-center justify-center shadow-sm">📍</div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-0.5">Ubicación</p>
                      <p className="text-base font-bold text-black capitalize">{selected.ubicacion || "No especificado"}</p>
                    </div>
                  </div>
                  <button className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-2xl bg-black px-8 py-4 text-base font-bold text-white shadow-xl shadow-black/20 transition-all duration-300 hover:scale-105 hover:bg-slate-900">
                    <span className="relative z-10 flex items-center gap-2">
                      Inscribirme Ahora
                      <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </span>
                    <div className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full transition-transform duration-700 ease-in-out group-hover:translate-x-full"></div>
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex h-full min-h-[400px] flex-col items-center justify-center text-center">
                <div className="w-24 h-24 bg-white rounded-full shadow-sm ring-1 ring-slate-100 flex items-center justify-center mb-6">
                  <span className="text-4xl text-slate-300">👋</span>
                </div>
                <h3 className="text-2xl font-bold text-black mb-2">Bienvenido al Portal</h3>
                <p className="text-slate-500 max-w-md">Selecciona una oferta en el panel lateral para ver todos los detalles o crea una nueva oportunidad para los jóvenes.</p>
              </div>
            )}
          </div>
        </section>
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 transition-all duration-300"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsModalOpen(false);
          }}
        >
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[2.5rem] bg-white p-10 shadow-2xl ring-1 ring-white/50 animate-fade-in fade-in-up border border-slate-100">
            <h2 className="text-3xl font-black tracking-tight text-black mb-8 flex items-center gap-3">
              <span className="bg-[#00b4ff]/10 text-[#00b4ff] p-2 rounded-xl"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg></span>
              Crear Nueva Oferta
            </h2>

            <form onSubmit={handleCreateOffer} className="space-y-6">
              <div className="space-y-5 bg-slate-50/50 p-7 rounded-[2rem] border border-slate-100">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Nombre de la oferta</label>
                  <input
                    required
                    placeholder="Ej. Desarrollador Web Frontend"
                    value={formData.nombre}
                    onChange={e => setFormData({ ...formData, nombre: e.target.value })}
                    className="w-full rounded-2xl border border-slate-300 bg-white p-4 text-black shadow-sm focus:ring-2 focus:ring-inset focus:ring-[#00b4ff] focus:border-[#00b4ff] outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Descripción corta</label>
                  <textarea
                    required
                    placeholder="Describe de qué trata el puesto..."
                    rows={2}
                    value={formData.descripcion}
                    onChange={e => setFormData({ ...formData, descripcion: e.target.value })}
                    className="w-full rounded-2xl border border-slate-300 bg-white p-4 text-black shadow-sm focus:ring-2 focus:ring-inset focus:ring-[#00b4ff] focus:border-[#00b4ff] outline-none transition-all resize-y"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Tipo de jornada</label>
                    <select
                      required
                      value={formData.tipo_jornada}
                      onChange={e => setFormData({ ...formData, tipo_jornada: e.target.value })}
                      className="w-full rounded-2xl border border-slate-300 bg-white p-4 text-black shadow-sm focus:ring-2 focus:ring-inset focus:ring-[#00b4ff] focus:border-[#00b4ff] outline-none transition-all cursor-pointer"
                    >
                      <option value="jornada completa">Jornada Completa</option>
                      <option value="jornada parcial">Jornada Parcial</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Ubicación</label>
                    <input
                      placeholder="Ej. Madrid, Híbrido, Remoto"
                      value={formData.ubicacion}
                      onChange={e => setFormData({ ...formData, ubicacion: e.target.value })}
                      className="w-full rounded-2xl border border-slate-300 bg-white p-4 text-black shadow-sm focus:ring-2 focus:ring-inset focus:ring-[#00b4ff] focus:border-[#00b4ff] outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Requisitos clave</label>
                  <textarea
                    placeholder="Enumera conocimientos, aptitudes..."
                    rows={3}
                    value={formData.requisitos}
                    onChange={e => setFormData({ ...formData, requisitos: e.target.value })}
                    className="w-full rounded-2xl border border-slate-300 bg-white p-4 text-black shadow-sm focus:ring-2 focus:ring-inset focus:ring-[#00b4ff] focus:border-[#00b4ff] outline-none transition-all resize-y"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">¿Qué ofrecemos?</label>
                  <textarea
                    placeholder="Beneficios, metodología, herramientas..."
                    rows={3}
                    value={formData.ofrecemos}
                    onChange={e => setFormData({ ...formData, ofrecemos: e.target.value })}
                    className="w-full rounded-2xl border border-slate-300 bg-white p-4 text-black shadow-sm focus:ring-2 focus:ring-inset focus:ring-[#00b4ff] focus:border-[#00b4ff] outline-none transition-all resize-y"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-3 rounded-2xl text-slate-500 font-bold hover:bg-slate-100 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3 rounded-2xl bg-black text-white font-bold tracking-wide shadow-xl shadow-black/20 hover:scale-105 hover:bg-slate-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                      Creando...
                    </>
                  ) : "Publicar Oferta"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
