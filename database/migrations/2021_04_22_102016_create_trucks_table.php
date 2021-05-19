<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTrucksTable extends Migration{
  public function up(){
    Schema::create('trucks', function (Blueprint $table) {
      $table->bigIncrements('id');
      $table->string('type')->nullable(false);
      $table->string('style')->nullable(true);
      $table->string('category')->nullable(true);
      $table->Integer('size')->nullable(true);
      $table->Integer('capacity')->nullable(true);
      $table->timestamps();
      $table->softDeletes();
    });
  }
  public function down(){
    Schema::dropIfExists('trucks');
  }
}
