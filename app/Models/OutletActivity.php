<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OutletActivity extends Model
{
    use HasFactory;
    protected $fillable = ['outlet_id','visit_date'];

    public function outlet(){
        return $this->belongsTo(Outlet::class,'outlet_id','id');
    }
}
