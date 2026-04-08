const perfiles = [
  {
    titulo: "Alumno",
    descripcion: "Encuentra practicas profesionales y oportunidades laborales",
    items: ["Busca ofertas de empleo", "Aplica a practicas", "Crea tu perfil profesional"],
    icono: "🎓",
  },
  {
    titulo: "Profesor",
    descripcion: "Conecta a tus estudiantes con empresas y oportunidades",
    items: ["Gestiona alumnos", "Supervisa practicas", "Colabora con empresas"],
    icono: "👥",
  },
  {
    titulo: "Empresa",
    descripcion: "Encuentra talento joven y publica ofertas de empleo",
    items: ["Publica ofertas", "Busca candidatos", "Gestiona aplicaciones"],
    icono: "🏢",
  },
];

export default function ProfilesSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      <h2 className="mb-10 text-center text-4xl font-bold">Quien Eres?</h2>
      <div className="grid gap-6 md:grid-cols-3">
        {perfiles.map((perfil) => (
          <article
            key={perfil.titulo}
            className="rounded-xl border border-slate-200 bg-white p-6 text-center shadow-sm"
          >
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-sky-100 text-2xl">
              {perfil.icono}
            </div>
            <h3 className="text-3xl font-bold">{perfil.titulo}</h3>
            <p className="mt-3 text-slate-500">{perfil.descripcion}</p>
            <ul className="mt-5 space-y-2 text-left text-slate-700">
              {perfil.items.map((item) => (
                <li key={item}>✓ {item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

