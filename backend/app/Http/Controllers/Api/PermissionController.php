<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Permission;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PermissionController extends Controller
{
    public function index(): JsonResponse
    {
        $permissions = Permission::orderBy('name')->get();

        return response()->json([
            'success' => true,
            'data' => $permissions,
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:80', 'unique:permissions,name'],
            'display_name' => ['nullable', 'string', 'max:120'],
            'description' => ['nullable', 'string'],
        ]);

        $permission = Permission::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Permiso creado correctamente.',
            'data' => $permission,
        ], 201);
    }

    public function show(Permission $permission): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data' => $permission,
        ]);
    }

    public function update(Request $request, Permission $permission): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['sometimes', 'required', 'string', 'max:80', 'unique:permissions,name,' . $permission->id],
            'display_name' => ['nullable', 'string', 'max:120'],
            'description' => ['nullable', 'string'],
        ]);

        $permission->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Permiso actualizado correctamente.',
            'data' => $permission,
        ]);
    }

    public function destroy(Permission $permission): JsonResponse
    {
        $permission->delete();

        return response()->json([
            'success' => true,
            'message' => 'Permiso eliminado correctamente.',
        ]);
    }
}

