<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Formation;
use App\Models\Concours;
use App\Models\Etablissement;
use App\Models\Domaine;
use App\Models\Filiere;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index()
    {
        $formations = Formation::with(['etablissement', 'filiere'])->limit(6)->get();
        $concours = Concours::where('date_cloture', '>=', now())->limit(3)->get();
        $etablissements = Etablissement::limit(8)->get();
        $domaines = Domaine::with('filieres')->get();

        return response()->json([
            'success' => true,
            'data' => [
                'formations' => $formations,
                'concours' => $concours,
                'etablissements' => $etablissements,
                'domaines' => $domaines,
            ]
        ]);
    }

    public function stats()
    {
        return response()->json([
            'success' => true,
            'data' => [
                'total_etudiants' => 5200,
                'total_formations' => 340,
                'taux_reussite' => 89,
                'progression_moyenne' => 78
            ]
        ]);
    }
}
