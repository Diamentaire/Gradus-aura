<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('filieres', function (Blueprint $table) {
            $table->id();
            $table->foreignId('domaine_id')->constrained('domaines')->onDelete('cascade');
            $table->string('nom_filiere', 150);
            $table->text('description')->nullable();
            $table->text('debouches_professionnels')->nullable();
            $table->string('code_filiere', 50)->unique();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('filieres');
    }
};
