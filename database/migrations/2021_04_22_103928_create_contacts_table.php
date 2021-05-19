<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateContactsTable extends Migration{
  public function up(){
    Schema::create('contacts', function (Blueprint $table) {
      $table->bigIncrements('id');
      $table->unsignedBigInteger('transporter');
      $table->string('name')->nullable(false);
      $table->bigInteger('mobile')->nullable(true);
      $table->bigInteger('mobile2')->nullable(true);
      $table->bigInteger('whatsappnumber')->nullable(true);
      $table->timestamps();
      $table->softDeletes();

      $table->foreign('transporter')->references('id')->on('transporters');
    });
  }
  public function down(){
    Schema::dropIfExists('contacts');
  }
}
