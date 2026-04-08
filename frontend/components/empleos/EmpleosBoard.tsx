"use client";

import { useMemo, useState } from "react";

export type Empleo = {
  id: number;
  nombre: string;
  descripcion: string;
  estado: string;
  fecha_creacion: string;
};

type Props = {
  empleos: Empleo[];
  onLogout: () => void;
};

export default function EmpleosBoard({ empleos, onLogout }: Props) {
  const [filtro, setFiltro] = useState("");
  const [selectedId, setSelectedId] = useState<number | null>(empleos[0]?.id ?? null);

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

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-[#eef7ff] text-slate-900">
      <div className="mx-auto flex max-w-[1400px] overflow-hidden border-x border-[#cde3f6] shadow-[0_8px_30px_rgba(15,23,42,0.08)]">
        <aside className="w-[300px] border-r border-[#cde3f6] bg-white">
          <div className="border-b border-[#cde3f6] p-4">
            <input
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
              placeholder="Buscar empresa u oferta..."
              className="w-full rounded-xl border border-black bg-[#f6fbff] px-4 py-2 text-black outline-none transition focus:border-black focus:ring-2 focus:ring-[#18a4e0]/20"
            />
          </div>

          <div className="space-y-3 p-3">
            {filtered.map((empleo) => (
              <button
                key={empleo.id}
                type="button"
                onClick={() => setSelectedId(empleo.id)}
                className={`flex w-full items-center gap-3 rounded-xl border border-black px-3 py-3 text-left transition duration-200 hover:-translate-y-[1px] hover:shadow-md ${
                  selected?.id === empleo.id
                    ? "bg-[#0e2a45] text-white"
                    : "bg-white text-slate-900 hover:bg-[#f1f8ff]"
                }`}
              >
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#18a4e0] text-xs font-bold text-white">
                  {empleo.nombre.slice(0, 2).toUpperCase()}
                </span>
                <div>
                  <p className="text-sm font-semibold">{empleo.nombre}</p>
                  <p
                    className={`text-xs ${
                      selected?.id === empleo.id ? "text-slate-200" : "text-slate-500"
                    }`}
                  >
                    {empleo.estado}
                  </p>
                </div>
              </button>
            ))}

            {filtered.length === 0 ? (
              <p className="rounded-xl border border-slate-300 bg-white p-4 text-sm text-slate-500">
                No se encontraron ofertas.
              </p>
            ) : null}
          </div>
        </aside>

        <section className="flex-1 bg-[#f8fcff]">
          <header className="flex items-center justify-between gap-3 border-b border-[#cde3f6] bg-white px-6 py-3">
            <div>
              <p className="text-sm text-slate-500">Portal de empleo</p>
              <h1 className="text-xl font-bold text-[#0e2a45]">Conector Talento-Empresa</h1>
            </div>
            <div className="flex items-center gap-3">
            <button
              type="button"
              className="rounded-xl border border-black bg-[#18a4e0] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#1290c7]"
            >
              Crear Oferta
            </button>
            <button
              type="button"
              onClick={onLogout}
              className="rounded-xl border border-black px-4 py-2 text-sm font-semibold text-[#0e2a45] transition hover:bg-[#eef6ff]"
            >
              Cerrar Sesión
            </button>
            </div>
          </header>

          <div className="space-y-6 p-6 fade-in-up">
            <div className="flex items-center gap-4">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-black bg-white text-2xl shadow-sm">
                🏢
              </div>
              <div className="flex-1 rounded-xl border border-black bg-white px-4 py-3 shadow-sm">
                <h2 className="text-3xl font-bold text-[#0e2a45]">
                  {selected?.nombre ?? "Selecciona una oferta"}
                </h2>
              </div>
            </div>

            <article className="min-h-[460px] rounded-2xl border border-black bg-white p-8 shadow-sm">
              {selected ? (
                <div className="space-y-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-[#e8f6ff] px-3 py-1 text-sm font-semibold text-[#0c6ea2]">
                      {estadoLabel}
                    </span>
                    <span className="rounded-full bg-[#eef2ff] px-3 py-1 text-sm font-semibold text-[#3730a3]">
                      Jornada completa
                    </span>
                    <span className="rounded-full bg-[#eefdf3] px-3 py-1 text-sm font-semibold text-[#166534]">
                      Publicada recientemente
                    </span>
                  </div>

                  <p className="text-lg leading-relaxed text-slate-700">{selected.descripcion}</p>

                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="rounded-xl border border-[#d8e9f8] bg-[#f6fbff] p-4">
                      <p className="text-sm font-semibold text-slate-500">Estado</p>
                      <p className="mt-1 text-xl font-bold capitalize text-[#0e2a45]">
                        {selected.estado}
                      </p>
                    </div>
                    <div className="rounded-xl border border-[#d8e9f8] bg-[#f6fbff] p-4">
                      <p className="text-sm font-semibold text-slate-500">Fecha</p>
                      <p className="mt-1 text-xl font-bold text-[#0e2a45]">
                        {new Date(selected.fecha_creacion).toLocaleDateString("es-ES")}
                      </p>
                    </div>
                    <div className="rounded-xl border border-[#d8e9f8] bg-[#f6fbff] p-4">
                      <p className="text-sm font-semibold text-slate-500">Ubicación</p>
                      <p className="mt-1 text-xl font-bold text-[#0e2a45]">Málaga</p>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-xl border border-[#d8e9f8] p-5">
                      <h3 className="text-lg font-bold text-[#0e2a45]">Requisitos clave</h3>
                      <ul className="mt-3 space-y-2 text-sm text-slate-600">
                        <li>• Conocimientos básicos del área</li>
                        <li>• Actitud proactiva y ganas de aprender</li>
                        <li>• Trabajo en equipo y comunicación</li>
                      </ul>
                    </div>
                    <div className="rounded-xl border border-[#d8e9f8] p-5">
                      <h3 className="text-lg font-bold text-[#0e2a45]">Qué ofrecemos</h3>
                      <ul className="mt-3 space-y-2 text-sm text-slate-600">
                        <li>• Incorporación y mentoría inicial</li>
                        <li>• Plan de crecimiento profesional</li>
                        <li>• Entorno colaborativo y dinámico</li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <button className="rounded-xl bg-[#18a4e0] px-5 py-2 font-semibold text-white transition hover:-translate-y-[1px] hover:bg-[#1290c7]">
                      Inscribirme
                    </button>
                    <button className="rounded-xl border border-[#0e2a45] px-5 py-2 font-semibold text-[#0e2a45] transition hover:bg-[#eef6ff]">
                      Guardar oferta
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex h-full min-h-[300px] items-center justify-center text-slate-500">
                  No hay ofertas para mostrar.
                </div>
              )}
            </article>
          </div>
        </section>
      </div>
    </main>
  );
}

