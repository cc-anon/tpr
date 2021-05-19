<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Truck extends Model
{
  use HasFactory;
  use SoftDeletes;

  protected $fillable = ['type', 'style', 'category', 'size', 'capacity'];
}
