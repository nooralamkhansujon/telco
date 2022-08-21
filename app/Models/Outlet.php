<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Outlet extends Model
{
    use HasFactory;
    protected $fillable = ['name','latitude','longitude'];

    public function outlet_activities(){
        return $this->hasMany(OutletActivity::class,'outlet_id','id');
    }
}
