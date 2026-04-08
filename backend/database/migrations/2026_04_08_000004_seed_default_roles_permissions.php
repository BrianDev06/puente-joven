<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        $now = now();

        $roles = [
            ['name' => 'admin', 'display_name' => 'Administrador', 'description' => 'Control total del sistema'],
            ['name' => 'profesor', 'display_name' => 'Profesor', 'description' => 'Gestión académica y seguimiento'],
            ['name' => 'alumno', 'display_name' => 'Alumno', 'description' => 'Acceso a ofertas y postulaciones'],
            ['name' => 'empresa', 'display_name' => 'Empresa', 'description' => 'Publicación y gestión de ofertas'],
        ];

        foreach ($roles as $role) {
            DB::table('roles')->updateOrInsert(
                ['name' => $role['name']],
                array_merge($role, ['created_at' => $now, 'updated_at' => $now])
            );
        }

        $permissions = [
            ['name' => 'users.view', 'display_name' => 'Ver usuarios'],
            ['name' => 'users.create', 'display_name' => 'Crear usuarios'],
            ['name' => 'users.update', 'display_name' => 'Editar usuarios'],
            ['name' => 'users.delete', 'display_name' => 'Eliminar usuarios'],
            ['name' => 'roles.manage', 'display_name' => 'Gestionar roles'],
            ['name' => 'permissions.manage', 'display_name' => 'Gestionar permisos'],
            ['name' => 'offers.view', 'display_name' => 'Ver ofertas'],
            ['name' => 'offers.create', 'display_name' => 'Crear ofertas'],
            ['name' => 'offers.update', 'display_name' => 'Editar ofertas'],
            ['name' => 'offers.delete', 'display_name' => 'Eliminar ofertas'],
            ['name' => 'applications.create', 'display_name' => 'Postular a ofertas'],
        ];

        foreach ($permissions as $permission) {
            DB::table('permissions')->updateOrInsert(
                ['name' => $permission['name']],
                array_merge($permission, ['created_at' => $now, 'updated_at' => $now])
            );
        }

        $roleIds = DB::table('roles')->pluck('id', 'name');
        $permissionIds = DB::table('permissions')->pluck('id', 'name');

        $map = [
            'admin' => array_keys($permissionIds->toArray()),
            'profesor' => ['offers.view', 'applications.create', 'users.view'],
            'alumno' => ['offers.view', 'applications.create'],
            'empresa' => ['offers.view', 'offers.create', 'offers.update'],
        ];

        foreach ($map as $roleName => $permissionNames) {
            $roleId = $roleIds[$roleName] ?? null;
            if (!$roleId) {
                continue;
            }

            foreach ($permissionNames as $permissionName) {
                $permissionId = $permissionIds[$permissionName] ?? null;
                if (!$permissionId) {
                    continue;
                }

                DB::table('permission_role')->updateOrInsert([
                    'permission_id' => $permissionId,
                    'role_id' => $roleId,
                ]);
            }
        }
    }

    public function down(): void
    {
        DB::table('permission_role')->delete();
        DB::table('permissions')->delete();
        DB::table('roles')->delete();
    }
};

