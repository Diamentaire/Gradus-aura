<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Utilisateur;
use App\Models\Profil;
use App\Models\Domaine;
use App\Models\Filiere;
use App\Models\Etablissement;
use App\Models\Formation;
use App\Models\Concours;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Créer un utilisateur admin
        $admin = Utilisateur::create([
            'email' => 'admin@gradusaura.com',
            'mot_de_passe' => Hash::make('Admin@123'),
            'role' => 'Admin',
            'est_actif' => true,
        ]);

        Profil::create([
            'utilisateur_id' => $admin->id,
            'nom' => 'Admin',
            'prenom' => 'Gradus',
            'ville' => 'Yaoundé',
        ]);

        // Créer un utilisateur élève
        $eleve = Utilisateur::create([
            'email' => 'eleve@gradusaura.com',
            'mot_de_passe' => Hash::make('Eleve@123'),
            'role' => 'Eleve',
            'est_actif' => true,
        ]);

        Profil::create([
            'utilisateur_id' => $eleve->id,
            'nom' => 'Dupont',
            'prenom' => 'Jean',
            'telephone' => '699887766',
            'ville' => 'Douala',
        ]);

        // Créer des domaines
        $domaines = [
            ['nom_domaine' => 'Sciences de l\'ingénieur'],
            ['nom_domaine' => 'Sciences de gestion'],
            ['nom_domaine' => 'Sciences de la santé'],
            ['nom_domaine' => 'Sciences humaines'],
        ];

        foreach ($domaines as $domaine) {
            Domaine::create($domaine);
        }

        // Créer des filières
        $filieres = [
            ['domaine_id' => 1, 'nom_filiere' => 'Génie Civil', 'code_filiere' => 'GC-01'],
            ['domaine_id' => 1, 'nom_filiere' => 'Génie Informatique', 'code_filiere' => 'GI-01'],
            ['domaine_id' => 2, 'nom_filiere' => 'Commerce International', 'code_filiere' => 'CI-01'],
            ['domaine_id' => 2, 'nom_filiere' => 'Administration des Affaires', 'code_filiere' => 'AA-01'],
        ];

        foreach ($filieres as $filiere) {
            Filiere::create($filiere);
        }

        // Créer des établissements
        $etablissements = [
            ['nom_etablissement' => 'Université de Douala', 'sigle' => 'UD', 'type_etablissement' => 'Public', 'ville' => 'Douala'],
            ['nom_etablissement' => 'Université de Yaoundé I', 'sigle' => 'UYI', 'type_etablissement' => 'Public', 'ville' => 'Yaoundé'],
            ['nom_etablissement' => 'ENAM', 'sigle' => 'ENAM', 'type_etablissement' => 'Public', 'ville' => 'Yaoundé'],
        ];

        foreach ($etablissements as $etab) {
            Etablissement::create($etab);
        }

        // Créer des concours
        $concours = [
            ['nom_concours' => 'Concours Administratifs ENAM', 'date_ouverture' => '2025-01-15', 'date_cloture' => '2025-03-15', 'frais_dossier' => 25000],
            ['nom_concours' => 'Concours Grandes Écoles', 'date_ouverture' => '2025-02-01', 'date_cloture' => '2025-04-30', 'frais_dossier' => 30000],
            ['nom_concours' => 'TCF Canada', 'date_ouverture' => '2025-01-01', 'date_cloture' => '2025-12-31', 'frais_dossier' => 20000],
        ];

        foreach ($concours as $concoursData) {
            Concours::create($concoursData);
        }
    }
}
