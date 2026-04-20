<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('profils', function (Blueprint $table) {
            $table->id();
            $table->foreignId('utilisateur_id')->constrained('utilisateurs')->onDelete('cascade');
            $table->string('nom', 100)->nullable();
            $table->string('prenom', 100)->nullable();
            $table->date('date_naissance')->nullable();
            $table->string('telephone', 20)->nullable();
            $table->string('ville', 100)->nullable();
            $table->string('photo_url', 255)->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('profils');
    }
};
