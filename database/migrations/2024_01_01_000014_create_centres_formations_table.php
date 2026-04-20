<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('centres_formations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('etablissement_id')->constrained('etablissements')->onDelete('cascade');
            $table->string('nom_centre', 150);
            $table->string('code_centre', 20)->unique();
            $table->string('responsable_nom', 100)->nullable();
            $table->string('contact_telephone', 20)->nullable();
            $table->integer('capacite_accueil')->nullable();
            $table->string('coordonnees_gps', 100)->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('centres_formations');
    }
};
