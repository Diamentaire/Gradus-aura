<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('formations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('etablissement_id')->constrained('etablissements')->onDelete('cascade');
            $table->foreignId('filiere_id')->constrained('filieres')->onDelete('cascade');
            $table->string('titre', 255);
            $table->text('description_longue')->nullable();
            $table->string('niveau_requis', 100)->nullable();
            $table->string('duree_estimee', 50)->nullable();
            $table->decimal('cout_scolarite_annuel', 12, 2)->nullable();
            $table->foreignId('centre_formation_id')->nullable()->constrained('centres_formations')->nullOnDelete();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('formations');
    }
};
