<?php

namespace App\Http\Controllers\Api;

use App\Enums\UserType;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Enum;

class UserController extends Controller
{
    public function index(): JsonResponse
    {
        $users = User::query()
            ->select(['id', 'name', 'email', 'user_type', 'created_at'])
            ->with('roles:id,name,display_name')
            ->orderByDesc('id')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $users,
        ]);
    }

    public function show(User $user): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'user_type' => $user->user_type,
                'roles' => $user->roles()->select('roles.id', 'roles.name', 'roles.display_name')->get(),
                'created_at' => $user->created_at,
            ],
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email'],
            'password' => ['required', 'string', 'min:6'],
            'user_type' => ['required', new Enum(UserType::class)],
        ]);

        $user = User::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Usuario creado correctamente.',
            'data' => $user->only(['id', 'name', 'email', 'user_type']),
        ], 201);
    }

    public function update(Request $request, User $user): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['sometimes', 'required', 'string', 'max:255'],
            'email' => ['sometimes', 'required', 'string', 'email', 'max:255', 'unique:users,email,' . $user->id],
            'password' => ['nullable', 'string', 'min:6'],
            'user_type' => ['sometimes', 'required', new Enum(UserType::class)],
        ]);

        if (empty($validated['password'])) {
            unset($validated['password']);
        }

        $user->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Usuario actualizado correctamente.',
            'data' => $user->only(['id', 'name', 'email', 'user_type']),
        ]);
    }

    public function destroy(User $user): JsonResponse
    {
        $user->delete();

        return response()->json([
            'success' => true,
            'message' => 'Usuario eliminado correctamente.',
        ]);
    }

    public function syncRoles(Request $request, User $user): JsonResponse
    {
        $validated = $request->validate([
            'role_ids' => ['required', 'array'],
            'role_ids.*' => ['integer', 'exists:roles,id'],
        ]);

        $user->roles()->sync($validated['role_ids']);

        return response()->json([
            'success' => true,
            'message' => 'Roles del usuario actualizados.',
            'data' => $user->load('roles:id,name,display_name'),
        ]);
    }
}

