<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Role;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    public function index(): JsonResponse
    {
        $roles = Role::with('permissions:id,name,display_name')->orderBy('name')->get();

        return response()->json([
            'success' => true,
            'data' => $roles,
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:80', 'unique:roles,name'],
            'display_name' => ['nullable', 'string', 'max:120'],
            'description' => ['nullable', 'string'],
        ]);

        $role = Role::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Rol creado correctamente.',
            'data' => $role,
        ], 201);
    }

    public function show(Role $role): JsonResponse
    {
        $role->load('permissions:id,name,display_name');

        return response()->json([
            'success' => true,
            'data' => $role,
        ]);
    }

    public function update(Request $request, Role $role): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['sometimes', 'required', 'string', 'max:80', 'unique:roles,name,' . $role->id],
            'display_name' => ['nullable', 'string', 'max:120'],
            'description' => ['nullable', 'string'],
        ]);

        $role->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Rol actualizado correctamente.',
            'data' => $role,
        ]);
    }

    public function destroy(Role $role): JsonResponse
    {
        $role->delete();

        return response()->json([
            'success' => true,
            'message' => 'Rol eliminado correctamente.',
        ]);
    }

    public function syncPermissions(Request $request, Role $role): JsonResponse
    {
        $validated = $request->validate([
            'permission_ids' => ['required', 'array'],
            'permission_ids.*' => ['integer', 'exists:permissions,id'],
        ]);

        $role->permissions()->sync($validated['permission_ids']);

        return response()->json([
            'success' => true,
            'message' => 'Permisos del rol actualizados.',
            'data' => $role->load('permissions:id,name,display_name'),
        ]);
    }
}

