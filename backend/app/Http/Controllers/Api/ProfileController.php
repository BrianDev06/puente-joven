<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class ProfileController extends Controller
{
    /**
     * Obtener el perfil del usuario autenticado.
     */
    public function show(Request $request): JsonResponse
    {
        return response()->json([
            'success' => true,
            'user' => $request->user(),
        ]);
    }

    /**
     * Actualizar el perfil del usuario autenticado.
     */
    public function update(Request $request): JsonResponse
    {
        /** @var User $user */
        $user = $request->user();

        $rules = [
            'name' => ['sometimes', 'string', 'max:255'],
            'email' => ['sometimes', 'email', 'max:255', Rule::unique('users')->ignore($user->id)],
            'password' => ['sometimes', 'nullable', 'min:6', 'confirmed'],
            'apellidos' => ['sometimes', 'nullable', 'string', 'max:255'],
            'dni_cif' => ['sometimes', 'nullable', 'string', 'max:20'],
        ];

        // Reglas específicas según el tipo de usuario
        if ($user->user_type === 'alumno') {
            $rules['ciclo'] = ['sometimes', 'nullable', Rule::in(['DAW', 'DAM', 'ASIR'])];
            $rules['fecha_nacimiento'] = ['sometimes', 'nullable', 'date'];
        } elseif ($user->user_type === 'profesor') {
            $rules['departamento'] = ['sometimes', 'nullable', 'string', 'max:255'];
            $rules['especialidad'] = ['sometimes', 'nullable', 'string', 'max:255'];
        } elseif ($user->user_type === 'empresa') {
            $rules['nombre_comercial'] = ['sometimes', 'nullable', 'string', 'max:255'];
            $rules['web'] = ['sometimes', 'nullable', 'url', 'max:255'];
            $rules['direccion'] = ['sometimes', 'nullable', 'string', 'max:500'];
        }

        $validated = $request->validate($rules);

        if (isset($validated['password']) && !empty($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        } else {
            unset($validated['password']);
        }

        $user->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Perfil actualizado correctamente.',
            'user' => $user,
        ]);
    }
}
