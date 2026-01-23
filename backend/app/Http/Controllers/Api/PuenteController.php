<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;

class PuenteController extends Controller
{
    /**
     * Obtener lista de puentes
     */
    public function index(): JsonResponse
    {
        $puentes = [
            [
                'id' => 1,
                'nombre' => 'Puente de la Juventud',
                'descripcion' => 'Un puente que conecta a jóvenes con oportunidades',
                'estado' => 'activo',
                'fecha_creacion' => '2024-01-15',
            ],
            [
                'id' => 2,
                'nombre' => 'Puente Educativo',
                'descripcion' => 'Programa de educación para jóvenes',
                'estado' => 'activo',
                'fecha_creacion' => '2024-02-20',
            ],
            [
                'id' => 3,
                'nombre' => 'Puente Laboral',
                'descripcion' => 'Conectando jóvenes con el mercado laboral',
                'estado' => 'en_proceso',
                'fecha_creacion' => '2024-03-10',
            ],
            [
                'id' => 4,
                'nombre' => 'Puente Cultural',
                'descripcion' => 'Fomentando la cultura entre los jóvenes',
                'estado' => 'activo',
                'fecha_creacion' => '2024-04-05',
            ],
        ];

        return response()->json([
            'success' => true,
            'data' => $puentes,
            'total' => count($puentes),
        ]);
    }

    /**
     * Obtener un puente por ID
     */
    public function show(int $id): JsonResponse
    {
        $puentes = [
            1 => [
                'id' => 1,
                'nombre' => 'Puente de la Juventud',
                'descripcion' => 'Un puente que conecta a jóvenes con oportunidades',
                'estado' => 'activo',
                'fecha_creacion' => '2024-01-15',
                'participantes' => 150,
                'ubicacion' => 'Ciudad Principal',
            ],
            2 => [
                'id' => 2,
                'nombre' => 'Puente Educativo',
                'descripcion' => 'Programa de educación para jóvenes',
                'estado' => 'activo',
                'fecha_creacion' => '2024-02-20',
                'participantes' => 200,
                'ubicacion' => 'Centro Educativo',
            ],
            3 => [
                'id' => 3,
                'nombre' => 'Puente Laboral',
                'descripcion' => 'Conectando jóvenes con el mercado laboral',
                'estado' => 'en_proceso',
                'fecha_creacion' => '2024-03-10',
                'participantes' => 75,
                'ubicacion' => 'Oficina Central',
            ],
            4 => [
                'id' => 4,
                'nombre' => 'Puente Cultural',
                'descripcion' => 'Fomentando la cultura entre los jóvenes',
                'estado' => 'activo',
                'fecha_creacion' => '2024-04-05',
                'participantes' => 120,
                'ubicacion' => 'Centro Cultural',
            ],
        ];

        if (!isset($puentes[$id])) {
            return response()->json([
                'success' => false,
                'message' => 'Puente no encontrado',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $puentes[$id],
        ]);
    }
}
