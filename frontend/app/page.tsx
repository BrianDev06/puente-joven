import PuentesList from '@/components/PuentesList'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            🌉 Puente Joven
          </h1>
          <p className="text-xl text-gray-600">
            Aplicación full-stack con Laravel (Backend) y Next.js (Frontend)
          </p>
        </div>
        <PuentesList />
      </div>
    </main>
  )
}
