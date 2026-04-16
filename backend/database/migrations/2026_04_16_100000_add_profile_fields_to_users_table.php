<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Campos comunes de perfil
            $table->string('apellidos')->nullable();
            $table->string('dni_cif', 20)->nullable(); // Se usa para DNI o CIF
            
            // Campos para Alumno
            $table->date('fecha_nacimiento')->nullable();
            $table->enum('ciclo', ['DAW', 'DAM', 'ASIR'])->nullable();
            
            // Campos para Profesor
            $table->string('departamento')->nullable();
            $table->string('especialidad')->nullable();
            
            // Campos para Empresa (además de CIF)
            $table->string('nombre_comercial')->nullable();
            $table->string('web')->nullable();
            $table->string('direccion')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'apellidos', 
                'dni_cif', 
                'fecha_nacimiento', 
                'ciclo', 
                'departamento', 
                'especialidad', 
                'nombre_comercial', 
                'web', 
                'direccion'
            ]);
        });
    }
};
