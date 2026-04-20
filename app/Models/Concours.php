<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Concours extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom_concours', 'date_ouverture', 'date_cloture', 'frais_dossier', 'lien_officiel'
    ];

    protected $casts = [
        'date_ouverture' => 'date',
        'date_cloture' => 'date',
    ];

    public function epreuves()
    {
        return $this->hasMany(EpreuveAncienne::class);
    }
}
