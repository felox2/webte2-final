<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RefreshToken extends Model
{
  protected $fillable = [
    'refresh_token',
    'expires_at',
    'user_id',
  ];

  public function user()
  {
    return $this->belongsTo(User::class);
  }
}
