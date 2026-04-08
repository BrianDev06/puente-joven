<?php

namespace App\Http\Controllers\Api;

use App\Enums\UserType;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Validation\Rules\Enum;

class AuthController extends Controller
{
    public function register(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email'],
            'password' => ['required', 'string', 'min:6', 'confirmed'],
            'user_type' => ['required', new Enum(UserType::class)],
        ]);

        $plainToken = Str::random(60);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'user_type' => $validated['user_type'],
            'api_token' => hash('sha256', $plainToken),
        ]);

        // Asignar rol por defecto según tipo de usuario.
        $roleName = match ($validated['user_type']) {
            'profesor' => 'profesor',
            'alumno' => 'alumno',
            default => 'admin',
        };
        $role = \App\Models\Role::where('name', $roleName)->first();
        if ($role) {
            $user->roles()->syncWithoutDetaching([$role->id]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Usuario registrado correctamente.',
            'token' => $plainToken,
            'user' => $this->serializeUser($user),
        ], 201);
    }

    public function login(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'email' => ['required', 'string', 'email'],
            'password' => ['required', 'string'],
        ]);

        $user = User::where('email', $validated['email'])->first();

        if (!$user || !Hash::check($validated['password'], $user->password)) {
            return response()->json([
                'success' => false,
                'message' => 'Credenciales incorrectas.',
            ], 401);
        }

        $plainToken = Str::random(60);
        $user->api_token = hash('sha256', $plainToken);
        $user->save();

        return response()->json([
            'success' => true,
            'message' => 'Inicio de sesión correcto.',
            'token' => $plainToken,
            'user' => $this->serializeUser($user),
        ]);
    }

    public function me(Request $request): JsonResponse
    {
        return response()->json([
            'success' => true,
            'user' => $this->serializeUser($request->user()),
        ]);
    }

    public function logout(Request $request): JsonResponse
    {
        /** @var User $user */
        $user = $request->user();
        $user->api_token = null;
        $user->save();

        return response()->json([
            'success' => true,
            'message' => 'Sesión cerrada correctamente.',
        ]);
    }

    private function serializeUser(User $user): array
    {
        $roles = $user->roles()->select('roles.id', 'roles.name', 'roles.display_name')->get();
        $permissions = $roles
            ->flatMap(fn ($role) => $role->permissions()->select('permissions.id', 'permissions.name', 'permissions.display_name')->get())
            ->unique('id')
            ->values();

        return [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'user_type' => $user->user_type,
            'roles' => $roles,
            'permissions' => $permissions,
            'created_at' => $user->created_at,
        ];
    }
}

