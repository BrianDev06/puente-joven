<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

use App\Models\Offer;

class PuenteController extends Controller
{
    /**
     * Obtener lista de puentes (ofertas)
     */
    public function index(): JsonResponse
    {
        $puentes = Offer::with('empresa')->orderBy('created_at', 'desc')->get();

        return response()->json([
            'success' => true,
            'data' => $puentes,
            'total' => $puentes->count(),
        ]);
    }

    /**
     * Crear una nueva oferta
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'descripcion' => 'required|string',
            'tipo_jornada' => 'required|in:jornada completa,jornada parcial',
            'ubicacion' => 'nullable|string|max:255',
            'requisitos' => 'nullable|string',
            'ofrecemos' => 'nullable|string',
        ]);

        $offer = new Offer($validated);
        $offer->user_id = $request->user()->id;
        $offer->estado = 'activo';
        $offer->save();

        return response()->json([
            'success' => true,
            'message' => 'Oferta creada correctamente',
            'data' => $offer->load('empresa'),
        ], 201);
    }

    /**
     * Obtener un puente por ID
     */
    public function show(int $id): JsonResponse
    {
        $puente = Offer::with('empresa')->find($id);

        if (!$puente) {
            return response()->json([
                'success' => false,
                'message' => 'Puente no encontrado',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $puente,
        ]);
    }
}
