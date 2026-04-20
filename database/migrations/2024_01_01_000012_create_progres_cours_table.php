<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('progres_cours', function (Blueprint $table) {
            $table->id();
            $table->foreignId('utilisateur_id')->constrained('utilisateurs')->onDelete('cascade');
            $table->foreignId('cours_id')->constrained('cours')->onDelete('cascade');
            $table->decimal('pourcentage_avancement', 5, 2)->default(0.00);
            $table->boolean('est_termine')->default(false);
            $table->timestamp('date_mise_a_jour')->useCurrent()->useCurrentOnUpdate();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('progres_cours');
    }
};
