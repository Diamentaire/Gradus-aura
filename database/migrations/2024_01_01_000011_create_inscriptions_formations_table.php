<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('inscriptions_formations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('utilisateur_id')->constrained('utilisateurs')->onDelete('cascade');
            $table->foreignId('formation_id')->constrained('formations')->onDelete('cascade');
            $table->enum('statut_inscription', ['En attente', 'Validee', 'Annulee', 'Terminee'])->default('En attente');
            $table->enum('type_inscription', ['Directe', 'Bourse', 'Promotion'])->default('Directe');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('inscriptions_formations');
    }
};
