<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('concours', function (Blueprint $table) {
            $table->id();
            $table->string('nom_concours', 255);
            $table->date('date_ouverture')->nullable();
            $table->date('date_cloture')->nullable();
            $table->decimal('frais_dossier', 10, 2)->nullable();
            $table->string('lien_officiel', 255)->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('concours');
    }
};
