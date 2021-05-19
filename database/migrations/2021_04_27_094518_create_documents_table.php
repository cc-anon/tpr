<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDocumentsTable extends Migration{
  public function up(){
    Schema::create('documents', function (Blueprint $table) {
      $table->bigIncrements('id');
      $table->text('path')->nullable(false);
      $table->timestamps();
      $table->softDeletes();
    });
  }
  public function down(){
    Schema::dropIfExists('documents');
  }
}
