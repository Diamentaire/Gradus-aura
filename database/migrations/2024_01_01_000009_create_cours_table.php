<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('cours', function (Blueprint $table) {
            $table->id();
            $table->foreignId('formation_id')->constrained('formations')->onDelete('cascade');
            $table->string('titre_chapitre', 255);
            $table->longText('contenu_texte')->nullable();
            $table->string('video_url', 255)->nullable();
            $table->integer('ordre_affichage')->default(1);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('cours');
    }
};
