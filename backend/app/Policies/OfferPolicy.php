<?php

namespace App\Policies;

use App\Models\User;

class OfferPolicy
{
    public function create(User $user): bool
    {
        return $user->hasRole('admin') || $user->hasRole('empresa');
    }
}

