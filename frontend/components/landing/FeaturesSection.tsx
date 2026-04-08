const caracteristicas = [
  {
    titulo: "Busqueda Inteligente",
    descripcion: "Encuentra las mejores oportunidades segun tu perfil",
    icono: "🔍",
  },
  {
    titulo: "Gestion Completa",
    descripcion: "Administra aplicaciones y ofertas desde un solo lugar",
    icono: "📄",
  },
  {
    titulo: "Crecimiento Profesional",
    descripcion: "Desarrolla tu carrera con las mejores oportunidades",
    icono: "↗",
  },
];

export default function FeaturesSection() {
  return (
    <section className="mt-10 bg-[#e8edf1] py-14">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="mb-10 text-center text-4xl font-bold">Caracteristicas Principales</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {caracteristicas.map((feature) => (
            <article key={feature.titulo} className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-sky-500 text-xl text-white">
                {feature.icono}
              </div>
              <h3 className="text-2xl font-semibold">{feature.titulo}</h3>
              <p className="mt-2 text-slate-500">{feature.descripcion}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

