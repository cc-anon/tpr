<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Transporter extends Model
{
  use HasFactory;
  use SoftDeletes;

  protected $fillable = ['businessname', 'ownername', 'type', 'ratings', 'email', 'whatsappnumber', 'aadhar', 'pan', 'gst', 'address', 'region', 'branch', 'area', 'zipcode', 'referrername', 'referrermobile', 'visitingcard', 'documents'];
}
