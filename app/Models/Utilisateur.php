<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class Utilisateur extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $table = 'utilisateurs';
    
    protected $fillable = [
        'email', 'mot_de_passe', 'role', 'est_actif', 'derniere_connexion'
    ];

    protected $hidden = [
        'mot_de_passe',
    ];

    protected $casts = [
        'est_actif' => 'boolean',
        'derniere_connexion' => 'datetime',
    ];

    // Relations
    public function profil()
    {
        return $this->hasOne(Profil::class, 'utilisateur_id');
    }

    public function parcoursAcademique()
    {
        return $this->hasOne(ParcoursAcademique::class, 'utilisateur_id');
    }

    public function formateur()
    {
        return $this->hasOne(Formateur::class, 'utilisateur_id');
    }

    public function inscriptionsFormations()
    {
        return $this->hasMany(InscriptionFormation::class, 'utilisateur_id');
    }

    public function formations()
    {
        return $this->belongsToMany(Formation::class, 'inscriptions_formations', 'utilisateur_id', 'formation_id')
                    ->withPivot('statut_inscription', 'type_inscription')
                    ->withTimestamps();
    }

    public function progresCours()
    {
        return $this->hasMany(ProgresCours::class, 'utilisateur_id');
    }

    public function resultatsTests()
    {
        return $this->hasMany(ResultatTest::class, 'utilisateur_id');
    }

    public function diplomes()
    {
        return $this->hasMany(DiplomeCertification::class, 'utilisateur_id');
    }
}
