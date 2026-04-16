export default function ProfilesSection() {
  const profiles = [
    {
      title: "Alumnos",
      desc: "Accede a las mejores ofertas de empleo y prácticas adaptadas a tu perfil académico.",
      icon: "🎓",
      color: "bg-[#00b4ff]/10 text-[#00b4ff]",
    },
    {
      title: "Empresas",
      desc: "Encuentra el talento que tu organización necesita entre nuestra comunidad de alumnos.",
      icon: "🏢",
      color: "bg-black text-white",
    },
    {
      title: "Profesores",
      desc: "Supervisa y conecta a tus alumnos con oportunidades reales en el sector.",
      icon: "👨‍🏫",
      color: "bg-slate-100 text-black",
    },
  ];

  return (
    <section id="profiles" className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black text-black sm:text-4xl">Un Ecosistema Diseñado para Todos</h2>
          <p className="mt-4 text-lg text-slate-500 font-medium max-w-2xl mx-auto">Soluciones específicas para cada actor del mercado laboral educativo.</p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {profiles.map((profile, i) => (
            <div 
              key={i} 
              className="group relative rounded-[2.5rem] bg-white p-10 shadow-xl shadow-slate-200/50 ring-1 ring-slate-100 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#00b4ff]/10"
            >
              <div className={`mb-8 flex h-20 w-20 items-center justify-center rounded-[1.8rem] text-3xl shadow-inner transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 ${profile.color}`}>
                {profile.icon}
              </div>
              <h3 className="mb-4 text-2xl font-black text-black">{profile.title}</h3>
              <p className="text-slate-500 font-medium leading-relaxed">{profile.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
