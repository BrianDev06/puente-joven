export default function FeaturesSection() {
  const features = [
    {
      title: "Gestión Eficiente",
      desc: "Todas las ofertas centralizadas con herramientas de filtrado avanzado.",
      icon: "⚡",
    },
    {
      title: "Seguridad Garantizada",
      desc: "Protección de datos y autenticación de última generación.",
      icon: "🛡️",
    },
    {
      title: "Notificaciones Real-time",
      desc: "Recibe alertas instantáneas sobre nuevas candidaturas y cambios de estado.",
      icon: "🔔",
    },
    {
      title: "Interfaz Intuitiva",
      desc: "Diseño moderno pensado para la máxima productividad y facilidad de uso.",
      icon: "🎨",
    },
  ];

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <h2 className="text-3xl font-black text-black sm:text-4xl mb-16">¿Por qué elegir Puente Joven?</h2>

        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => (
            <div key={i} className="flex flex-col items-center group transition-all duration-300">
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-[#00b4ff]/5 text-3xl shadow-sm ring-1 ring-[#00b4ff]/10 transition-all duration-500 group-hover:bg-black group-hover:ring-black">
                <span className="transition-transform duration-500 group-hover:scale-125">{feature.icon}</span>
              </div>
              <h3 className="mb-3 text-xl font-black text-black">{feature.title}</h3>
              <p className="text-slate-500 font-medium leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
