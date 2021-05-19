<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTransportersTable extends Migration{
  public function up(){
    Schema::create('transporters', function (Blueprint $table) {
      $table->bigIncrements('id');
      $table->string('visitingcard')->nullable(true);
      $table->string('businessname')->nullable(true);
      $table->string('type')->nullable(true);
      $table->Integer('ratings')->nullable(true);
      $table->string('ownername')->nullable(true);
      $table->string('email')->nullable(true);
      $table->bigInteger('whatsappnumber')->nullable(true);
      $table->bigInteger('aadhar')->nullable(true);
      $table->string('pan')->nullable(true);
      $table->string('gst')->nullable(true);
      $table->string('address')->nullable(true);
      $table->string('area')->nullable(true);
      $table->unsignedBigInteger('region');
      $table->unsignedBigInteger('branch')->nullable(false);
      $table->string('referrername')->nullable(true);
      $table->bigInteger('referrermobile')->nullable(true);
      $table->string('documents')->nullable(true);
      $table->timestamps();
      $table->softDeletes();

      $table->foreign('region')->references('id')->on('regions');
    });
  }
  public function down(){
    Schema::dropIfExists('transporters');
  }
}
