<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('bourses_etudes', function (Blueprint $table) {
            $table->id();
            $table->string('titre', 255);
            $table->string('pays_destination', 100)->nullable();
            $table->text('conditions_eligibilite')->nullable();
            $table->date('date_limite')->nullable();
            $table->string('lien_postulation', 255)->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('bourses_etudes');
    }
};
