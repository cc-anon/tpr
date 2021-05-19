<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateServicesTable extends Migration{
  public function up(){
    Schema::create('services', function (Blueprint $table) {
      $table->bigIncrements('id');
      $table->unsignedBigInteger('transporter');
      $table->string('fromregion')->nullable(false);
      $table->string('toregion')->nullable(false);
      $table->string('truck')->nullable(true);
      $table->string('commodity')->nullable(true);
      $table->timestamps();
      $table->softDeletes();

      $table->foreign('transporter')->references('id')->on('transporters');
    });
  }
  public function down(){
    Schema::dropIfExists('services');
  }
}
