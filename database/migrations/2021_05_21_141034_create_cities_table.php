<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCitiesTable extends Migration{
  public function up(){
    Schema::create('cities', function (Blueprint $table) {
      $table->bigIncrements('id');
      $table->Integer('state')->nullable(true);
      $table->string('city')->nullable(true);
    });
  }
  public function down(){
    Schema::dropIfExists('cities');
  }
}
