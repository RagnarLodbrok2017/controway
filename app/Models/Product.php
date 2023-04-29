<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    public $table = 'products';

    protected $fillable = [
        'name',
        'type',
        'qty'
    ];
    public static function boot(){
        parent::boot();
        static::saving(function ($model){
            if (empty($model->qty))
            {
                $model->qty = 0;
            }
        });
    }
}
