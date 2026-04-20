<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Formation extends Model
{
    use HasFactory;

    protected $fillable = [
        'etablissement_id', 'filiere_id', 'titre', 'description_longue',
        'niveau_requis', 'duree_estimee', 'cout_scolarite_annuel', 'centre_formation_id'
    ];

    // Relations
    public function etablissement()
    {
        return $this->belongsTo(Etablissement::class);
    }

    public function filiere()
    {
        return $this->belongsTo(Filiere::class);
    }

    public function centreFormation()
    {
        return $this->belongsTo(CentreFormation::class, 'centre_formation_id');
    }

    public function cours()
    {
        return $this->hasMany(Cours::class);
    }

    public function inscriptions()
    {
        return $this->hasMany(InscriptionFormation::class, 'formation_id');
    }

    public function utilisateurs()
    {
        return $this->belongsToMany(Utilisateur::class, 'inscriptions_formations', 'formation_id', 'utilisateur_id')
                    ->withPivot('statut_inscription', 'type_inscription')
                    ->withTimestamps();
    }

    public function examens()
    {
        return $this->hasMany(Examen::class);
    }
}
