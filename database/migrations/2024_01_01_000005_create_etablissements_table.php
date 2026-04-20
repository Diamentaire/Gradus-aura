<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('etablissements', function (Blueprint $table) {
            $table->id();
            $table->string('nom_etablissement', 150);
            $table->string('sigle', 20)->nullable();
            $table->enum('type_etablissement', ['Public', 'Prive', 'International'])->default('Prive');
            $table->string('ville', 100)->nullable();
            $table->string('quartier', 100)->nullable();
            $table->text('adresse_physique')->nullable();
            $table->string('site_web', 255)->nullable();
            $table->string('logo_url', 255)->nullable();
            $table->text('description')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('etablissements');
    }
};
