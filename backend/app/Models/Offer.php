<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Offer extends Model
{
    protected $fillable = [
        'nombre',
        'descripcion',
        'estado',
        'tipo_jornada',
        'ubicacion',
        'requisitos',
        'ofrecemos',
        'user_id'
    ];

    public function empresa()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
