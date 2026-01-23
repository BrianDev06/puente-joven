'use client'

import { useEffect, useState } from 'react'

interface Puente {
  id: number
  nombre: string
  descripcion: string
  estado: string
  fecha_creacion: string
}

interface ApiResponse {
  success: boolean
  data: Puente[]
  total: number
}

export default function PuentesList() {
  const [puentes, setPuentes] = useState<Puente[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchPuentes()
  }, [])

  const fetchPuentes = async () => {
    try {
      setLoading(true)
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'
      const response = await fetch(`${apiUrl}/puentes`)
      
      if (!response.ok) {
        throw new Error('Error al cargar los puentes')
      }

      const data: ApiResponse = await response.json()
      
      if (data.success) {
        setPuentes(data.data)
      } else {
        throw new Error('Error en la respuesta del servidor')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido')
      console.error('Error:', err)
    } finally {
      setLoading(false)
    }
  }

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'activo':
        return 'bg-green-100 text-green-800 border-green-300'
      case 'en_proceso':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300'
      case 'inactivo':
        return 'bg-gray-100 text-gray-800 border-gray-300'
      default:
        return 'bg-blue-100 text-blue-800 border-blue-300'
    }
  }

  const getEstadoTexto = (estado: string) => {
    switch (estado) {
      case 'activo':
        return 'Activo'
      case 'en_proceso':
        return 'En Proceso'
      case 'inactivo':
        return 'Inactivo'
      default:
        return estado
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <span className="ml-4 text-gray-600">Cargando puentes...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 m-4">
        <p className="text-red-800 font-semibold">Error: {error}</p>
        <button
          onClick={fetchPuentes}
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Reintentar
        </button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Lista de Puentes
        </h2>
        <p className="text-gray-600">
          Total de puentes: <span className="font-semibold">{puentes.length}</span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {puentes.map((puente) => (
          <div
            key={puente.id}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border border-gray-200"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-gray-800">
                {puente.nombre}
              </h3>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold border ${getEstadoColor(
                  puente.estado
                )}`}
              >
                {getEstadoTexto(puente.estado)}
              </span>
            </div>

            <p className="text-gray-600 mb-4 line-clamp-3">
              {puente.descripcion}
            </p>

            <div className="flex justify-between items-center text-sm text-gray-500">
              <span>ID: {puente.id}</span>
              <span>
                Creado: {new Date(puente.fecha_creacion).toLocaleDateString('es-ES')}
              </span>
            </div>
          </div>
        ))}
      </div>

      {puentes.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No hay puentes disponibles</p>
        </div>
      )}
    </div>
  )
}
